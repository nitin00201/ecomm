import React, { useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity, 
  Image,
  StyleSheet,
  Animated,
  Easing
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import LottieView from 'lottie-react-native';

export default function SuccessScreen({ navigation }) {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(50)).current;
  const lottieRef = useRef(null);

  useEffect(() => {
    // Play check mark animation
    if (lottieRef.current) {
      lottieRef.current.play();
    }

    // Start animations in sequence
    Animated.sequence([
      // 1. Scale the success icon
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        easing: Easing.elastic(1),
        useNativeDriver: true
      }),
      
      // 2. Fade in and move up the text content
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 800,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true
        })
      ])
    ]).start();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 justify-center items-center px-6">
        {/* Lottie Animation */}
        <View className="mb-6">
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <View className="w-32 h-32 bg-green-100 rounded-full justify-center items-center">
              <LottieView
                ref={lottieRef}
                source={require('../../assets/lottie.json')} 
                style={{ width: 150, height: 150 }}
                autoPlay={false}
                loop={false}
              />
            </View>
          </Animated.View>
        </View>

        {/* Success Text */}
        <Animated.View 
          style={{ 
            opacity: fadeAnim,
            transform: [{ translateY: translateY }],
            alignItems: 'center'
          }}
        >
          <Text className="text-2xl font-bold mb-3 text-center">Order Placed Successfully!</Text>
          <Text className="text-gray-600 mb-6 text-center">
            Your order has been confirmed and will be shipped soon.
          </Text>

          {/* Order Info */}
          <View className="bg-gray-100 rounded-xl w-full p-4 mb-6">
            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-600">Order Number</Text>
              <Text className="font-bold">#OD12345678</Text>
            </View>
            <View className="flex-row justify-between mb-3">
              <Text className="text-gray-600">Delivery Date</Text>
              <Text className="font-bold">March 20, 2025</Text>
            </View>
            <View className="flex-row justify-between">
              <Text className="text-gray-600">Payment Method</Text>
              <Text className="font-bold">Cash on Delivery</Text>
            </View>
          </View>

          {/* Information Alert */}
          <View className="bg-blue-50 p-4 rounded-xl w-full mb-6 flex-row">
            <MaterialIcons name="info" size={24} color="#0284c7" className="mr-2" />
            <View className="flex-1 ml-2">
              <Text className="text-blue-800 mb-1 font-bold">Track your order</Text>
              <Text className="text-blue-600">
                You will receive an email and SMS with tracking information.
              </Text>
            </View>
          </View>
        </Animated.View>
      </View>

      {/* Bottom Buttons */}
      <Animated.View style={{ opacity: fadeAnim }}>
        <View className="pb-6 px-6">
          <TouchableOpacity 
            className="bg-orange-500 py-4 rounded-xl mb-3"
            onPress={() => navigation.navigate('TrackOrderScreen')}
          >
            <Text className="text-white font-bold text-center">Track Order</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="py-4 border border-gray-300 rounded-xl"
            onPress={() => navigation.navigate('Tabs')}
          >
            <Text className="font-bold text-center">Continue Shopping</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </SafeAreaView>
  );
}