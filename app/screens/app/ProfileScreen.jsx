import React from 'react';
import { 
  ScrollView, 
  TouchableOpacity, 
  SafeAreaView, 
  Text, 
  Image, 
  View,
  StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useAuthStore from '@/app/state/useAuthStore';

export default function ProfileScreen({ navigation }) {
  const { logout } = useAuthStore();
  // User data
  const user = {
    name: 'Gilbert Jones',
    email: 'Gilbertjones001@gmail.com',
    phone: '121-224-7890',
    image: require('../../assets/profile1.png')
  };

  // Profile menu items
  const menuItems = [
    { id: 'address', title: 'Address', icon: 'location-outline',path:'AddressScreen' },
    { id: 'wishlist', title: 'Wishlist', icon: 'heart-outline',path:'WishlistScreen' },
    { id: 'payment', title: 'Payment', icon: 'card-outline',path:'PaymentScreen' },
    { id: 'help', title: 'Help', icon: 'help-circle-outline',path:'AddressScreen' },
    { id: 'support', title: 'Support', icon: 'headset-outline' ,path:'AddressScreen'},
  ];
  
  // Handle menu item press
  const handleMenuPress = (id) => {
    console.log(`Navigate to ${id}`);
    // navigation.navigate(id);
  };
  
  // Handle sign out
  const handleSignOut = async() => {
    console.log('Sign out pressed');
    await logout();
    // Implement sign out logic
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      
      <ScrollView className="flex-1">
        {/* Profile Image */}
        <View className="items-center justify-center my-6">
          <View className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden">
            <Image
              source={user.image }
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
        </View>
        
        {/* User Info Card */}
        <View className="mx-4 bg-gray-100 rounded-xl p-4 mb-4">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-lg font-bold">{user.name}</Text>
            <TouchableOpacity>
              <Text className="text-purple-600 font-medium">Edit</Text>
            </TouchableOpacity>
          </View>
          <Text className="text-gray-500 mb-1">{user.email}</Text>
          <Text className="text-gray-500">{user.phone}</Text>
        </View>
        
        {/* Menu Items */}
        {menuItems.map((item) => (
          <TouchableOpacity 
            key={item.id}
            className="mx-4 bg-gray-100 rounded-xl p-4 mb-4 flex-row justify-between items-center"
            onPress={() => navigation.navigate(item.path)}
          >
           <View className='flex flex-row items-center '>
           <Ionicons name={item.icon} size={20} color="purple" className='mr-2'/>

            <Text className="text-base font-medium">{item.title}</Text>
           </View>
            <Ionicons name="chevron-forward" size={20} color="purple" />
          </TouchableOpacity>
        ))}
        
        {/* Sign Out Button */}
        <TouchableOpacity 
          className="mx-4 my-4 items-center"
          onPress={handleSignOut}
        >
          <Text className="text-red-500 text-base font-medium">Sign Out</Text>
        </TouchableOpacity>
      </ScrollView>
      
     
    </SafeAreaView>
  );
}