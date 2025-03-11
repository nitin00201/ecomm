import React from "react";
import MainNavigator from './MainNavigator';
import AuthNavigator from './AuthNavigator'



export default function AppNavigator() {
const user = true;
  


  return user ? <MainNavigator /> : <AuthNavigator />;
}