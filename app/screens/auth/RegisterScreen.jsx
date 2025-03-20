import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useRegistrationStore from '../../state/useRegistrationStore';

export default function RegisterStep1({ navigation }) {
  const { email, password, passwordConfirmation, updateEmailPassword, error, clearError } = useRegistrationStore();
  
  const [localEmail, setLocalEmail] = useState(email);
  const [localPassword, setLocalPassword] = useState(password);
  const [localPasswordConfirmation, setLocalPasswordConfirmation] = useState(passwordConfirmation);
  const [errors, setErrors] = useState({});
  
  // Show API error if present
  useEffect(() => {
    if (error) {
      Alert.alert('Registration Error', error);
      clearError();
    }
  }, [error, clearError]);
  
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!localEmail) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(localEmail)) {
      newErrors.email = 'Email is invalid';
    }
    
    // Password validation
    if (!localPassword) {
      newErrors.password = 'Password is required';
    } else if (localPassword.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Password confirmation validation
    if (localPassword !== localPasswordConfirmation) {
      newErrors.passwordConfirmation = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = () => {
    if (validateForm()) {
      updateEmailPassword(localEmail, localPassword, localPasswordConfirmation);
      navigation.navigate('ProfileSetup');
    }
  };
  
  return (
    <SafeAreaView className="flex-1 bg-[#F8E9C1]">
      <View className="flex-1 px-6 justify-center">
        <Text className="text-3xl font-bold text-[#333333] mb-2">Create Account</Text>
        <Text className="text-base text-[#666666] mb-6">Step 1: Login Information</Text>
        
        <View className="mb-6">
          <View className="mb-4">
            <Text className="text-sm text-[#333333] mb-2 font-medium">Email</Text>
            <TextInput
              className="w-full h-12 bg-white rounded-lg px-4 text-base border border-[#E0E0E0]"
              value={localEmail}
              onChangeText={setLocalEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {errors.email && <Text className="text-[#FF3B30] text-xs mt-1">{errors.email}</Text>}
          </View>
          
          <View className="mb-4">
            <Text className="text-sm text-[#333333] mb-2 font-medium">Password</Text>
            <TextInput
              className="w-full h-12 bg-white rounded-lg px-4 text-base border border-[#E0E0E0]"
              value={localPassword}
              onChangeText={setLocalPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
            {errors.password && <Text className="text-[#FF3B30] text-xs mt-1">{errors.password}</Text>}
          </View>
          
          <View className="mb-6">
            <Text className="text-sm text-[#333333] mb-2 font-medium">Confirm Password</Text>
            <TextInput
              className="w-full h-12 bg-white rounded-lg px-4 text-base border border-[#E0E0E0]"
              value={localPasswordConfirmation}
              onChangeText={setLocalPasswordConfirmation}
              placeholder="Confirm your password"
              secureTextEntry
            />
            {errors.passwordConfirmation && <Text className="text-[#FF3B30] text-xs mt-1">{errors.passwordConfirmation}</Text>}
          </View>
        </View>
        
        <TouchableOpacity 
          className="bg-[#FF8C00] py-4 rounded-lg items-center mb-6"
          onPress={handleNext}
        >
          <Text className="text-white text-lg font-bold">Next</Text>
        </TouchableOpacity>
        
        <View className="flex-row justify-center">
          <Text className="text-[#666666] text-sm">Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text className="text-[#FF8C00] text-sm font-bold">Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
