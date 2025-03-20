import React, { useState } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  TextInput,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { Feather, FontAwesome, MaterialIcons } from '@expo/vector-icons';

export default function CCScreen({ navigation, route }) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [saveCard, setSaveCard] = useState(false);
  
  // Dummy price data (normally would come from route.params or a global state)
  const orderDetails = {
    subtotal: 799,
    deliveryFee: 40,
    discount: 100,
    total: 739
  };

  const formatCardNumber = (text) => {
    // Remove non-digits
    const cleanText = text.replace(/\D/g, '');
    // Add spaces every 4 digits
    let formatted = '';
    for (let i = 0; i < cleanText.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += cleanText[i];
    }
    return formatted.slice(0, 19); // Limit to 16 digits + 3 spaces
  };

  const formatExpiryDate = (text) => {
    // Remove non-digits
    const cleanText = text.replace(/\D/g, '');
    // Add slash after first 2 digits
    if (cleanText.length > 2) {
      return `${cleanText.slice(0, 2)}/${cleanText.slice(2, 4)}`;
    }
    return cleanText;
  };

  const handlePayment = () => {
    // Validate credit card details
    if (cardNumber.length < 19) {
      Alert.alert('Invalid Card', 'Please enter a valid card number');
      return;
    }
    if (!cardName) {
      Alert.alert('Invalid Name', 'Please enter the name on card');
      return;
    }
    if (expiryDate.length < 5) {
      Alert.alert('Invalid Date', 'Please enter a valid expiry date');
      return;
    }
    if (cvv.length < 3) {
      Alert.alert('Invalid CVV', 'Please enter a valid CVV');
      return;
    }

    // Simulate payment processing
    Alert.alert(
      'Processing Payment',
      'Please wait while we process your payment...',
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to success screen after "processing"
            setTimeout(() => {
              navigation.navigate('SuccessScreen');
            }, 1500);
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        {/* Header */}
        <View className="bg-white p-4 flex-row items-center border-b border-gray-200">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Feather name="arrow-left" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-bold">Card Payment</Text>
        </View>

        <ScrollView className="flex-1">
          {/* Card Input Section */}
          <View className="bg-white m-4 p-4 rounded-xl shadow-sm">
            <Text className="text-lg font-bold mb-6">Enter Card Details</Text>
            
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Card Number</Text>
              <View className="flex-row border border-gray-300 rounded-lg p-3 items-center">
                <FontAwesome name="credit-card" size={20} color="#666" />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChangeText={(text) => setCardNumber(formatCardNumber(text))}
                  keyboardType="numeric"
                  maxLength={19}
                />
              </View>
            </View>
            
            <View className="mb-4">
              <Text className="text-sm text-gray-600 mb-2">Name on Card</Text>
              <View className="flex-row border border-gray-300 rounded-lg p-3 items-center">
                <FontAwesome name="user" size={20} color="#666" />
                <TextInput
                  className="flex-1 ml-3 text-base"
                  placeholder="John Doe"
                  value={cardName}
                  onChangeText={setCardName}
                />
              </View>
            </View>
            
            <View className="flex-row mb-4">
              <View className="flex-1 mr-2">
                <Text className="text-sm text-gray-600 mb-2">Expiry Date</Text>
                <View className="flex-row border border-gray-300 rounded-lg p-3 items-center">
                  <FontAwesome name="calendar" size={20} color="#666" />
                  <TextInput
                    className="flex-1 ml-3 text-base"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChangeText={(text) => setExpiryDate(formatExpiryDate(text))}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                </View>
              </View>
              
              <View className="flex-1 ml-2">
                <Text className="text-sm text-gray-600 mb-2">CVV</Text>
                <View className="flex-row border border-gray-300 rounded-lg p-3 items-center">
                  <FontAwesome name="lock" size={20} color="#666" />
                  <TextInput
                    className="flex-1 ml-3 text-base"
                    placeholder="123"
                    value={cvv}
                    onChangeText={(text) => setCvv(text.replace(/\D/g, '').slice(0, 3))}
                    keyboardType="numeric"
                    maxLength={3}
                    secureTextEntry
                  />
                </View>
              </View>
            </View>
            
            <TouchableOpacity 
              className="flex-row items-center mb-4"
              onPress={() => setSaveCard(!saveCard)}
            >
              <View className="h-5 w-5 rounded border border-gray-400 items-center justify-center">
                {saveCard && <MaterialIcons name="check" size={14} color="#FF9500" />}
              </View>
              <Text className="ml-2 text-gray-700">Save card for future payments</Text>
            </TouchableOpacity>
            
            <View className="bg-blue-50 p-3 rounded-lg mb-2 flex-row items-start">
              <MaterialIcons name="security" size={22} color="#0284c7" className="mr-2" />
              <Text className="text-blue-800 flex-1 ml-2">
                Your card information is securely processed and encrypted.
              </Text>
            </View>
          </View>
          
          {/* Payment Summary */}
          <View className="bg-white m-4 p-4 rounded-xl shadow-sm">
            <Text className="text-lg font-bold mb-4">Payment Summary</Text>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Subtotal</Text>
              <Text>₹{orderDetails.subtotal}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Delivery Fee</Text>
              <Text>₹{orderDetails.deliveryFee}</Text>
            </View>
            
            <View className="flex-row justify-between mb-2">
              <Text className="text-gray-600">Discount</Text>
              <Text className="text-green-600">-₹{orderDetails.discount}</Text>
            </View>
            
            <View className="flex-row justify-between pt-3 mt-3 border-t border-gray-200">
              <Text className="font-bold">Total</Text>
              <Text className="font-bold">₹{orderDetails.total}</Text>
            </View>
          </View>
          
          {/* Available Cards (if any saved previously) */}
          <View className="bg-white m-4 p-4 rounded-xl shadow-sm">
            <Text className="text-lg font-bold mb-4">Saved Cards</Text>
            
            <View className="p-4 border border-dashed border-gray-300 rounded-lg items-center">
              <Text className="text-gray-500">No saved cards</Text>
              <Text className="text-gray-500">Your cards will appear here</Text>
            </View>
          </View>
        </ScrollView>
        
        {/* Payment Button */}
        <View className="bg-white p-4 border-t border-gray-200">
          <TouchableOpacity 
            className="bg-orange-500 py-4 rounded-xl"
            onPress={handlePayment}
          >
            <Text className="text-white font-bold text-center">Pay ₹{orderDetails.total}</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}