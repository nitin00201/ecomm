import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

const API_BASE_URL = '192.168.118.38'; // Removed duplicate http:// prefix

console.log('Initializing cart store with API base URL:', API_BASE_URL);

const useCartStore = create((set, get) => ({
  cart: null, // Will hold cart data
  isLoading: false,
  error: null,
  orderToken: null, // Fixed: Initialize as null instead of AsyncStorage.getItem promise
  
  // Initialize the order token from storage
  initOrderToken: async () => {
    console.log('Initializing order token from AsyncStorage');
    try {
      const token = await AsyncStorage.getItem('orderToken'); // Fixed: Use correct key for storage
      console.log('Retrieved order token from storage:', token);
      if (token) {
        set({ orderToken: token });
        return token;
      }
      return null;
    } catch (err) {
      console.error('Error retrieving order token:', err);
      return null;
    }
  },
  
  // Create a new cart
  associateCart: async (token,orderToken) => {
    console.log('Associating cart with user token:', token);
    set({ isLoading: true });
    try {
      const response = await fetch(`http://${API_BASE_URL}:3000/api/v2/storefront/cart/associate?guest_order_token=${orderToken}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/vnd.api+json'
        }
      });
      console.log('Associate cart response :', response);

  
      console.log('Associate cart response status:', response.status);
      
      // Check if the response status is OK (200)
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Associate cart error response:', errorText);
        throw new Error(`Failed to associate cart: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log('Associate cart successful, data:', data);
      
      // Save order token if available
      if (data?.data?.attributes?.token) {
        const newToken = data.data.attributes.token;
        console.log('Saving new order token after association:', newToken);
        await AsyncStorage.setItem('orderToken', newToken);
        set({ cart: data, orderToken: newToken, isLoading: false });
      } else {
        set({ cart: data, isLoading: false });
      }
      
      return data;
    } catch (err) {
      console.error('Error in associateCart:', err);
      set({ error: err.message, isLoading: false });
      return null;
    }
  },
  
  createCart: async () => {
    console.log('Creating new cart');
    set({ isLoading: true });
    try {
      const response = await fetch(`http://${API_BASE_URL}:3000/api/v2/storefront/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/vnd.api+json'
        },
        body: JSON.stringify({
          public_metadata: { total_weight: 3250 },
          private_metadata: { had_same_cart_items: true }
        }) // Fixed: Properly stringify the JSON body
      });
      
      console.log("Create cart response status:", response.status);
  
      // Check if the response status is OK (200)
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Create cart error response:', errorText);
        throw new Error(`Failed to create cart: ${response.statusText}`);
      }
  
      const data = await response.json();
      console.log("Create cart response data:", data);
  
      const orderToken = data.data?.attributes?.token; 
      
      if (!orderToken) {
        console.error("No order token found in response");
        throw new Error("No order token in response");
      }
      
      console.log("Saving order token to AsyncStorage:", orderToken);
      await AsyncStorage.setItem('orderToken', orderToken);
      
      set({ 
        cart: data, 
        orderToken: orderToken,
        isLoading: false 
      });
      
      return orderToken;
    } catch (err) {
      console.error('Error in createCart:', err);
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  initializeUserCart: async (token) => {
    console.log('Initializing user cart with token:', token);
    try {
      // First create a cart
      const orderToken = await get().createCart();
      console.log("Created cart with order token:", orderToken);
  
      if (orderToken) {
        // Then associate it with the user
        console.log("Associating cart with user");
        return await get().associateCart(token,orderToken);
      } else {
        throw new Error("Failed to create cart");
      }
    } catch (err) {
      console.error("Error initializing user cart:", err);
      set({ error: err.message });
      return null;
    }
  },
  
  // Fetch cart data
  fetchCart: async () => {
    console.log('Fetching cart data');
    let orderToken = get().orderToken;
    
    // If no token in state, try to get it from storage
    if (!orderToken) {
      console.log('No token in state, checking AsyncStorage');
      orderToken = await get().initOrderToken();
    }
    
    if (!orderToken) {
      console.error('No order token available for fetching cart');
      set({ error: "No order token available" });
      return null;
    }
    
    console.log('Using order token for fetch:', orderToken);
    set({ isLoading: true });
    
    try {
      const response = await fetch(`http://${API_BASE_URL}:3000/api/v2/storefront/cart`, {
        method: 'GET',
        headers: { 'X-Spree-Order-Token': orderToken },
      });
      
      console.log('Fetch cart response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Fetch cart error response:', errorText);
        throw new Error(`Failed to fetch cart: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Cart data fetched successfully:', data);
      
      set({ cart: data, isLoading: false });
      return data;
    } catch (err) {
      console.error('Error fetching cart:', err);
      set({ error: err.message, isLoading: false });
      return null;
    }
  },
  
  // Add item to cart
  addItemToCart: async (variantId, quantity) => {
    console.log(`Adding item to cart - variant: ${variantId}, quantity: ${quantity}`);
    let orderToken = get().orderToken;
    
    // If no token in state, try to get it from storage
    if (!orderToken) {
      console.log('No token in state, checking AsyncStorage');
      orderToken = await get().initOrderToken();
    }
    
    if (!orderToken) {
      console.error('No order token available for adding item');
      set({ error: "No order token available" });
      return null;
    }
    
    console.log('Using order token:', orderToken);
    set({ isLoading: true });
    
    try {
      const payload = {
        variant_id: variantId,
        quantity: quantity
      };
      
      console.log('Add item payload:', payload);
      
      const response = await fetch(`http://${API_BASE_URL}:3000/api/v2/storefront/cart/add_item`, {
        method: 'POST',
        headers: { 
          'X-Spree-Order-Token': orderToken,
          'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify(payload),
      });
      
      console.log('Add item response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Add item error response:', errorText);
        throw new Error(`Failed to add item: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Item added successfully, updated cart:', data);
      
      set({ cart: data, isLoading: false });
      return data;
    } catch (err) {
      console.error('Error adding item to cart:', err);
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  // Update item quantity
  updateItemQuantity: async (lineItemId, quantity) => {
    console.log(`Updating item quantity - lineItemId: ${lineItemId}, quantity: ${quantity}`);
    let orderToken = get().orderToken;
    
    // If no token in state, try to get it from storage
    if (!orderToken) {
      console.log('No token in state, checking AsyncStorage');
      orderToken = await get().initOrderToken();
    }
    
    if (!orderToken) {
      console.error('No order token available for updating item');
      set({ error: "No order token available" });
      return null;
    }
    
    console.log('Using order token:', orderToken);
    set({ isLoading: true });
    
    try {
      const payload = {
        line_item_id: lineItemId,
        quantity: quantity
      };
      
      console.log('Update quantity payload:', payload);
      
      const response = await fetch(`http://${API_BASE_URL}:3000/api/v2/storefront/cart/set_quantity`, {
        method: 'PATCH',
        headers: { 
          'X-Spree-Order-Token': orderToken,
          'Content-Type': 'application/vnd.api+json',
        },
        body: JSON.stringify(payload),
      });
      
      console.log('Update quantity response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Update quantity error response:', errorText);
        throw new Error(`Failed to update quantity: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Quantity updated successfully, updated cart:', data);
      
      set({ cart: data, isLoading: false });
      return data;
    } catch (err) {
      console.error('Error updating item quantity:', err);
      set({ error: err.message, isLoading: false });
      return null;
    }
  },

  // Remove item from cart
  removeItemFromCart: async (itemId) => {
    console.log(`Removing item from cart - itemId: ${itemId}`);
    let orderToken = get().orderToken;
    
    // If no token in state, try to get it from storage
    if (!orderToken) {
      console.log('No token in state, checking AsyncStorage');
      orderToken = await get().initOrderToken();
    }
    
    if (!orderToken) {
      console.error('No order token available for removing item');
      set({ error: "No order token available" });
      return null;
    }
    
    console.log('Using order token:', orderToken);
    set({ isLoading: true });
    
    try {
      const response = await fetch(`http://${API_BASE_URL}:3000/api/v2/storefront/cart/remove_line_item/${itemId}`, {
        method: 'DELETE',
        headers: { 
          'X-Spree-Order-Token': orderToken,
        },
      });
      
      console.log('Remove item response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Remove item error response:', errorText);
        throw new Error(`Failed to remove item: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Item removed successfully, updated cart:', data);
      
      set({ cart: data, isLoading: false });
      return data;
    } catch (err) {
      console.error('Error removing item from cart:', err);
      set({ error: err.message, isLoading: false });
      return null;
    }
  },
  
  // Estimate shipping rates
  estimateShippingRates: async () => {
    console.log('Estimating shipping rates');
    let orderToken = get().orderToken;
    
    // If no token in state, try to get it from storage
    if (!orderToken) {
      console.log('No token in state, checking AsyncStorage');
      orderToken = await get().initOrderToken();
    }
    
    if (!orderToken) {
      console.error('No order token available for estimating shipping');
      set({ error: "No order token available" });
      return null;
    }
    
    console.log('Using order token:', orderToken);
    set({ isLoading: true });
    
    try {
      const response = await fetch(`http://${API_BASE_URL}:3000/api/v2/storefront/cart/estimate_shipping_rates`, {
        method: 'GET',
        headers: { 'X-Spree-Order-Token': orderToken },
      });
      
      console.log('Estimate shipping response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Estimate shipping error response:', errorText);
        throw new Error(`Failed to estimate shipping: ${response.statusText}`);
      }
      
      const data = await response.json();
      console.log('Shipping rates estimated successfully:', data);
      
      set({ 
        cart: { ...get().cart, shippingRates: data.shipping_rates }, 
        isLoading: false 
      });
      return data;
    } catch (err) {
      console.error('Error estimating shipping rates:', err);
      set({ error: err.message, isLoading: false });
      return null;
    }
  },
  
  // Clear cart state
  clearCart: async () => {
    console.log('Clearing cart state and storage');
    try {
      await AsyncStorage.removeItem('orderToken');
      console.log('Order token removed from storage');
      
      set({ 
        cart: null,
        orderToken: null,
        error: null
      });
      console.log('Cart state cleared');
      return true;
    } catch (err) {
      console.error('Error clearing cart:', err);
      set({ error: err.message });
      return false;
    }
  }
}));

export default useCartStore;