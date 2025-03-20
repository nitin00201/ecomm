import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  TextInput, 
  FlatList, 
  Modal,
  SafeAreaView,
  ActivityIndicator,
  ScrollView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useProductsData } from '../state/useProductData';

const ProductItem = ({ product, onPress }) => {
  return (
    <View className="w-1/2 p-1 mb-4">
      <TouchableOpacity 
        className="bg-gray-100 rounded-xl overflow-hidden"
        activeOpacity={0.7}
        onPress={() => onPress(product)}
      >
        <View className="h-40 bg-gray-100">
          {product.images && product.images.length > 0 ? (
            <Image
              source={{ uri: product.images[0].url }}
              className="w-full h-full"
              resizeMode="cover"
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <Text className="text-gray-400">No image</Text>
            </View>
          )}
          <TouchableOpacity className="absolute top-2 right-2">
            <Ionicons name="heart-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>
        
        <View className="p-2">
          <Text className="text-xs font-semibold" numberOfLines={1}>{product.name}</Text>
          <Text className="text-xs font-bold">${product.price}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const AllProductsScreen = ({ navigation }) => {
  const { products, loading, error, loadMore, hasMore } = useProductsData();
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(null);
  const [sortBy, setSortBy] = useState('Recommended');
  const [gender, setGender] = useState('Men');
  const [deal, setDeal] = useState('On sale');
  const [filteredProducts, setFilteredProducts] = useState([]);
  
  // Filter options
  const sortByOptions = ['Recommended', 'Newest', 'Lowest - Highest Price', 'Highest - Lowest Price'];
  const genderOptions = ['Men', 'Women', 'Kids'];
  const dealOptions = ['On sale', 'Free Shipping Eligible'];

  useEffect(() => {
    if (products && products.length > 0) {
      // Apply filters
      let filtered = [...products];
      
      // Filter by search text
      if (searchText) {
        filtered = filtered.filter(product => 
          product.name.toLowerCase().includes(searchText.toLowerCase()) ||
          (product.description && product.description.toLowerCase().includes(searchText.toLowerCase()))
        );
      }
      
      // Apply sort
      switch (sortBy) {
        case 'Newest':
          filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
          break;
        case 'Lowest - Highest Price':
          filtered.sort((a, b) => a.price - b.price);
          break;
        case 'Highest - Lowest Price':
          filtered.sort((a, b) => b.price - a.price);
          break;
        default:
          // Default sort (Recommended) can be implemented based on your business logic
          break;
      }
      
      // Apply gender filter (assuming products have a 'category' or 'gender' field)
      if (gender) {
        filtered = filtered.filter(product => 
          product.category?.toLowerCase().includes(gender.toLowerCase()) ||
          product.tags?.some(tag => tag.toLowerCase().includes(gender.toLowerCase()))
        );
      }
      
      // Apply deals filter
      if (deal === 'On sale') {
        filtered = filtered.filter(product => product.onSale || product.discountPrice);
      } else if (deal === 'Free Shipping Eligible') {
        filtered = filtered.filter(product => product.freeShipping);
      }
      
      setFilteredProducts(products);
    }
  }, [products, searchText, sortBy, gender, deal]);

  const openModal = (modalType) => {
    setModalVisible(modalType);
  };
  
  const closeModal = () => {
    setModalVisible(null);
  };

  const handleProductPress = (product) => {
    navigation.navigate('ProductDetailsScreen', { 
      productId: product.id,
      productName: product.name
    });
  };

  const selectOption = (option, type) => {
    switch(type) {
      case 'sort':
        setSortBy(option);
        break;
      case 'gender':
        setGender(option);
        break;
      case 'deals':
        setDeal(option);
        break;
      default:
        break;
    }
    closeModal();
  };

  const renderFilterModal = (title, options, selectedOption, type) => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible === type}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-lg p-4 h-80">
            <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity onPress={closeModal}>
                <Text className="text-gray-500 font-medium">Clear</Text>
              </TouchableOpacity>
              
              <Text className="text-black font-bold text-lg">{title}</Text>
              
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>
            
            <ScrollView className="flex-1">
              {options.map((option) => (
                <TouchableOpacity
                  key={option}
                  className={`p-4 flex-row justify-between items-center rounded-full mb-2 ${selectedOption === option ? 'bg-purple-600' : 'bg-gray-100'}`}
                  onPress={() => selectOption(option, type)}
                >
                  <Text className={`${selectedOption === option ? 'text-white' : 'text-black'} font-medium`}>
                    {option}
                  </Text>
                  {selectedOption === option && (
                    <Ionicons name="checkmark" size={20} color="white" />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            
            <View className="h-1 w-16 bg-gray-300 rounded-full self-center mt-2" />
          </View>
        </View>
      </Modal>
    );
  };

  const renderPriceModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible === 'price'}
        onRequestClose={closeModal}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white rounded-t-lg p-4 h-80">
            <View className="flex-row justify-between items-center mb-6">
              <TouchableOpacity onPress={closeModal}>
                <Text className="text-gray-500 font-medium">Clear</Text>
              </TouchableOpacity>
              
              <Text className="text-black font-bold text-lg">Price</Text>
              
              <TouchableOpacity onPress={closeModal}>
                <Ionicons name="close" size={24} color="gray" />
              </TouchableOpacity>
            </View>
            
            <View className="mb-4">
              <Text className="text-gray-500 mb-2">Min</Text>
              <TextInput 
                className="bg-gray-100 p-3 rounded-full"
                placeholder="$0"
                keyboardType="numeric"
              />
            </View>
            
            <View className="mb-4">
              <Text className="text-gray-500 mb-2">Max</Text>
              <TextInput 
                className="bg-gray-100 p-3 rounded-full"
                placeholder="$999+"
                keyboardType="numeric"
              />
            </View>
            
            <View className="h-1 w-16 bg-gray-300 rounded-full self-center mt-2" />
          </View>
        </View>
      </Modal>
    );
  };

  const renderFooter = () => {
    if (!loading) return null;
    
    return (
      <View className="items-center py-4">
        <ActivityIndicator size="small" color="#6b46c1" />
      </View>
    );
  };

  if (loading && products.length === 0) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" color="#6b46c1" />
        <Text className="mt-2 text-base">Loading products...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 items-center justify-center p-4 bg-red-50">
        <Text className="text-red-700 text-center">Error loading products: {error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 flex-1">
        {/* Search Bar */}
        <View className="flex-row items-center mb-4">
          <TouchableOpacity className="mr-2" onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          
          <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-2">
            <Ionicons name="search" size={20} color="gray" />
            <TextInput
              className="flex-1 ml-2"
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={20} color="gray" />
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {/* Filter Chips */}
        <View className="flex-row mb-4 flex-wrap">
          <View className="bg-purple-100 py-1 px-3 rounded-full mr-2 mb-2">
            <Text className="text-purple-600 text-xs font-medium">1/2</Text>
          </View>
          
          <View className="bg-purple-100 py-1 px-3 rounded-full mr-2 mb-2">
            <Text className="text-purple-600 text-xs font-medium">On Sale</Text>
          </View>
          
          <TouchableOpacity 
            className="bg-purple-600 flex-row items-center py-1 px-3 rounded-full mr-2 mb-2"
            onPress={() => openModal('sort')}
          >
            <Text className="text-white text-xs font-medium mr-1">Sort by</Text>
            <Ionicons name="chevron-down" size={16} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            className="bg-purple-600 py-1 px-3 rounded-full mb-2"
            onPress={() => openModal('gender')}
          >
            <Text className="text-white text-xs font-medium">{gender}</Text>
          </TouchableOpacity>
        </View>
        
        {/* Results count */}
        <Text className="text-xs text-gray-500 mb-2">
          {filteredProducts.length} Results Found
        </Text>
        
        {/* Product Grid */}
        <FlatList
          data={filteredProducts}
          renderItem={({ item }) => <ProductItem product={item} onPress={handleProductPress} />}
          keyExtractor={item => item.id.toString()}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 16 }}
          onEndReached={() => {
            if (hasMore && !loading) loadMore();
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={renderFooter}
          ListEmptyComponent={
            <View className="p-4 items-center justify-center">
              <Text className="text-gray-500">No products found</Text>
            </View>
          }
        />
      </View>
      
      {/* Filter Modals */}
      {renderFilterModal('Sort by', sortByOptions, sortBy, 'sort')}
      {renderFilterModal('Gender', genderOptions, gender, 'gender')}
      {renderFilterModal('Deals', dealOptions, deal, 'deals')}
      {renderPriceModal()}
      
      {/* Filter Tabs */}
      {modalVisible && (
        <View className="absolute bottom-0 left-0 right-0 flex-row justify-evenly bg-white border-t border-gray-200 py-4">
          <TouchableOpacity 
            className={`flex-1 items-center ${modalVisible === 'sort' ? 'border-b-2 border-purple-600' : ''}`}
            onPress={() => openModal('sort')}
          >
            <Text className={modalVisible === 'sort' ? 'text-purple-600' : 'text-gray-500'}>Sort by</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 items-center ${modalVisible === 'gender' ? 'border-b-2 border-purple-600' : ''}`}
            onPress={() => openModal('gender')}
          >
            <Text className={modalVisible === 'gender' ? 'text-purple-600' : 'text-gray-500'}>Gender</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 items-center ${modalVisible === 'deals' ? 'border-b-2 border-purple-600' : ''}`}
            onPress={() => openModal('deals')}
          >
            <Text className={modalVisible === 'deals' ? 'text-purple-600' : 'text-gray-500'}>Deals</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            className={`flex-1 items-center ${modalVisible === 'price' ? 'border-b-2 border-purple-600' : ''}`}
            onPress={() => openModal('price')}
          >
            <Text className={modalVisible === 'price' ? 'text-purple-600' : 'text-gray-500'}>Price</Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default AllProductsScreen;