import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './src/screens/SplashScreen'; // Import the Splash screen
import Welcomescreen from './src/screens/Welcomescreen'; // Adjust the path as necessary
import Homescreen from './src/screens/Homescreen'; // Placeholder for the home screen
import LoginScreen from './src/screens/LoginScreen'; // Import the Login screen
import RegisterScreen from './src/screens/RegisterScreen'; // Import the Register screen
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'; // Import the Forgot Password screen
import ApplicationProfile from './src/screens/ApplicationProfile'; //Import the ApplicationForm

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer> {/* Wrap the entire app in NavigationContainer */}
      <Stack.Navigator initialRouteName="Splash">
        {/* Splash Screen */}
        <Stack.Screen 
          name="Splash" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />

        {/* Welcome Screen */}
        <Stack.Screen 
          name="Welcome" 
          component={Welcomescreen} 
          options={{ headerShown: false }} 
        />

        {/* Login Screen */}
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ title: 'Login' }} 
        />

        {/* Home Screen */}
        <Stack.Screen 
          name="Home" 
          component={Homescreen} 
          options={{ title: 'Home' }} 
        />

        {/* Register Screen */}
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ title: 'Register' }} 
        />

        {/*Application Form Screen */}
        <Stack.Screen 
          name="ApplicationProfile" 
          component={ApplicationProfile} 
          options={{title: 'Profile Appplication Form'}} 
        />

        {/* Forgot Password Screen */}
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ title: 'Forgot Password' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
