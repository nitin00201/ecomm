import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, TextInput, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen() {
  const navigation = useNavigation();

  // Top selling products data
  const topSellingData = [
    {
      id: '1',
      image: require('../../assets/shirtl.png'),
      price: "$148.00",
      isWishlisted: false,
      color: "green"
    },
    {
      id: '2',
      image: require('../../assets/slipb.png'),
      price: "$55.00",
      isWishlisted: false,
      color: "black"
    },
    {
      id: '3',
      image: require('../../assets/slipb.png'),
      price: "$66.00",
      isWishlisted: false,
      color: "gray"
    }
  ];

  // New in products data
  const newInData = [
    {
      id: '1',
      image: "https://via.placeholder.com/150",
      price: "",
      isWishlisted: false,
      color: "brown"
    },
    {
      id: '2',
      image: "https://via.placeholder.com/150",
      price: "",
      isWishlisted: false,
      color: "beige"
    },
    {
      id: '3',
      image: "https://via.placeholder.com/150",
      price: "",
      isWishlisted: false,
      color: "beige"
    }
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <ScrollView className="flex-1">
        {/* Top navigation */}
        <View className="flex-row justify-between items-center px-4 py-3">
          <View className="h-10 w-10 rounded-full overflow-hidden bg-red-500">
            <Image 
              source={require('../../assets/profile.png')} 
              className="h-full w-full"
              alt='jdshjk'
            />
          </View>
          
          <TouchableOpacity className="bg-gray-100 rounded-full flex-row items-center px-4 py-2">
            <Text className="font-medium">Men</Text>
            <Ionicons name="chevron-down" size={16} color="#000" />
          </TouchableOpacity>
          
          <TouchableOpacity className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center" onPress={()=>{navigation.navigate('Cart')}}>
            <Ionicons name="cart-outline" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        
        {/* Search bar */}
        <View className="px-4 py-2">
          <View className="bg-gray-100 rounded-full flex-row items-center px-4 py-2">
            <Ionicons name="search" size={20} color="#666" />
            <TextInput 
              placeholder="Search" 
              className="ml-2 flex-1"
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* Categories section */}
        <View className="py-4">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-lg font-bold">Categories</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('Orders')}}>
              <Text className="text-base">See All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pl-4">
            <CategoryItem icon="shirt" label="Hoodies" color="purple" />
            <CategoryItem icon="basketball" label="Shorts" color="green" />
            <CategoryItem icon="footsteps" label="Shoes" color="blue" />
            <CategoryItem icon="bag-handle" label="Bag" color="orange" />
            <CategoryItem icon="glasses" label="Accessories" color="gray" />
          </ScrollView>
        </View>

        {/* Top Selling section - FlatList */}
        <View className="py-4">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-lg font-bold">Top Selling</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('AllProducts')}}>
              <Text className="text-base">See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={topSellingData}
            renderItem={({ item }) => (
              <ProductCard 
                image={item.image} 
                price={item.price} 
                isWishlisted={item.isWishlisted}
                color={item.color}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>

        {/* New In section - FlatList */}
        <View className="py-4">
          <View className="flex-row justify-between items-center px-4 mb-4">
            <Text className="text-lg font-bold text-purple-600">New In</Text>
            <TouchableOpacity onPress={()=>{navigation.navigate('AllProducts')}}>
              <Text className="text-base">See All</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={newInData}
            renderItem={({ item }) => (
              <ProductCard 
                image={item.image} 
                price={item.price} 
                isWishlisted={item.isWishlisted}
                color={item.color}
              />
            )}
            keyExtractor={item => item.id}
            contentContainerStyle={{ paddingLeft: 16 }}
          />
        </View>
      </ScrollView>
      
      {/* Bottom tabs */}
      
    </SafeAreaView>
  );
}

// Component for category items
function CategoryItem({ icon, label, color }) {
  const bgColors = {
    purple: 'bg-purple-100',
    green: 'bg-green-100',
    blue: 'bg-blue-100',
    orange: 'bg-orange-100',
    gray: 'bg-gray-100',
  };
  
  return (
    <TouchableOpacity className="mr-4 items-center">
      <View className={`w-16 h-16 rounded-full ${bgColors[color] || 'bg-gray-100'} items-center justify-center`}>
        <Ionicons name={icon} size={24} color="#333" />
      </View>
      <Text className="mt-2 text-center text-sm">{label}</Text>
    </TouchableOpacity>
  );
}

// Component for product cards
function ProductCard({ image, price, isWishlisted, color }) {
  return (
    <View className="mr-4 w-40 mb-2">
      <View className="relative bg-gray-100 rounded-lg overflow-hidden">
        <Image 
          source={ typeof image === 'string' && image.includes('http') ? { uri: image } : image } 
          className="w-full h-48"
          resizeMode="cover"
        />
        <TouchableOpacity className="absolute top-2 right-2 bg-white rounded-full p-1">
          <Ionicons 
            name={isWishlisted ? "heart" : "heart-outline"} 
            size={20} 
            color={isWishlisted ? "#f43f5e" : "#666"} 
          />
        </TouchableOpacity>
      </View>
      {price ? (
        <Text className="mt-2 font-semibold text-base">{price}</Text>
      ) : null}
    </View>
  );
}
