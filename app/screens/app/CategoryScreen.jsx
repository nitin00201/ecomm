import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function CategoryScreen({ navigation }) {
  // Category data with images and names
  const categories = [
    {
      id: 1,
      name: 'Hoodies',
      image: require('../../assets/hoodie.png'),
    },
    {
      id: 2,
      name: 'Accessories',
      image: require('../../assets/acessories.png'),
    },
    {
      id: 3,
      name: 'Shorts',
      image: require('../../assets/shorts.png'),
    },
    {
      id: 4,
      name: 'Shoes',
      image: require('../../assets/shoes.png'),
    },
    {
      id: 5,
      name: 'Bags',
      image: require('../../assets/bags.png'),
    },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header with back button */}
      <View className="px-4 py-4">
        <TouchableOpacity 
          className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      {/* Title */}
      <View className="px-4 py-2 mb-4">
        <Text className="text-2xl font-bold">Shop by Categories</Text>
      </View>
      
      {/* Categories list */}
      <ScrollView className="flex-1 px-4">
        {categories.map((category) => (
          <TouchableOpacity 
            key={category.id}
            className="flex-row items-center bg-gray-100 rounded-xl p-4 mb-3"
            onPress={() => console.log(`Selected category: ${category.name}`)}
          >
            <View className="w-12 h-12 mr-4 justify-center items-center">
              <Image 
                source={ category.image } 
                className="w-10 h-10"
                resizeMode="contain"
              />
            </View>
            <Text className="text-lg font-medium">{category.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      
      {/* Bottom indicator */}
      <View className="items-center py-4">
        <View className="w-10 h-1 bg-gray-800 rounded-full"></View>
      </View>
    </SafeAreaView>
  );
}