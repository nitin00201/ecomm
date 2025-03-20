import React from 'react';
import { View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Svg, Path, G } from 'react-native-svg';

const PasswordResetConfirmationScreen = () => {
  const navigation = useNavigation();

  const handleReturnToLogin = () => {
    navigation.navigate('Login');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#f4e1b2]">
      <View className="flex-1 justify-center items-center px-6">
        {/* Email and Paper Plane Icon */}
        <View className="mb-6 relative">
          {/* Email Icon */}
          <Svg width="60" height="60" viewBox="0 0 60 60">
            <G>
              {/* Email Envelope */}
              <Path
                d="M12,15 L48,15 L48,45 L12,45 Z"
                fill="#FFD700"
                stroke="#000"
                strokeWidth="1.5"
              />
              {/* Top Flap */}
              <Path
                d="M12,15 L30,30 L48,15"
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
              />
              {/* Paper Plane Path (dotted line) */}
              <Path
                d="M30,8 Q38,5 46,12"
                fill="none"
                stroke="#000"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
              {/* Paper Plane */}
              <Path
                d="M46,12 L54,16 L46,20 L50,16 Z"
                fill="white"
                stroke="#000"
                strokeWidth="1.5"
              />
            </G>
          </Svg>
        </View>

        {/* Confirmation Message */}
        <Text className="text-center text-base font-medium text-[#333] mb-8">
          We Sent you an Email to reset your password.
        </Text>

        {/* Return to Login Button - Changed to match the style from ForgotPasswordScreen */}
        <TouchableOpacity
          onPress={handleReturnToLogin}
          className="bg-[#FF7043] py-3 px-8 rounded-xl shadow-lg shadow-[#000] dark:shadow-opacity-20 dark:shadow-radius-10"
        >
          <Text className="text-white text-center font-bold">
            Return to Login
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default PasswordResetConfirmationScreen;