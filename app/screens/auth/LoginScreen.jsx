import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuthStore from '../../state/useAuthStore';
import useCartStore from '@/app/state/useCartStore';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('spree@example.com');
  const [password, setPassword] = useState('spree123');
  const { initializeUserCart} = useCartStore();

  // Get auth store state and methods
  const { 
    login, 
    isAuthenticated, 
    isLoading, 
    error, 
    clearError 
  } = useAuthStore();

  // Navigate to Home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      // Navigate to home or wherever you want after login
    }
  }, [isAuthenticated, navigation]);

  useEffect(() => {
    if (error) {
      Alert.alert('Login Failed', error);
      clearError();
    }
  }, [error, clearError]);

  const handleLogin = async () => {
    const success = await login(email, password);
    if (success) {
      console.log('Successfully logged in');
      const { accessToken } = useAuthStore.getState();
      console.log("access token is ", accessToken);
      await initializeUserCart(accessToken); 
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8E9C1]">
      <View className="flex-1 px-6 justify-center">
        <Text className="text-3xl font-bold text-[#333333] mb-2">Welcome Back</Text>
        <Text className="text-base text-[#666666] mb-8">Sign in to continue</Text>
        
        <View className="mb-4">
          <Text className="text-sm text-[#333333] mb-2 font-medium">Email</Text>
          <TextInput
            className="w-full h-12 bg-white rounded-lg px-4 text-base border border-[#E0E0E0]"
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        
        <View className="mb-4">
          <Text className="text-sm text-[#333333] mb-2 font-medium">Password</Text>
          <TextInput
            className="w-full h-12 bg-white rounded-lg px-4 text-base border border-[#E0E0E0]"
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity className="self-end mb-6" onPress={()=>{navigation.navigate('ForgotPassword')}}>
          <Text className="text-[#666666] text-sm">Forgot Password?</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          className="bg-[#FF8C00] py-4 rounded-lg items-center justify-center mb-6 shadow-md"
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text className="text-white text-lg font-bold">Sign In</Text>
          )}
        </TouchableOpacity>
        
        <View className="flex-row justify-center">
          <Text className="text-[#666666] text-sm">Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text className="text-[#FF8C00] text-sm font-bold">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
