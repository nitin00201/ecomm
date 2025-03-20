import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  StatusBar, 
  Dimensions 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GestureHandlerRootView, GestureDetector, Gesture, GestureHandler } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const navigation = useNavigation();

  // Swipe Gesture Detection
  const swipeGesture = Gesture.Pan().onEnd((event) => {
    if (event.translationX > 100) {
      // If the user swipes right, navigate to the login page
      navigation.replace('Login');  // Navigate to the Login screen
    console.log("HI");
    
    }
  });

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar backgroundColor="#F8E9C1" barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <GestureDetector gesture={swipeGesture}>
          <View style={styles.contentContainer}>
            <View style={styles.logoContainer}>
              <Image
                // source={require('../assets/logo.png')} // Replace with your actual logo path
                style={styles.logo}
                resizeMode="contain"
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.title}>Welcome!</Text>
              <Text style={styles.subtitle}>
                Discover amazing products and shop with ease
              </Text>
            </View>

            <View style={styles.illustrationContainer}>
              <Image
                // source={require('../assets/shopping-illustration.png')} // Replace with your illustration
                style={styles.illustration}
                resizeMode="contain"
              />
            </View>
          </View>
        </GestureDetector>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8E9C1', // Ghee color
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  logo: {
    width: 120,
    height: 120,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 24,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: height * 0.04,
    height: height * 0.3,
  },
  illustration: {
    width: width * 0.8,
    height: height * 0.3,
  },
  button: {
    backgroundColor: '#FF8C00', // Orange button
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  skipText: {
    color: '#666666',
    fontSize: 14,
    textAlign: 'center',
  }
});
