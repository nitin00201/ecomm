import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  SafeAreaView, 
  TouchableOpacity,
  ScrollView,
  Image,
  StyleSheet,
  Alert
} from 'react-native';
import { Feather, AntDesign, MaterialIcons, Ionicons } from '@expo/vector-icons';

export default function SUScreen({ navigation }) {
  // Demo wallet balance and required amount
  const [walletBalance, setWalletBalance] = useState(125);
  const requiredAmount = 739;
  const [isLoading, setIsLoading] = useState(false);
  const [showRechargeOptions, setShowRechargeOptions] = useState(false);

  // Check if user has enough balance
  const hasEnoughBalance = walletBalance >= requiredAmount;

  // Quick recharge options
  const rechargeOptions = [
    { amount: 100, bonusCoins: 0 },
    { amount: 500, bonusCoins: 50 },
    { amount: 1000, bonusCoins: 150 },
  ];

  const handleRecharge = (amount) => {
    setIsLoading(true);
    
    // Simulate processing delay
    setTimeout(() => {
      setWalletBalance(walletBalance + amount + (amount === 100 ? 0 : amount === 500 ? 50 : 150));
      setIsLoading(false);
      setShowRechargeOptions(false);
      
      Alert.alert(
        "Recharge Successful",
        `${amount} SuperCoins added to your wallet${amount > 100 ? ' with bonus coins!' : '!'}`
      );
    }, 1500);
  };

  const handlePayment = () => {
    if (!hasEnoughBalance) {
      Alert.alert(
        "Insufficient Balance",
        "You don't have enough SuperCoins. Please recharge your wallet.",
        [
          { text: "Cancel", style: "cancel" },
          { text: "Recharge Now", onPress: () => setShowRechargeOptions(true) }
        ]
      );
      return;
    }

    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setWalletBalance(walletBalance - requiredAmount);
      setIsLoading(false);
      
      // Navigate to success screen
      navigation.navigate('SuccessScreen');
    }, 1500);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      {/* Header */}
      <View className="bg-white p-4 flex-row items-center border-b border-gray-200">
        <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
          <Feather name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        <Text className="text-xl font-bold">SuperCoins Payment</Text>
      </View>

      <ScrollView className="flex-1">
        {/* Wallet Balance Section */}
        <View className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm">
          <Text className="text-base text-gray-600 mb-2">Your SuperCoins Balance</Text>
          <View className="flex-row items-center">
            <AntDesign name="star" size={28} color="#FFA41C" />
            <Text className="text-3xl font-bold ml-2">{walletBalance}</Text>
          </View>
          
          {!hasEnoughBalance && (
            <View className="bg-red-50 p-3 rounded-lg mt-4 flex-row items-center">
              <AntDesign name="exclamationcircle" size={20} color="#ef4444" />
              <Text className="text-red-600 ml-2 flex-1">
                Insufficient balance. You need {requiredAmount - walletBalance} more SuperCoins.
              </Text>
            </View>
          )}
          
          {hasEnoughBalance && (
            <View className="bg-green-50 p-3 rounded-lg mt-4 flex-row items-center">
              <AntDesign name="checkcircle" size={20} color="#10b981" />
              <Text className="text-green-600 ml-2 flex-1">
                You have enough SuperCoins for this purchase!
              </Text>
            </View>
          )}
        </View>

        {/* Payment Details */}
        <View className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm">
          <Text className="text-lg font-bold mb-4">Payment Details</Text>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Order Amount</Text>
            <View className="flex-row items-center">
              <AntDesign name="star" size={16} color="#FFA41C" />
              <Text className="ml-1">{requiredAmount}</Text>
            </View>
          </View>
          
          <View className="flex-row justify-between mb-2">
            <Text className="text-gray-600">Remaining Balance After Payment</Text>
            <View className="flex-row items-center">
              <AntDesign name="star" size={16} color="#FFA41C" />
              <Text className="ml-1">{Math.max(0, walletBalance - requiredAmount)}</Text>
            </View>
          </View>
        </View>

        {/* Recharge Options */}
        {showRechargeOptions ? (
          <View className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold">Recharge Options</Text>
              <TouchableOpacity onPress={() => setShowRechargeOptions(false)}>
                <AntDesign name="close" size={22} color="#666" />
              </TouchableOpacity>
            </View>
            
            {rechargeOptions.map((option, index) => (
              <TouchableOpacity 
                key={index}
                className="border border-gray-300 rounded-lg p-4 mb-3"
                onPress={() => handleRecharge(option.amount)}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-row items-center">
                    <AntDesign name="star" size={20} color="#FFA41C" />
                    <Text className="text-lg font-bold ml-2">{option.amount}</Text>
                  </View>
                  <Text className="text-lg font-bold">₹{option.amount}</Text>
                </View>
                
                {option.bonusCoins > 0 && (
                  <View className="bg-green-50 mt-2 p-2 rounded-lg">
                    <Text className="text-green-600">
                      Get {option.bonusCoins} bonus SuperCoins!
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <TouchableOpacity 
            className="bg-white mx-4 mt-4 p-4 rounded-xl shadow-sm flex-row items-center justify-between"
            onPress={() => setShowRechargeOptions(true)}
          >
            <View className="flex-row items-center">
              <MaterialIcons name="account-balance-wallet" size={24} color="#FF9500" />
              <Text className="text-lg font-medium ml-3">Recharge Wallet</Text>
            </View>
            <AntDesign name="right" size={16} color="#666" />
          </TouchableOpacity>
        )}

        {/* Benefits Section */}
        <View className="bg-white mx-4 mt-4 mb-24 p-4 rounded-xl shadow-sm">
          <Text className="text-lg font-bold mb-4">SuperCoins Benefits</Text>
          
          <View className="flex-row items-center mb-3">
            <View className="w-8 h-8 bg-blue-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="shield-checkmark" size={18} color="#0284c7" />
            </View>
            <Text className="text-gray-700 flex-1">Pay securely with SuperCoins</Text>
          </View>
          
          <View className="flex-row items-center mb-3">
            <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-3">
              <Feather name="refresh-cw" size={18} color="#10b981" />
            </View>
            <Text className="text-gray-700 flex-1">Earn coins with every purchase</Text>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-purple-100 rounded-full items-center justify-center mr-3">
              <MaterialIcons name="redeem" size={18} color="#8b5cf6" />
            </View>
            <Text className="text-gray-700 flex-1">Redeem for exclusive rewards</Text>
          </View>
        </View>
      </ScrollView>

      {/* Payment Button */}
      <View className="bg-white p-4 border-t border-gray-200 absolute bottom-0 left-0 right-0">
        <TouchableOpacity 
          className={`py-4 rounded-xl ${hasEnoughBalance ? 'bg-orange-500' : 'bg-gray-400'}`}
          onPress={handlePayment}
          disabled={isLoading || !hasEnoughBalance}
        >
          {isLoading ? (
            <Text className="text-white font-bold text-center">Processing...</Text>
          ) : (
            <Text className="text-white font-bold text-center">Pay {requiredAmount} SuperCoins</Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}