import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  TextInput,
  SafeAreaView,
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useCartStore from '../../state/useCartStore';
import useAuthStore from '@/app/state/useAuthStore';

export default function CartScreen({ navigation }) {
  // We'll use the cart store from your provided code, but simplify for this example
  const { cart, updateItemQuantity, removeItemFromCart, estimateShippingRates } = useCartStore();
  const { accessToken } = useAuthStore();

  // Sample cart data based on the image
  const cartItems = [
    {
      id: '1',
      name: "Men's Harrington Jacket",
      price: 148.00,
      size: 'M',
      color: 'Lemon',
      image: require("../../assets/menlcoat.png"),
      quantity: 1
    },
    {
      id: '2',
      name: "Men's Coaches Jacket",
      price: 52.00,
      size: 'M',
      color: 'Black',
      image: require("../../assets/menhcoat.png"),
      quantity: 1
    }
  ];

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const shipping = 8.00;
  const tax = 0.00;
  const total = subtotal + shipping + tax;

  // Handle quantity change
  const handleQuantityChange = (itemId, currentQuantity, change) => {
    updateItemQuantity(itemId, currentQuantity + change);
  };

  // Handle remove all items
  const handleRemoveAll = () => {
    // Implementation would depend on your useCartStore
    console.log("Remove all items");
  };

  // Render cart item
  const renderCartItem = (item) => (
    <View key={item.id} className="flex-row bg-gray-100 rounded-xl p-4 mb-3">
      <Image 
        source={item.image } 
        className="w-16 h-16 rounded-lg"
      />
      
      <View className="flex-1 ml-3">
        <Text className="text-base font-medium">{item.name}</Text>
        <View className="flex-row mt-1">
          <Text className="text-sm text-gray-500">Size - {item.size}</Text>
          <Text className="text-sm text-gray-500 ml-4">Color - {item.color}</Text>
        </View>
        
        <View className="flex-row justify-between items-center mt-2">
          <Text className="text-base font-bold">${item.price.toFixed(2)}</Text>
          
          <View className="flex-row items-center">
            <TouchableOpacity 
              className="w-6 h-6 bg-purple-600 rounded-full justify-center items-center"
              onPress={() => handleQuantityChange(item.id, item.quantity, -1)}
            >
              <Text className="text-white font-bold text-lg" style={{marginTop: -3}}>-</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              className="w-6 h-6 bg-purple-600 rounded-full justify-center items-center ml-2"
              onPress={() => handleQuantityChange(item.id, item.quantity, 1)}
            >
              <Text className="text-white font-bold text-lg" style={{marginTop: -3}}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-4">
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        
        <Text className="text-xl font-semibold">Cart</Text>
        
        <TouchableOpacity onPress={handleRemoveAll}>
          <Text className="text-base">Remove All</Text>
        </TouchableOpacity>
      </View>
      
      {/* Cart Items */}
      <ScrollView className="flex-1 px-4">
        {cartItems.map(item => renderCartItem(item))}
        
        {/* Order Summary */}
        <View className="mt-4 mb-6">
          <View className="flex-row justify-between py-3">
            <Text className="text-base text-gray-500">Subtotal</Text>
            <Text className="text-base font-medium">${subtotal.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between py-3">
            <Text className="text-base text-gray-500">Shipping Cost</Text>
            <Text className="text-base font-medium">${shipping.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between py-3">
            <Text className="text-base text-gray-500">Tax</Text>
            <Text className="text-base font-medium">${tax.toFixed(2)}</Text>
          </View>
          
          <View className="flex-row justify-between py-3">
            <Text className="text-lg font-medium">Total</Text>
            <Text className="text-lg font-bold">${total.toFixed(2)}</Text>
          </View>
        </View>
        
        {/* Coupon Code */}
        <View className="flex-row bg-gray-100 rounded-xl overflow-hidden mb-6">
          <View className="flex-row items-center flex-1 px-4">
            <Ionicons name="ticket-outline" size={20} color="green" />
            <TextInput
              placeholder="Enter Coupon Code"
              className="flex-1 py-4 px-2"
              placeholderTextColor="#999"
            />
          </View>
          <TouchableOpacity className="bg-purple-600 px-5 justify-center">
            <Ionicons name="chevron-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
        
        {/* Checkout Button */}
        <TouchableOpacity 
          className="bg-purple-600 py-4 rounded-full items-center mb-8"
          onPress={() => navigation.navigate('Checkout')}
        >
          <Text className="text-white text-lg font-medium">Checkout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}