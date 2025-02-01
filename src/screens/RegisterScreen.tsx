import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import { baseUrl } from '../constant';

const RegisterScreen = ({ navigation }: { navigation: any }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [MobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [relativeStatus, setRelativeStatus] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [step, setStep] = useState(1); // To track the current step (section)
  const [selectedValue, setSelectedValue] = useState('');

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]*$/;

  const handleRegisterStep1 = async () => {
    if (firstName === '' || lastName === '' || MobileNo === '' || email === '' || relativeStatus === '') {
      Alert.alert('Please fill all the fields.');
      return;
    }
    if (!emailRegex.test(email)) {
      Alert.alert('Please enter a valid email address.');
      return;
    }
    if (!phoneRegex.test(MobileNo)) {
      Alert.alert('Phone number can only contain digits.');
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/User/QuickRegistration`, {
        Relativestatus: relativeStatus,
        FirstName: firstName,
        LastName: lastName,
        MobileNo: MobileNo,
        EmailID: email,
      });
      console.log('Response: ', response);

      Alert.alert('Registration successful! OTP has been sent');

      setStep(2); // Move to Email Validation step
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Error', error.response?.data?.message || error.message || 'Failed to register.');
      } else {
        Alert.alert('Error', 'An unknown error occurred.');
      }
    }
  };


  const handleVerifyOTP = async () => {
    try {
      const response = await axios.post(`${baseUrl}/User/ValidateOTP`, {
        EmailID: email,
        OTP: otp,
      });

      console.log('OTP verification response: ', response);
      Alert.alert('OTP verified successfully!');
      setStep(3); // Move to Set Password step
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Error', error.response?.data?.message || error.message || 'OTP verification failed.');
      } else {
        Alert.alert('Error', 'An unknown error occurred.');
      }
    }
  };

  const handleSetPassword = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }
    try {
      const response = await axios.post(`${baseUrl}/User/SetPassword`, {
        EmailID: email,
        MobileNo: MobileNo,
        Password: password,
        confirmPassword: confirmPassword, 
      });

      console.log('Set Password response: ', response);
      Alert.alert('Password set successfully!');
      navigation.navigate('Login'); // Navigate to Login screen
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Error', error.response?.data?.message || error.message || 'Failed to set password.');
      } else {
        Alert.alert('Error', 'An unknown error occurred.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {step === 1 && (
        <View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Relative Status:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Relative Status"
              placeholderTextColor="#aaa"
              value={relativeStatus}
              onChangeText={setRelativeStatus}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>First Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your First Name"
              placeholderTextColor="#aaa"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Last Name:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Last Name"
              placeholderTextColor="#aaa"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Phone Number:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Phone Number"
              placeholderTextColor="#aaa"
              keyboardType="phone-pad"
              value={MobileNo}
              onChangeText={setMobileNo}
              maxLength={10}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Email"
              placeholderTextColor="#aaa"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handleRegisterStep1}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      )}

      {step === 2 && (
        <View style={styles.container}>
        {/* Input Container for OTP */}
        <View style={styles.inputContainer}>
          <Text style={styles.title}>OTP:</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#aaa"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
        </View>
      
        {/* Verify OTP Button */}
        <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
          <Text style={styles.buttonText}>Verify OTP</Text>
        </TouchableOpacity>
      </View>
      
      )}

      {step === 3 && (
        <View>
          <Text style={styles.title}>Set Password</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.inputContainer}>Email: {email}</Text>
            <Text style={styles.inputContainer}>Phone Number: {MobileNo}</Text>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Confirm Password:</Text>
            <TextInput
              style={styles.input}
              placeholder="Re-enter your Password"
              placeholderTextColor="#aaa"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={handleSetPassword}>
            <Text style={styles.buttonText}>Set Password</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 14,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
   
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;
