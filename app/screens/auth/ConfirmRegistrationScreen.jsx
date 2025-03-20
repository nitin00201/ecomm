import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import useRegistrationStore from '../../state/useRegistrationStore';

export default function ConfirmRegistrationScreen() {
  const navigation = useNavigation();
  const { 
    email, 
    firstName, 
    lastName, 
    address, 
    submitRegistration, 
    isLoading, 
    error, 
    isRegistered,
    clearError
  } = useRegistrationStore();
  
  // Clear any existing errors when the screen mounts
  useEffect(() => {
    clearError();
  }, []);

  // Watch for successful registration
  useEffect(() => {
    if (isRegistered) {
      // Navigate to success screen
      navigation.navigate('Go');
    }
  }, [isRegistered, navigation]);

  // Watch for errors
  useEffect(() => {
    if (error) {
      Alert.alert('Registration Error', error, [{ text: 'OK', onPress: clearError }]);
    }
  }, [error, clearError]);

  const handleSubmit = async () => {
    const result = await submitRegistration();
    if (!result.success) {
      // Error handling is already done in the store and via useEffect
      console.log('Registration failed');
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Text style={styles.title}>Confirm Your Details</Text>
        <Text style={styles.stepIndicator}>Step 4 of 4</Text>

        <View style={styles.detailsContainer}>
          <Text style={styles.sectionTitle}>Account Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Email:</Text>
            <Text style={styles.detailValue}>{email}</Text>
          </View>

          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Name:</Text>
            <Text style={styles.detailValue}>{firstName} {lastName}</Text>
          </View>

          <Text style={styles.sectionTitle}>Address</Text>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Street:</Text>
            <Text style={styles.detailValue}>{address.street}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>City:</Text>
            <Text style={styles.detailValue}>{address.city}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>State:</Text>
            <Text style={styles.detailValue}>{address.state}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Zip Code:</Text>
            <Text style={styles.detailValue}>{address.zipCode}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Country:</Text>
            <Text style={styles.detailValue}>{address.country}</Text>
          </View>
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Phone:</Text>
            <Text style={styles.detailValue}>{address.phone}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.backButton} onPress={handleBack} disabled={isLoading}>
            <Text style={styles.backButtonText}>Back</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.submitButton} 
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.submitButtonText}>Complete Registration</Text>
            )}
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
  detailsContainer: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#FF7043',
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    width: '30%',
  },
  detailValue: {
    fontSize: 16,
    color: '#666',
    width: '70%',
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
  submitButton: {
    width: '48%',
    height: 50,
    backgroundColor: '#FF7043',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});