import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';
import useRegistrationStore from '@/app/state/useRegistrationStore';

export default function AddressSetupScreen() {
  const navigation = useNavigation();
  const { address, updateAddress, currentStep, goToStep } = useRegistrationStore();
  
  const [street, setStreet] = useState(address.street || '');
  const [city, setCity] = useState(address.city || '');
  const [state, setState] = useState(address.state || '');
  const [zipCode, setZipCode] = useState(address.zipCode || '');
  const [country, setCountry] = useState(address.country || '');
  const [phone, setPhone] = useState(address.phone || '');
  const [addressLabel, setAddressLabel] = useState(address.label || '');

  useEffect(() => {
    setStreet(address.street || '');
    setCity(address.city || '');
    setState(address.state || '');
    setZipCode(address.zipCode || '');
    setCountry(address.country || '');
    setPhone(address.phone || '');
    setAddressLabel(address.label || '');
  }, [address]);

  const stateOptions = [
    { label: 'California', value: 'CA' },
    { label: 'New York', value: 'NY' },
    { label: 'Texas', value: 'TX' },
    { label: 'Florida', value: 'FL' },
  ];

  const countryOptions = [
    { label: 'United States', value: 'US' },
    { label: 'Canada', value: 'CA' },
    { label: 'United Kingdom', value: 'GB' },
  ];

  const labelOptions = [
    { label: 'Home', value: 'Home' },
    { label: 'Work', value: 'Work' },
    { label: 'Other', value: 'Other' },
  ];

  const isFormValid = () => {
    return street && city && state && zipCode && country && phone;
  };

  const handleNext = () => {
    if (isFormValid()) {
      updateAddress({
        street,
        city,
        state,
        zipCode,
        country,
        phone,
        label: addressLabel
      });
      
      navigation.navigate('ConfirmRegistrationScreen');
    }
  };

  const handleBack = () => {
    goToStep(2); 
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Address Setup</Text>
        {/* <Text style={styles.stepIndicator}>Step 3 of 4</Text> */}

        {/* Street Address */}
        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={street}
          onChangeText={setStreet}
          keyboardType='ascii-capable'
        />

        {/* City */}
        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
          keyboardType='ascii-capable'

        />

        {/* State Dropdown */}
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={setState}
            items={stateOptions}
            style={pickerSelectStyles}
            value={state}
            placeholder={{ label: 'Select State', value: null }}
          />
        </View>

        {/* Zipcode */}
        <TextInput
          style={styles.input}
          placeholder="Zip Code"
          value={zipCode}
          onChangeText={setZipCode}
          keyboardType="number-pad"
        />

        {/* Country Dropdown */}
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={setCountry}
            items={countryOptions}
            style={pickerSelectStyles}
            value={country}
            placeholder={{ label: 'Select Country', value: null }}
          />
        </View>

        {/* Phone */}
        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />

        {/* Address Label Dropdown (Optional) */}
        <View style={styles.pickerContainer}>
          <RNPickerSelect
            onValueChange={setAddressLabel}
            items={labelOptions}
            style={pickerSelectStyles}
            value={addressLabel}
            placeholder={{ label: 'Address Label (Optional)', value: null }}
          />
        </View>

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.nextButton, !isFormValid() && styles.buttonDisabled]} 
            onPress={handleNext}
            disabled={!isFormValid()}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 40,
    backgroundColor: '#F8E9C1',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  stepIndicator: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
  },
  backButton: {
    width: '48%',
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  backButtonText: {
    color: '#333',
    fontSize: 18,
    fontWeight: 'bold',
  },
  nextButton: {
    width: '48%',
    height: 50,
    backgroundColor: '#FF7043',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonDisabled: {
    backgroundColor: '#ffb09e',
  },
});

// Styling for the picker dropdown
const pickerSelectStyles = {
  inputAndroid: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  inputIOS: {
    height: 50,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
};