import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const PaymentScreen = () => {
  const navigation = useNavigation();
  const [paymentMethods, setPaymentMethods] = useState({
    cards: [
      { id: '1', last4: '4187', brand: 'mastercard' },
      { id: '2', last4: '3367', brand: 'mastercard' },
    ],
    paypal: {
      email: 'Clothe@gmail.com'
    }
  });

  const handleAddCard = () => {
    navigation.navigate('AddCardScreen', {
      onSave: (cardData) => {
        setPaymentMethods({
          ...paymentMethods,
          cards: [...paymentMethods.cards, cardData]
        });
      }
    });
  };

  const handleCardPress = (cardId) => {
    // Handle card selection or editing
    console.log('Selected card:', cardId);
  };

  const handlePaypalPress = () => {
    // Handle PayPal account selection or editing
    console.log('PayPal selected');
  };

  return (
    <SafeAreaView className="flex-1 bg-white ">
      <ScrollView className="flex-1 p-4">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Payment</Text>
        </View>

        {/* Cards Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">Cards</Text>
          {paymentMethods.cards.map((card) => (
            <TouchableOpacity 
              key={card.id}
              onPress={() => handleCardPress(card.id)}
              className="flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-2"
            >
              <View className="flex-row items-center">
                <Text className="text-gray-800 mr-2">•••• {card.last4}</Text>
                {card.brand === 'mastercard' && (
                  <MaterialCommunityIcons name="credit-card" size={20} color="#FF5F00" />
                )}
              </View>
              <Ionicons name="chevron-forward" size={20} color="#888" />
            </TouchableOpacity>
          ))}
        </View>

        {/* PayPal Section */}
        <View className="mb-6">
          <Text className="text-lg font-semibold mb-2">PayPal</Text>
          <TouchableOpacity 
            onPress={handlePaypalPress}
            className="flex-row items-center justify-between bg-gray-100 p-4 rounded-lg"
          >
            <Text className="text-gray-800">{paymentMethods.paypal.email}</Text>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>
        </View>

        {/* Add Card Button */}
        <TouchableOpacity 
          onPress={handleAddCard} 
          className="bg-purple-600 rounded-full p-4 absolute mt- bottom-0 right-8"
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PaymentScreen;