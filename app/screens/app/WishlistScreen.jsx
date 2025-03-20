import React, { useState } from 'react';
import { View, Text, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const WishlistScreen = () => {
  const navigation = useNavigation();
  const [wishlistCategories, setWishlistCategories] = useState([
    { id: '1', name: 'My Favorite', icon: 'heart', products: 12 },
    { id: '2', name: 'T-Shirts', icon: 'heart-outline', products: 8 },
  ]);

  const handleCategoryPress = (categoryId) => {
    // Navigate to category detail page
    navigation.navigate('FavoritesScreen', { categoryId });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 p-4">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Wishlist</Text>
        </View>

        {wishlistCategories.map((category) => (
          <TouchableOpacity 
            key={category.id}
            onPress={() => handleCategoryPress(category.id)}
            className="flex-row items-center justify-between bg-gray-100 p-4 rounded-lg mb-2"
          >
            <View className="flex-row items-center">
              <Ionicons name={category.icon} size={20} color="#666" className="mr-2" />
              <View>
                <Text className="text-gray-800 font-medium">{category.name}</Text>
                <Text className="text-gray-500 text-sm">{category.products} Products</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#888" />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default WishlistScreen;