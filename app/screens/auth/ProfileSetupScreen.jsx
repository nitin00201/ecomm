import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useRegistrationStore from '../../state/useRegistrationStore';

export default function ProfileSetupScreen() {
  const navigation = useNavigation();
  
  // Get values and update function from registration store
  const { firstName: storedFirstName, lastName: storedLastName, updateName } = useRegistrationStore();
  
  // Local state initialized with values from the store
  const [firstName, setFirstName] = useState(storedFirstName || '');
  const [lastName, setLastName] = useState(storedLastName || '');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    
    if (!firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateForm()) {
      // Update the global state with first name and last name
      updateName(firstName, lastName);
      
      // Navigate to Address Setup Screen
      navigation.navigate('AddressSetup');
    } else {
      // Show alert if validation fails
      Alert.alert('Please fill in all required fields');
    }
  };

  return (
    <View className="flex-1 justify-center px-6 bg-[#F8E9C1]">
      <Text className="text-3xl font-bold text-[#333] mb-2">Profile Setup</Text>
      <Text className="text-base text-[#666] mb-8">Tell us about yourself</Text>

      {/* First Name Input */}
      <View className="mb-5">
        <Text className="text-sm font-medium text-[#333] mb-2">First Name</Text>
        <TextInput
          className={`w-full h-12 bg-white rounded-xl px-4 text-base border ${errors.firstName ? 'border-[#FF3B30]' : 'border-[#ddd]'} `}
          placeholder="Enter your first name"
          placeholderTextColor="#999"
          value={firstName}
          onChangeText={(text) => {
            setFirstName(text);
            if (errors.firstName) {
              setErrors({ ...errors, firstName: null });
            }
          }}
        />
        {errors.firstName && <Text className="text-[#FF3B30] text-xs mt-1">{errors.firstName}</Text>}
      </View>

      {/* Last Name Input */}
      <View className="mb-8">
        <Text className="text-sm font-medium text-[#333] mb-2">Last Name</Text>
        <TextInput
          className={`w-full h-12 bg-white rounded-xl px-4 text-base border ${errors.lastName ? 'border-[#FF3B30]' : 'border-[#ddd]'} `}
          placeholder="Enter your last name"
          placeholderTextColor="#999"
          value={lastName}
          onChangeText={(text) => {
            setLastName(text);
            if (errors.lastName) {
              setErrors({ ...errors, lastName: null });
            }
          }}
        />
        {errors.lastName && <Text className="text-[#FF3B30] text-xs mt-1">{errors.lastName}</Text>}
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between mt-8 mb-12">
        <TouchableOpacity 
          className="flex-1 h-12 bg-white border border-[#ddd] rounded-xl justify-center items-center mr-3"
          onPress={() => navigation.goBack()}
        >
          <Text className="text-[#666] text-lg font-semibold">Back</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="flex-1 h-12 bg-[#FF8C00] rounded-xl justify-center items-center ml-3"
          onPress={handleNext}
        >
          <Text className="text-white text-lg font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
      
      {/* Progress Indicator */}
      <View className="items-center">
        <View className="flex-row items-center mb-2">
          <View className="w-3 h-3 bg-[#FF8C00] rounded-full" />
          <View className="w-12 h-1 bg-[#ddd] mx-1" />
          <View className="w-3 h-3 bg-[#FF8C00] rounded-full" />
          <View className="w-12 h-1 bg-[#ddd] mx-1" />
          <View className="w-3 h-3 bg-[#ddd] rounded-full" />
          <View className="w-12 h-1 bg-[#ddd] mx-1" />
          <View className="w-3 h-3 bg-[#ddd] rounded-full" />
        </View>
        <Text className="text-sm text-[#666]">Step 2 of 4</Text>
      </View>
    </View>
  );
}
