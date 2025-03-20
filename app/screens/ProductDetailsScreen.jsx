import React, { useState } from 'react';
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Modal,
  SafeAreaView,
  StatusBar,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function ProductDetailScreen({ navigation }) {
  // State for quantity, selected size, selected color and modals
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('S');
  const [selectedColor, setSelectedColor] = useState('green');
  const [sizeModalVisible, setSizeModalVisible] = useState(false);
  const [colorModalVisible, setColorModalVisible] = useState(false);
  
  // Product data
  const product = {
    id: '1',
    name: "Men's Harrington Jacket",
    price: 148,
    description: "Built for life and made to last, this full-zip corduroy jacket is part of our Nike Life collection. The spacious fit gives you plenty of room to layer underneath, while the soft corduroy keeps it casual and timeless.",
    images: [
      'https://via.placeholder.com/300x400/d1e8ba/000000',
      'https://via.placeholder.com/300x400/d1e8ba/000000'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Orange', code: '#9333ea' },
      { name: 'Black', code: '#000000' },
      { name: 'Red', code: '#ef4444' },
      { name: 'Yellow', code: '#f59e0b' },
      { name: 'Blue', code: '#6366f1' },
      { name: 'Green', code: '#a3e635' }
    ],
    shipping: 'Free standard shipping and free 60-day returns',
    rating: 4.5,
    reviews: [
      {
        id: '1',
        user: 'Alex Morgan',
        rating: 3,
        comment: 'Great homage to heritage, creativity and innovation hits a particular balance. From rural vibes to industrial aesthetic.',
        date: '10hrs ago'
      },
      {
        id: '2',
        user: 'Alex Morgan',
        rating: 3,
        comment: 'Great homage to heritage, creativity and innovation hits a particular balance. From rural vibes to industrial aesthetic.',
        date: '10hrs ago'
      }
    ]
  };

  // Increment quantity
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  // Select size
  const handleSelectSize = (size) => {
    setSelectedSize(size);
    setSizeModalVisible(false);
  };

  // Select color
  const handleSelectColor = (color) => {
    setSelectedColor(color);
    setColorModalVisible(false);
  };
  
  // Render color dot
  const renderColorDot = (color) => {
    const colorCode = product.colors.find(c => c.name.toLowerCase() === color.toLowerCase())?.code || '#a3e635';
    return (
      <View style={{ backgroundColor: colorCode }} className="w-5 h-5 rounded-full" />
    );
  };

  // Render review stars
  const renderStars = (rating) => {
    return (
      <View className="flex-row">
        {[...Array(3)].map((_, i) => (
          <Text key={i} className="text-purple-600 mr-0.5">★</Text>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View className="flex-row justify-between items-center px-4 py-2">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="heart-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      
      <ScrollView className="flex-1">
        {/* Product Images */}
        <View className="flex-row h-80 mb-4">
          {product.images.map((image, index) => (
            <Image 
              key={index}
              source={{ uri: image }} 
              className="w-1/2 h-full"
              resizeMode="cover"
            />
          ))}
        </View>
        
        {/* Product Info */}
        <View className="px-4">
          <Text className="text-xl font-bold mb-1">{product.name}</Text>
          <Text className="text-lg font-semibold text-purple-600 mb-4">${product.price}</Text>
          
          {/* Size Selector */}
          <TouchableOpacity 
            className="flex-row justify-between items-center py-4 border-t border-gray-200"
            onPress={() => setSizeModalVisible(true)}
          >
            <Text className="text-base">Size</Text>
            <View className="flex-row items-center">
              <Text className="mr-2">{selectedSize}</Text>
              <Ionicons name="chevron-down" size={18} color="#666" />
            </View>
          </TouchableOpacity>
          
          {/* Color Selector */}
          <TouchableOpacity 
            className="flex-row justify-between items-center py-4 border-t border-gray-200"
            onPress={() => setColorModalVisible(true)}
          >
            <Text className="text-base">Color</Text>
            <View className="flex-row items-center">
              {renderColorDot(selectedColor)}
              <Ionicons name="chevron-down" size={18} color="#666" className="ml-2" />
            </View>
          </TouchableOpacity>
          
          {/* Quantity Selector */}
          <View className="flex-row justify-between items-center py-4 border-t border-gray-200">
            <Text className="text-base">Quantity</Text>
            <View className="flex-row items-center">
              <TouchableOpacity 
                className="w-6 h-6 bg-purple-600 rounded-full justify-center items-center"
                onPress={decrementQuantity}
              >
                <Text className="text-white font-bold text-lg" style={{marginTop: -3}}>-</Text>
              </TouchableOpacity>
              <Text className="mx-4">{quantity}</Text>
              <TouchableOpacity 
                className="w-6 h-6 bg-purple-600 rounded-full justify-center items-center"
                onPress={incrementQuantity}
              >
                <Text className="text-white font-bold text-lg" style={{marginTop: -3}}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Description */}
          <Text className="text-gray-600 py-4 border-t border-gray-200">
            {product.description}
          </Text>
          
          {/* Shipping & Returns */}
          <View className="py-4 border-t border-gray-200">
            <Text className="text-base font-semibold mb-2">Shipping & Returns</Text>
            <Text className="text-gray-600 text-sm">{product.shipping}</Text>
          </View>
          
          {/* Reviews */}
          <View className="py-4 border-t border-gray-200">
            <Text className="text-base font-semibold mb-2">Reviews</Text>
            <View className="flex-row items-center mb-4">
              <Text className="text-lg font-bold mr-2">{product.rating}</Text>
              <Text className="text-gray-600">Ratings</Text>
            </View>
            
            {product.reviews.map((review) => (
              <View key={review.id} className="mb-4">
                <View className="flex-row items-center mb-1">
                  <View className="w-8 h-8 bg-gray-200 rounded-full overflow-hidden mr-2">
                    <Image 
                      source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
                      className="w-full h-full"
                    />
                  </View>
                  <Text className="font-medium">{review.user}</Text>
                </View>
                {renderStars(review.rating)}
                <Text className="text-gray-600 text-sm my-1">{review.comment}</Text>
                <Text className="text-gray-400 text-xs">{review.date}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      
      {/* Bottom Action Bar */}
<View className="flex-row justify-between items-center bg-white px-4 py-4 border-t border-gray-200">
  <TouchableOpacity 
    className="w-28 h-12 bg-purple-600 rounded-full justify-center items-center"
  >
    <Text className="text-white font-semibold">${product.price}</Text>
  </TouchableOpacity>
  <TouchableOpacity 
    className="flex-1 h-12 bg-purple-600 rounded-full justify-center items-center ml-4"
    onPress={() => navigation.navigate("CheckoutScreen")}
  >
    <Text className="text-white font-semibold">Add to Bag</Text>
  </TouchableOpacity>
</View>
      
      {/* Size Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={sizeModalVisible}
        onRequestClose={() => setSizeModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-4 h-1/2">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold">Size</Text>
              <TouchableOpacity onPress={() => setSizeModalVisible(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            {product.sizes.map((size) => (
              <TouchableOpacity 
                key={size}
                className={`flex-row justify-between items-center p-4 mb-2 rounded-lg ${selectedSize === size ? 'bg-purple-600' : 'bg-gray-100'}`}
                onPress={() => handleSelectSize(size)}
              >
                <Text className={`text-lg ${selectedSize === size ? 'text-white' : 'text-black'}`}>{size}</Text>
                {selectedSize === size && (
                  <Ionicons name="checkmark" size={24} color="white" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
      
      {/* Color Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={colorModalVisible}
        onRequestClose={() => setColorModalVisible(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-3xl p-4 h-1/2">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-xl font-bold">Color</Text>
              <TouchableOpacity onPress={() => setColorModalVisible(false)}>
                <Ionicons name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>
            
            {product.colors.map((color) => (
              <TouchableOpacity 
                key={color.name}
                className="flex-row justify-between items-center p-4 mb-2 bg-gray-100 rounded-lg"
                onPress={() => handleSelectColor(color.name)}
              >
                <View className="flex-row items-center">
                  <View 
                    style={{ backgroundColor: color.code }} 
                    className="w-6 h-6 rounded-full mr-3"
                  />
                  <Text className="text-lg">{color.name}</Text>
                </View>
                {selectedColor.toLowerCase() === color.name.toLowerCase() && (
                  <Ionicons name="checkmark" size={24} color="#9333ea" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}