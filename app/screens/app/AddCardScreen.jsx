import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AddCardScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { onSave } = route.params || {};
  
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cvv: '',
    expDate: '',
    cardholderName: '',
  });
  
  const [errors, setErrors] = useState({});
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!cardData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(cardData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Invalid card number';
    }
    
    if (!cardData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(cardData.cvv)) {
      newErrors.cvv = 'Invalid CVV';
    }
    
    if (!cardData.expDate.trim()) {
      newErrors.expDate = 'Expiration date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expDate)) {
      newErrors.expDate = 'Invalid format (MM/YY)';
    }
    
    if (!cardData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const formatCardNumber = (text) => {
    // Remove all non-digit characters
    const cleaned = text.replace(/\D/g, '');
    
    // Add a space after every 4 digits
    const formatted = cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
    
    return formatted.substring(0, 19); // Limit to 16 digits + 3 spaces
  };
  
  const handleSave = () => {
    if (validateForm()) {
      // Format card data for saving
      const last4 = cardData.cardNumber.replace(/\s/g, '').slice(-4);
      const brand = detectCardBrand(cardData.cardNumber);
      
      if (onSave) {
        onSave({
          id: Date.now().toString(),
          last4,
          brand,
          // Don't save full card number for security
        });
      }
      
      navigation.goBack();
    }
  };
  
  const detectCardBrand = (cardNumber) => {
    const cleanedNumber = cardNumber.replace(/\s/g, '');
    
    if (/^5[1-5]/.test(cleanedNumber)) {
      return 'mastercard';
    } else if (/^4/.test(cleanedNumber)) {
      return 'visa';
    } else if (/^3[47]/.test(cleanedNumber)) {
      return 'amex';
    } else {
      return 'unknown';
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 flex-1">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Add Card</Text>
        </View>
        
        <View className="mb-4">
          <TextInput
            className={`bg-gray-100 p-4 rounded-lg mb-1 ${errors.cardNumber ? 'border border-red-500' : ''}`}
            placeholder="Card Number"
            value={cardData.cardNumber}
            onChangeText={(text) => setCardData({ ...cardData, cardNumber: formatCardNumber(text) })}
            keyboardType="numeric"
            maxLength={19}
          />
          {errors.cardNumber && <Text className="text-red-500 text-sm">{errors.cardNumber}</Text>}
        </View>
        
        <View className="flex-row mb-4">
          <View className="flex-1 mr-2">
            <TextInput
              className={`bg-gray-100 p-4 rounded-lg mb-1 ${errors.cvv ? 'border border-red-500' : ''}`}
              placeholder="CVV"
              value={cardData.cvv}
              onChangeText={(text) => setCardData({ ...cardData, cvv: text.replace(/\D/g, '') })}
              keyboardType="numeric"
              maxLength={4}
              secureTextEntry
            />
            {errors.cvv && <Text className="text-red-500 text-sm">{errors.cvv}</Text>}
          </View>
          
          <View className="flex-1 ml-2">
            <TextInput
              className={`bg-gray-100 p-4 rounded-lg mb-1 ${errors.expDate ? 'border border-red-500' : ''}`}
              placeholder="Exp"
              value={cardData.expDate}
              onChangeText={(text) => {
                // Format MM/YY
                const cleaned = text.replace(/\D/g, '');
                let formatted = cleaned;
                if (cleaned.length > 2) {
                  formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2, 4);
                }
                setCardData({ ...cardData, expDate: formatted });
              }}
              keyboardType="numeric"
              maxLength={5}
            />
            {errors.expDate && <Text className="text-red-500 text-sm">{errors.expDate}</Text>}
          </View>
        </View>
        
        <View className="mb-4">
          <TextInput
            className={`bg-gray-100 p-4 rounded-lg mb-1 ${errors.cardholderName ? 'border border-red-500' : ''}`}
            placeholder="Cardholder Name"
            value={cardData.cardholderName}
            onChangeText={(text) => setCardData({ ...cardData, cardholderName: text })}
            autoCapitalize="words"
          />
          {errors.cardholderName && <Text className="text-red-500 text-sm">{errors.cardholderName}</Text>}
        </View>
        
        <View className="flex-1" />
        
        <TouchableOpacity
          onPress={handleSave}
          className="bg-purple-600 py-4 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddCardScreen;
