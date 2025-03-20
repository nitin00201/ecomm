import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import AppNavigator from './navigation/AppNavigator';
import useAuthStore from './state/useAuthStore';
import '../global.css';

export default function App() {
  const { initialize, isAuthenticated, isLoading } = useAuthStore();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <AppNavigator />;
}
