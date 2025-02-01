import React, { useState, useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
// Define the type for route.params
type HomeScreenRouteParams = {
  isLoggedIn?: boolean;
  userName?: string;
};

const HomeScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<{ params: HomeScreenRouteParams }, 'params'>>(); // Update this part
  const { isLoggedIn, userName } = route.params ?? {};
  const [imageUri, setImageUri] = useState<string | null>(null);

  const handleImageUpload = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      (response) => {
        if (response.assets && response.assets[0].uri) {
          setImageUri(response.assets[0].uri);
        }
      }
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null, // Disable the back button
      gestureEnabled: false,
      headerRight: () =>
        isLoggedIn ? (

    <View style={styles.profileImageWrapper}>
              {imageUri ? (
<Image source={{ uri: imageUri }} style={styles.profileImage} />
              ) : (
<Text style={styles.initial}>{userName?.charAt(0).toUpperCase()}</Text>
              )}
          </View>
        ) : (
<TouchableOpacity onPress={() => navigation.navigate('Login')}>
<Text style={styles.headerButton}>Login</Text>
</TouchableOpacity>
        ),
    });
  }, [navigation, isLoggedIn, imageUri, userName]);

  return (
    <ImageBackground 
      source={require('./asset/background.jpg')} // Path to your background image
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Welcome to Aishwarya Matrimony</Text>
        {isLoggedIn && (
          <TouchableOpacity
            style={styles.detailButton}
            onPress={() => navigation.navigate('ApplicationProfile')}
          >
            <Text style={styles.detailButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', // Ensures the image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: { 
    fontSize: 75, 
    color: 'white', 
    marginBottom: 20,
    position:'absolute',
    top:10,
  },
  headerButton: { 
    color: '#007bff', 
    fontSize: 16, 
    fontWeight: 'bold', 
    marginRight: 10 
  },
  profileImage: {
    position: 'absolute',
    right: 10,
    top: -20,
    width: 40, // Adjust size
    height: 40, // Adjust size
    borderRadius: 50, // Makes the image circular
  },
  detailButton: {
    position: 'absolute', // Absolute positioning
    bottom: 20, // Positioned at the bottom
    right: 20, // Positioned at the right corner
    width: 60, // Button width
    height: 60, // Button height
    borderRadius: 30, // Half of width/height for round shape
    backgroundColor: '#007BFF', // Blue background
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow position
    shadowOpacity: 0.3, // Shadow opacity
    shadowRadius: 5, // Shadow blur radius
    elevation: 5, // Shadow for Android
  },
  detailButtonText: {
    color: '#fff', // Text color
    fontSize: 14, // Font size
    fontWeight: 'bold',
  },
  initial: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  profileImageWrapper: {
    width: 50,
    height: 50,
    borderRadius: 50,
    right: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ccc', // Background color for the first letter if no image
  },
});

export default HomeScreen;
