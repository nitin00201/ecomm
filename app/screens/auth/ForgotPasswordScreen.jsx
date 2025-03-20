import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = () => {
    // Handle password reset logic (e.g., send a reset email)
    if (email) {
      // Alert.alert('Password reset link sent to your email!');
      navigation.navigate('PasswordResetConfirmationScreen'); // Navigate back to the Login screen after resetting
    } else {
      Alert.alert('Please enter your email address');
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-[#f4e1b2] px-5">
      {/* Forgot Password Form */}
      <Text className="text-4xl font-bold text-[#333] mb-10">Forgot Password</Text>

      {/* Email Input */}
      <TextInput
        style={{ paddingHorizontal: 15 }}  // Adding this inline style for padding as Tailwind doesn't support this property directly
        className="w-full h-14 bg-white rounded-xl mb-4 text-lg border border-[#ddd] shadow-md shadow-[#000] dark:shadow-opacity-10 dark:shadow-radius-5"
        placeholder="Enter your email"
        placeholderTextColor="#9e9e9e"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />

      {/* Reset Password Button */}
      <TouchableOpacity
        className="w-full h-16 bg-[#FF7043] flex justify-center items-center rounded-xl shadow-lg shadow-[#000] dark:shadow-opacity-20 dark:shadow-radius-10"
        onPress={handleResetPassword}
      >
        <Text className="text-white text-xl font-bold">Send Reset Link</Text>
      </TouchableOpacity>

      {/* Link to Login Screen */}
      <View className="mt-5 items-center">
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text className="text-[#FF7043] text-sm mb-2">Remembered your password? Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
