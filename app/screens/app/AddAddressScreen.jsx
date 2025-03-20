import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { isEditing, addressData, onSave } = route.params || {};

  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isEditing && addressData) {
      // Parse the full address into components
      const parts = addressData.address.split(', ');
      setFormData({
        street: parts[0] || '',
        city: parts[1] || '',
        state: parts[2] || '',
        zip: parts[3] || '',
      });
    }
  }, [isEditing, addressData]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.street.trim()) newErrors.street = 'Street address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.zip.trim()) newErrors.zip = 'ZIP code is required';
    else if (!/^\d{5}(-\d{4})?$/.test(formData.zip)) newErrors.zip = 'Invalid ZIP code';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      const fullAddress = `${formData.street}, ${formData.city}, ${formData.state}, ${formData.zip}`;
      
      if (onSave) {
        onSave({ address: fullAddress });
      }
      
      navigation.goBack();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 flex-1">
        <View className="flex-row items-center mb-6">
          <TouchableOpacity onPress={() => navigation.goBack()} className="mr-4">
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text className="text-xl font-semibold">
            {isEditing ? 'Edit Address' : 'Add Address'}
          </Text>
        </View>
        
        <View className="mb-4">
          <TextInput
            className={`bg-gray-100 p-4 rounded-lg mb-1 ${errors.street ? 'border border-red-500' : ''}`}
            placeholder="Street Address"
            value={formData.street}
            onChangeText={(text) => setFormData({ ...formData, street: text })}
          />
          {errors.street && <Text className="text-red-500 text-sm">{errors.street}</Text>}
        </View>
        
        <View className="mb-4">
          <TextInput
            className={`bg-gray-100 p-4 rounded-lg mb-1 ${errors.city ? 'border border-red-500' : ''}`}
            placeholder="City"
            value={formData.city}
            onChangeText={(text) => setFormData({ ...formData, city: text })}
          />
          {errors.city && <Text className="text-red-500 text-sm">{errors.city}</Text>}
        </View>
        
        <View className="flex-row mb-4">
          <View className="flex-1 mr-2">
            <TextInput
              className={`bg-gray-100 p-4 rounded-lg mb-1 ${errors.state ? 'border border-red-500' : ''}`}
              placeholder="State"
              value={formData.state}
              onChangeText={(text) => setFormData({ ...formData, state: text })}
            />
            {errors.state && <Text className="text-red-500 text-sm">{errors.state}</Text>}
          </View>
          
          <View className="flex-1 ml-2">
            <TextInput
              className={`bg-gray-100 p-4 rounded-lg mb-1 ${errors.zip ? 'border border-red-500' : ''}`}
              placeholder="Zip Code"
              value={formData.zip}
              onChangeText={(text) => setFormData({ ...formData, zip: text })}
              keyboardType="numeric"
              maxLength={10}
            />
            {errors.zip && <Text className="text-red-500 text-sm">{errors.zip}</Text>}
          </View>
        </View>
        
        <View className="flex-1" />
        
        <TouchableOpacity
          onPress={handleSave}
          className="bg-purple-600 py-4 rounded-lg mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddAddressScreen;