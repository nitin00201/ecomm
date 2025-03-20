import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity, 
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import { Feather, AntDesign, MaterialIcons, FontAwesome } from '@expo/vector-icons';

export default function CheckoutScreen({ navigation }) {
  const [selectedAddress, setSelectedAddress] = useState('1');
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showAddressForm, setShowAddressForm] = useState(false);

  const addresses = [
    {
      id: '1',
      name: 'John Doe',
      type: 'Home',
      address: '123 Main Street, Apartment 4B',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110016',
      phone: '+91 98765 43210',
      isDefault: true
    },
    {
      id: '2',
      name: 'John Doe',
      type: 'Work',
      address: '456 Business Park, Building 7',
      city: 'Gurgaon',
      state: 'Haryana',
      pincode: '122001',
      phone: '+91 99887 76655',
      isDefault: false
    }
  ];

  const cartItems = [
    {
      id: '1',
      name: 'soundcore by Anker Life P3i Wireless Earbuds',
      color: 'Blue',
      quantity: 1,
      price: 799,
      image: 'https://m.media-amazon.com/images/I/71zLCVJRVqL._AC_UY218_.jpg'
    }
  ];

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const deliveryFee = 40;
  const discount = 100;
  const total = calculateSubtotal() + deliveryFee - discount;

  const handlePlaceOrder = () => {
    // Navigate to different screens based on selected payment method
    if (selectedPayment === 'card') {
      navigation.navigate('CCScreen'); // Credit Card screen
    } else if (selectedPayment === 'supercoins') {
      navigation.navigate('SUScreen'); // SuperCoins screen
    } else if (selectedPayment === 'cod') {
      navigation.navigate('SuccessScreen'); // Direct to success for COD
    }
  };

  const renderAddressItem = (address) => {
    return (
      <TouchableOpacity 
        key={address.id}
        className="flex-row border border-gray-300 rounded-md p-4 mb-3"
        style={address.id === selectedAddress ? styles.selectedItem : {}}
        onPress={() => setSelectedAddress(address.id)}
      >
        <View className="mr-3 mt-1">
          <View className="h-5 w-5 rounded-full border border-gray-400 items-center justify-center">
            {address.id === selectedAddress && (
              <View className="h-3 w-3 rounded-full bg-orange-500" />
            )}
          </View>
        </View>
        
        <View className="flex-1">
          <View className="flex-row justify-between mb-1">
            <Text className="font-bold">{address.name}</Text>
            <View className="flex-row">
              <TouchableOpacity className="mr-4">
                <Text className="text-blue-700">Edit</Text>
              </TouchableOpacity>
              {!address.isDefault && (
                <TouchableOpacity>
                  <Feather name="trash-2" size={16} color="#666" />
                </TouchableOpacity>
              )}
            </View>
          </View>
          
          <Text className="mb-1">{address.address}</Text>
          <Text className="mb-1">{address.city}, {address.state} - {address.pincode}</Text>
          <Text className="mb-2">{address.phone}</Text>
          
          <View className="flex-row">
            <View className="bg-gray-200 rounded-md px-2 py-1 mr-2">
              <Text className="text-xs">{address.type}</Text>
            </View>
            {address.isDefault && (
              <View className="bg-gray-200 rounded-md px-2 py-1">
                <Text className="text-xs">Default</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white p-4 flex-row items-center border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">Checkout</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Delivery Address Section */}
        <View className="bg-white mb-2 p-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold">Delivery Address</Text>
            <TouchableOpacity 
              className="flex-row items-center"
              onPress={() => setShowAddressForm(!showAddressForm)}
            >
              <AntDesign name="plus" size={16} color="#007185" />
              <Text className="text-blue-700 ml-1">Add Address</Text>
            </TouchableOpacity>
          </View>

          {addresses.map(address => renderAddressItem(address))}
        </View>

        {/* Order Summary Section */}
        <View className="bg-white mb-2 p-4">
          <Text className="text-lg font-bold mb-4">Order Summary</Text>
          
          {cartItems.map(item => (
            <View key={item.id} className="flex-row mb-4">
              <Image 
                source={{ uri: item.image }} 
                className="w-20 h-20 mr-3"
              />
              <View className="flex-1">
                <Text className="mb-1 line-clamp-2">{item.name}</Text>
                <Text className="text-gray-500 mb-1">Color: {item.color}</Text>
                <View className="flex-row justify-between">
                  <Text className="text-gray-500">Qty: {item.quantity}</Text>
                  <Text className="font-bold">₹{item.price}</Text>
                </View>
              </View>
            </View>
          ))}
          
          <View className="border-t border-gray-200 pt-3 mb-3">
            <View className="flex-row justify-between mb-2">
              <Text>Subtotal</Text>
              <Text>₹{calculateSubtotal()}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text>Delivery Fee</Text>
              <Text>₹{deliveryFee}</Text>
            </View>
            <View className="flex-row justify-between mb-2">
              <Text>Discount</Text>
              <Text className="text-green-600">-₹{discount}</Text>
            </View>
            <View className="flex-row justify-between mt-3 pt-3 border-t border-gray-200">
              <Text className="font-bold">Total</Text>
              <Text className="font-bold">₹{total}</Text>
            </View>
          </View>
        </View>

        {/* Payment Options Section */}
        <View className="bg-white mb-2 p-4">
          <Text className="text-lg font-bold mb-4">Payment Options</Text>
          
          {/* Credit/Debit Card */}
          <TouchableOpacity 
            className="flex-row border border-gray-300 rounded-md p-4 mb-3 items-center"
            style={selectedPayment === 'card' ? styles.selectedItem : {}}
            onPress={() => setSelectedPayment('card')}
          >
            <View className="mr-3">
              <View className="h-5 w-5 rounded-full border border-gray-400 items-center justify-center">
                {selectedPayment === 'card' && (
                  <View className="h-3 w-3 rounded-full bg-orange-500" />
                )}
              </View>
            </View>
            <FontAwesome name="credit-card" size={20} color="#666" className="mr-3" />
            <View className="flex-1">
              <Text className="font-medium">Credit/Debit Card</Text>
              <Text className="text-xs text-gray-500">All major cards accepted</Text>
            </View>
          </TouchableOpacity>
          
          {/* SuperCoins */}
          <TouchableOpacity 
            className="flex-row border border-gray-300 rounded-md p-4 mb-3 items-center"
            style={selectedPayment === 'supercoins' ? styles.selectedItem : {}}
            onPress={() => setSelectedPayment('supercoins')}
          >
            <View className="mr-3">
              <View className="h-5 w-5 rounded-full border border-gray-400 items-center justify-center">
                {selectedPayment === 'supercoins' && (
                  <View className="h-3 w-3 rounded-full bg-orange-500" />
                )}
              </View>
            </View>
            <AntDesign name="star" size={20} color="#FFA41C" className="mr-3" />
            <View className="flex-1">
              <Text className="font-medium">SuperCoins</Text>
              <Text className="text-xs text-gray-500">Available balance: 125 coins</Text>
            </View>
          </TouchableOpacity>
          
          {/* Cash on Delivery */}
          <TouchableOpacity 
            className="flex-row border border-gray-300 rounded-md p-4 mb-3 items-center"
            style={selectedPayment === 'cod' ? styles.selectedItem : {}}
            onPress={() => setSelectedPayment('cod')}
          >
            <View className="mr-3">
              <View className="h-5 w-5 rounded-full border border-gray-400 items-center justify-center">
                {selectedPayment === 'cod' && (
                  <View className="h-3 w-3 rounded-full bg-orange-500" />
                )}
              </View>
            </View>
            <MaterialIcons name="money" size={20} color="#666" className="mr-3" />
            <View className="flex-1">
              <Text className="font-medium">Cash on Delivery</Text>
              <Text className="text-xs text-gray-500">Pay when your order arrives</Text>
            </View>
          </TouchableOpacity>
        </View>
        
        <View className="h-20" />
      </ScrollView>
      
      {/* Bottom Bar */}
      <View className="bg-white p-4 border-t border-gray-200 flex-row justify-between items-center">
        <View>
          <Text className="text-gray-500">Total Amount</Text>
          <Text className="text-xl font-bold">₹{total}</Text>
        </View>
        <TouchableOpacity 
          className="bg-orange-500 px-6 py-3 rounded-md"
          onPress={handlePlaceOrder}
        >
          <Text className="text-white font-bold">Place Order</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  selectedItem: {
    borderColor: '#ff9900',
    borderWidth: 2,
    backgroundColor: '#fff9e6'
  }
});