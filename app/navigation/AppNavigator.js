import React from "react";
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator'
import useAuthStore from "../state/useAuthStore";
import { ActivityIndicator } from "react-native";



export default function AppNavigator() {
  const { isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return <ActivityIndicator />;
  }
  
  return isAuthenticated ? <MainNavigator /> : <AuthNavigator />;
}