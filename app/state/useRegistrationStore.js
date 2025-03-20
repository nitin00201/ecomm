import { create } from 'zustand';
import axios from 'axios';

// Define your API base URL
const API_BASE_URL = 'http://192.168.118.38:3000'; // Replace with your server's IP

const useRegistrationStore = create((set, get) => ({
  // Step 1: Email and Password
  email: '',
  password: '',
  passwordConfirmation: '',
  
  // Step 2: Name
  firstName: '',
  lastName: '',
  
  // Step 3: Address
  address: {
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: '',
  },
  
  // Status
  currentStep: 1,
  isLoading: false,
  error: null,
  isRegistered: false,
  
  // Methods for updating fields
  updateEmailPassword: (email, password, passwordConfirmation) => {
    set({ 
      email, 
      password, 
      passwordConfirmation,
      currentStep: 2,
      error: null
    });
  },
  
  updateName: (firstName, lastName) => {
    set({ 
      firstName, 
      lastName,
      currentStep: 3,
      error: null
    });
  },
  
  updateAddress: (address) => {
    set({ 
      address,
      currentStep: 4,
      error: null
    });
  },
  
  // Navigate between steps
  goToStep: (step) => {
    set({ currentStep: step });
  },
  
  // Reset form
  resetForm: () => {
    set({
      email: '',
      password: '',
      passwordConfirmation: '',
      firstName: '',
      lastName: '',
      address: {
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        phone: '',
      },
      currentStep: 1,
      error: null,
      isRegistered: false,
    });
  },
  
  // Submit registration
  submitRegistration: async () => {
    set({ isLoading: true, error: null });
    
    try {
      const { email, password, passwordConfirmation, firstName, lastName, address } = get();
      
      // Prepare the data according to your API requirements
      const userData = {
        user: {
          email,
          first_name: firstName,
          last_name: lastName,
          password,
          password_confirmation: passwordConfirmation,
          selected_locale: 'en',
          public_metadata: {
            // user_segment: 'customer'
          },
          private_metadata: {
            has_abandoned_cart: false
          }
        }
      };
      
      // If you need to add the address, you could structure it like this:
      // This part depends on your API structure
      if (address.street) {
        userData.user.addresses = [{
          address1: address.street,
          city: address.city,
          state_name: address.state,
          zipcode: address.zipCode,
          country_iso: address.country,
          phone: address.phone,
        }];
      }
      
      console.log('Submitting registration:', JSON.stringify(userData));
      
      const response = await axios({
        method: 'POST',
        url: `${API_BASE_URL}/api/v2/storefront/account`,
        data: userData,
        headers: {
          'Content-Type': 'application/vnd.api+json',
          'Accept': 'application/json',
        }
      });
      
      console.log('Registration successful:', response.data);
      
      set({ 
        isLoading: false,
        isRegistered: true,
        error: null
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Registration error:', error);
      
      let errorMessage = 'Registration failed';
      if (error.response && error.response.data) {
        errorMessage = error.response.data.error || 
                       error.response.data.message || 
                       `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      set({ 
        isLoading: false,
        error: errorMessage
      });
      
      return { success: false, error: errorMessage };
    }
  },
  
  // Clear error
  clearError: () => set({ error: null })
}));

export default useRegistrationStore;