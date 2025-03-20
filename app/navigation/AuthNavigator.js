import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen';
import SplashScreen from '../screens/SplashScreen';
import ProfileSetupScreen from '../screens/auth/ProfileSetupScreen'
import AddressSetupScreen from '../screens/auth/AddressSetupScreen';
import GoScreen from '../screens/auth/GoScreen';
import ConfirmRegistrationScreen from '../screens/auth/ConfirmRegistrationScreen';
import PasswordResetConfirmationScreen from '../screens/auth/PasswordResetConfirmationScreen';



const Stack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Login">
      <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Login" component={LoginScreen}/>
      <Stack.Screen name="Register" component={RegisterScreen}/>
      <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
      <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen}/>
      <Stack.Screen name="AddressSetup" component={AddressSetupScreen} />
      <Stack.Screen name="ConfirmRegistrationScreen" component={ConfirmRegistrationScreen} />
      <Stack.Screen name="PasswordResetConfirmationScreen" component={PasswordResetConfirmationScreen} />


      <Stack.Screen name="Go" component={GoScreen} />


    </Stack.Navigator>
  );
}