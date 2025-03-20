import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([
    { id: '1', address: '2716 Ash Dr, San Jose, South Carolina, 29201' },
    { id: '2', address: '2716 Ash Dr, San Jose, South Dakota, 57701' },
  ]);

  const handleEdit = (id) => {
    const addressToEdit = addresses.find(addr => addr.id === id);
    navigation.navigate('AddAddress', { 
      isEditing: true, 
      addressData: addressToEdit,
      onSave: (updatedAddress) => {
        setAddresses(addresses.map(addr => 
          addr.id === id ? { ...addr, ...updatedAddress } : addr
        ));
      }
    });
  };

  const handleAddAddress = () => {
    navigation.navigate('AddAddress', {
      onSave: (newAddress) => {
        setAddresses([...addresses, { id: Date.now().toString(), ...newAddress }]);
      }
    });
  };

  const renderItem = ({ item }) => (
    <View className="flex-row justify-between items-center bg-gray-100 p-4 rounded-lg mb-2">
      <Text className="flex-1 text-gray-800">{item.address}</Text>
      <TouchableOpacity onPress={() => handleEdit(item.id)}>
        <Text className="text-purple-600 font-medium">Edit</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 flex-1">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">Address</Text>
        </View>
        
        <FlatList
          data={addresses}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerClassName="pb-4"
        />
        
        <TouchableOpacity 
          onPress={()=>{navigation.navigate('AddAddressScreen')}} 
          className="bg-purple-600 rounded-full p-4 absolute bottom-8 right-8"
        >
          <Ionicons name="add" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddressScreen;