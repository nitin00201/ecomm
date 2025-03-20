import React from 'react';
import { View, Text, Image, TouchableOpacity, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const FavoritesScreen = () => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get('window').width;
  
  // Sample data for favorite products
  const favoriteProducts = [
    {
      id: '1',
      name: 'Nike Fuel Pack',
      price: 22.00,
    //   image: require('../assets/nike-fuel-pack.jpg'), // Replace with your image path
      liked: true,
    },
    {
      id: '2',
      name: 'Nike Dress X Rush',
      price: 39,
      priceVariant: true,
    //   image: require('../assets/nike-dress.jpg'), // Replace with your image path
      liked: true,
    },
    {
      id: '3',
      name: "Men's T-Shirt",
      price: 46.00,
    //   image: require('../assets/mens-tshirt.jpg'), // Replace with your image path
      liked: true,
    },
    {
      id: '4',
      name: "Men's Dripla T-Shirt",
      price: 46.00,
    //   image: require('../assets/mens-dripla.jpg'), // Replace with your image path
      liked: true,
    },
  ];

  const toggleFavorite = (productId) => {
    // Handle toggling favorite status
    console.log('Toggle favorite for product:', productId);
  };

  const navigateToProductDetail = (productId) => {
    // Navigate to product detail screen
    navigation.navigate('ProductDetailsScreen', { productId });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4">
        {/* Header */}
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">My Favourites (12)</Text>
        </View>

        {/* Product Grid */}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View className="flex-row flex-wrap justify-between">
            {favoriteProducts.map((product) => (
              <TouchableOpacity
                key={product.id}
                onPress={() => navigateToProductDetail(product.id)}
                className="mb-4"
                style={{ width: (windowWidth - 40) / 2 }} // Subtract padding and gap
              >
                {/* Product Card */}
                <View className="bg-gray-50 rounded-lg overflow-hidden">
                  {/* Product Image Container */}
                  <View className="relative">
                    <Image
                      source={product.image}
                      className="w-full h-40"
                      resizeMode="cover"
                    />
                    {/* Heart Icon */}
                    <TouchableOpacity
                      onPress={() => toggleFavorite(product.id)}
                      className="absolute top-2 right-2 bg-white bg-opacity-50 rounded-full p-1"
                    >
                      <Ionicons name={product.liked ? "heart" : "heart-outline"} size={18} color="red" />
                    </TouchableOpacity>
                  </View>

                  {/* Product Info */}
                  <View className="p-2">
                    <Text className="font-medium text-sm mb-1" numberOfLines={1}>
                      {product.name}
                    </Text>
                    <Text className="text-sm">
                      ${product.price.toFixed(2)}{product.priceVariant ? '+' : ''}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
          
          {/* Add extra padding at bottom for scrolling */}
          <View className="h-20" />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default FavoritesScreen;