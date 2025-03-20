import { create } from 'zustand';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define your API base URL
const API_BASE_URL = 'http://192.168.118.38:3000'; // Replace with your server's IP

const useAuthStore = create((set, get) => ({
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  initialize: async () => {
    try {
      const accessToken = await AsyncStorage.getItem('accessToken');
      const refreshToken = await AsyncStorage.getItem('refreshToken');
      
      if (accessToken && refreshToken) {
        set({ 
          accessToken, 
          refreshToken, 
          isAuthenticated: true 
        });
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error initializing auth store:', error);
      return false;
    }
  },

  setTokens: async (accessToken, refreshToken) => {
    try {
      await AsyncStorage.setItem('accessToken', accessToken);
      await AsyncStorage.setItem('refreshToken', refreshToken);
      set({ accessToken, refreshToken, isAuthenticated: true, error: null });
      return true;
    } catch (error) {
      console.error('Error storing tokens:', error);
      set({ error: 'Failed to store authentication tokens' });
      return false;
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'password');
      params.append('username', email );
      params.append('password', password);

      console.log(`Sending login request to ${API_BASE_URL}/spree_oauth/token`);

      const response = await axios({
        method: 'post',
        url: `${API_BASE_URL}/spree_oauth/token`,
        data: params.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        },
        timeout: 10000
      });

      if (response && response.data) {
        const { access_token, refresh_token } = response.data;
        
        // Use the setTokens method to save tokens
        const success = await get().setTokens(access_token, refresh_token);
        
        set({ isLoading: false });
        return success;
      } else {
        set({ 
          isLoading: false,
          error: 'Invalid response from server' 
        });
        return false;
      }
    } catch (error) {
      let errorMessage = 'Authentication failed';
      
      if (error.response) {
        errorMessage = error.response.data?.error_description || 
                      `Server error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection.';
      }
      
      console.error('Login error:', error);
      set({ 
        isLoading: false, 
        error: errorMessage 
      });
      return false;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('refreshToken');
      set({ 
        accessToken: null, 
        refreshToken: null, 
        isAuthenticated: false 
      });
      return true;
    } catch (error) {
      console.error('Error during logout:', error);
      return false;
    }
  },

  // Method to refresh token
  refreshAuthToken: async () => {
    const currentRefreshToken = get().refreshToken;
    
    if (!currentRefreshToken) {
      console.error('No refresh token available');
      return null;
    }
    
    try {
      const params = new URLSearchParams();
      params.append('grant_type', 'refresh_token');
      params.append('refresh_token', currentRefreshToken);
      
      const response = await axios({
        method: 'post',
        url: `${API_BASE_URL}/spree_oauth/token`,
        data: params.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Accept': 'application/json',
        }
      });

      if (response && response.data) {
        const { access_token, refresh_token } = response.data;
        
        // Update both tokens if the server provided a new refresh token
        if (refresh_token) {
          await get().setTokens(access_token, refresh_token);
        } else {
          // Only update the access token
          set({ accessToken: access_token });
          await AsyncStorage.setItem('accessToken', access_token);
        }
        
        return access_token;
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      
      // If refresh token is invalid, logout the user
      if (error.response && error.response.status === 401) {
        get().logout();
      }
      
      return null;
    }
  },

  // Clear any error messages
  clearError: () => set({ error: null })
}));

export default useAuthStore;