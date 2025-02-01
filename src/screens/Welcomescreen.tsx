import React from 'react';
import { View, Text, StyleSheet,TouchableOpacity } from 'react-native';

interface WelcomescreenProps {
  navigation: any; // Use a proper type for navigation if using TypeScript with react-navigation
}

const Welcomescreen: React.FC<WelcomescreenProps> = ({ navigation }) => {

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Shri Mahayoga Shakti Peeta Trust</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Why wait? Let's find a perfect match</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00796b', // Button background color
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff', // Font color
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 22,
    color: '#00796b',
    marginBottom: 20,
  },
});

export default Welcomescreen;
