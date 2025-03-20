import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createStackNavigator } from '@react-navigation/stack';
import CartScreen from '../screens/app/CartScreen';
import HomeScreen from '../screens/app/HomeScreen';
import OrdersScreen from '../screens/app/OrdersScreen';
import ProfileScreen from '../screens/app/ProfileScreen';
import CategoryScreen from '../screens/app/CategoryScreen';
import ProductDetailsScreen from '../screens/ProductDetailsScreen';
import AllProducts from '../screens/AllProducts';
import CheckoutScreen from '../screens/app/CheckoutScreen';
import SUScreen from '../screens/app/SUScreen';
import CCScreen from '../screens/app/CCScreen';
import SuccessScreen from '../screens/app/SuccessScreen';
import AddressScreen from '../screens/app/AddressScreen';
import AddAddressScreen from '../screens/app/AddAddressScreen';
import PaymentScreen from '../screens/app/PaymentScreen';
import AddCardScreen from '../screens/app/AddCardScreen';
import WishlistScreen from '../screens/app/WishlistScreen';
import FavoritesScreen from '../screens/app/FavoritesScreen';



const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} />,
        }} 
      />
      <Tab.Screen 
        name="Categories" 
        component={CategoryScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="gift-outline" color={color} size={size} />,
        }} 
      />
      <Tab.Screen 
        name="Cart" 
        component={CartScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="cart-outline" color={color} size={size} />,
        }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{
          tabBarIcon: ({ color, size }) => <Ionicons name="person-outline" color={color} size={size} />,
        }} 
      />
    </Tab.Navigator>
  );
}

function MainStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={TabNavigator} />  
      <Stack.Screen name='ProductDetailsScreen' component={ProductDetailsScreen}/>
      <Stack.Screen name='AllProducts' component={AllProducts}/>
      <Stack.Screen name='CheckoutScreen' component={CheckoutScreen}/>
      <Stack.Screen name='SUScreen' component={SUScreen}/>
      <Stack.Screen name='CCScreen' component={CCScreen}/>
      <Stack.Screen name='SuccessScreen' component={SuccessScreen}/>
      <Stack.Screen name='AddressScreen' component={AddressScreen}/>
      <Stack.Screen name='AddAddressScreen' component={AddAddressScreen}/>
      <Stack.Screen name='PaymentScreen' component={PaymentScreen}/>
      <Stack.Screen name='AddCardScreen' component={AddCardScreen}/>
      <Stack.Screen name='WishlistScreen' component={WishlistScreen}/>
      <Stack.Screen name='FavoritesScreen' component={FavoritesScreen}/>

      

      


      
      

      
    </Stack.Navigator>
  );
}

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainStack" component={MainStackNavigator} />
    </Stack.Navigator>
  );
}
