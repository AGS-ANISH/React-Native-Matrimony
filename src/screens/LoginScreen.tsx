import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { setGlobalToken } from '../api/global';
import { baseUrl } from '../constant';

interface LoginScreenProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [userName, setUserName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userNameError, setUserNameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const isValidUserName = (userName: string) => /^[a-zA-Z0-9._-]{3,20}$/.test(userName);
  const isValidPassword = (password: string) => password.length >= 6;

  const handleLogin = async () => {
    const trimmedUserName = userName.trim();
    const trimmedPassword = password.trim();

    setUserNameError(trimmedUserName === '');
    setPasswordError(trimmedPassword === '');

    if (!trimmedUserName || !trimmedPassword) {
      Alert.alert('Error', 'Both Username and Password are required.');
      return;
    }

    if (!isValidUserName(trimmedUserName)) {
      Alert.alert('Error', 'Username must be 3-20 characters long and can only contain letters, numbers, dots, underscores, or hyphens.');
      return;
    }
    if (!isValidPassword(trimmedPassword)) {
      Alert.alert('Error', 'Password must be at least 6 characters long.');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}/Auth/Login`, {
        userName: trimmedUserName,
        password: trimmedPassword,
      });

      console.log('Response:', response);

      if (response.data.success) {
        const token = response.data.token || response.data.accessToken || response.data.data?.token;

        if (token) {
          setGlobalToken(token);
          console.log('Token:', token);
          navigation.navigate('Home', { isLoggedIn: true, userName: trimmedUserName });
        } else {
          Alert.alert('Error', 'Token is missing in the response.');
        }
      } else {
        Alert.alert('Error', response.data.message || 'Invalid credentials. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Username Input */}
      <TextInput
        style={[styles.input, userNameError && styles.inputError]}
        placeholder="Username"
        placeholderTextColor="#aaa"
        value={userName}
        onChangeText={(text) => {
          setUserName(text);
          setUserNameError(false); // Reset error on change
        }}
        autoCapitalize="none"
      />
      {userNameError && <Text style={styles.errorText}>Username is required</Text>}

      {/* Password Input */}
      <TextInput
        style={[styles.input, passwordError && styles.inputError]}
        placeholder="Password"
        placeholderTextColor="#aaa"
        secureTextEntry
        value={password}
        onChangeText={(text) => {
          setPassword(text);
          setPasswordError(false); // Reset error on change
        }}
      />
      {passwordError && <Text style={styles.errorText}>Password is required</Text>}

      {/* Forgot Password Link */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Register Section */}
      <View style={styles.registerContainer}>
        <Text style={styles.registerText}>New User?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerLink}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
  forgotPassword: {
    color: '#007BFF',
    marginBottom: 20,
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  registerContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  registerText: {
    fontSize: 16,
  },
  registerLink: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
