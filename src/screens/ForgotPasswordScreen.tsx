import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { baseUrl } from '../constant';

const ForgotPassword = ({ navigation }: { navigation: any }) => {
  const [isEmail, setIsEmail] = useState(true);
  const [email, setEmail] = useState('');
  const [MobileNo, setMobileNo] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOtp, setShowOtp] = useState(false);
  const [showPasswordFields, setShowPasswordFields] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^[0-9]{10}$/; // Only 10 digit phone number allowed

  const sendOtp = async () => {
    try {
      if (isEmail) {
        if (email === '') {
          Alert.alert('Please enter your email address.');
          return;
        }
        if (!emailRegex.test(email)) {
          Alert.alert('Please enter a valid email address.');
          return;
        }
        await axios.post(`${baseUrl}/User/ValidateEmailOrMobile`, { EmailID: email });
        Alert.alert('OTP sent to your email!');
        setShowOtp(true);
      } else {
        if (MobileNo === '') {
          Alert.alert('Please enter your phone number.');
          return;
        }
        if (!phoneRegex.test(MobileNo)) {
          Alert.alert('Phone number should contain exactly 10 digits.');
          return;
        }
        await axios.post(`${baseUrl}/User/ValidateEmailOrMobile`, { MobileNo: MobileNo });
        Alert.alert('OTP sent to your phone!');
        setShowOtp(true);
      }
    } catch (error) {
      handleError(error);
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post(`${baseUrl}/User/ValidateOTP`, { EmailID: email || MobileNo, OTP: otp });
      Alert.alert('OTP verified!');
      setShowPasswordFields(true);
    } catch (error) {
      handleError(error);
    }
  };

  const submit = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match.');
      return;
    }
    try {
      await axios.post(`${baseUrl}/User/SetPassword`, {
        EmailID: email || MobileNo,
        MobileNo: MobileNo,
        Password: newPassword,
        ConfirmPassword: confirmPassword,
      });

      Alert.alert('Password reset successful!');
      navigation.navigate('Login');
    } catch (error) {
      handleError(error);
    }
  };

  const handleError = (error: any) => {
    if (axios.isAxiosError(error)) {
      Alert.alert('Error', error.response?.data?.message || error.message || 'An error occurred.');
    } else {
      Alert.alert('Error', 'An unknown error occurred.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <View style={styles.toggleContainer}>
        <TouchableOpacity onPress={() => setIsEmail(true)} style={[styles.toggleButton, isEmail ? styles.activeToggle : {}]}>
          <Text style={styles.toggleText}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsEmail(false)} style={[styles.toggleButton, !isEmail ? styles.activeToggle : {}]}>
          <Text style={styles.toggleText}>Phone</Text>
        </TouchableOpacity>
      </View>

      {isEmail ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Enter your Email Address"
            placeholderTextColor="#aaa"
          />
          <Button title="Send OTP" onPress={sendOtp} />
        </View>
      ) : (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Phone Number:</Text>
          <TextInput
            style={styles.input}
            value={MobileNo}
            onChangeText={setMobileNo}
            placeholder="Enter your Phone Number"
            placeholderTextColor="#aaa"
            keyboardType="phone-pad"
            maxLength={10}
          />
          <Button title="Send OTP" onPress={sendOtp} />
        </View>
      )}

      {showOtp && (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>OTP:</Text>
          <TextInput
            style={styles.input}
            value={otp}
            onChangeText={setOtp}
            placeholder="Enter OTP"
          />
          <Button title="Verify OTP" onPress={verifyOtp} />
        </View>
      )}

      {showPasswordFields && (
        <>
          <View style={styles.inputContainer}>
            <Text>New Password</Text>
            <TextInput
              style={styles.input}
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Enter New Password"
              secureTextEntry
            />
          </View>
          <View style={styles.inputContainer}>
            <Text>Confirm Password</Text>
            <TextInput
              style={styles.input}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm New Password"
              secureTextEntry
            />
          </View>
          <Button title="Submit" onPress={submit} />
        </>
      )}

      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Back to Login</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: '#f4f7f6',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    
  },
  toggleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  activeToggle: {
    backgroundColor: 'lightgrey',
  },
  toggleText: {
    fontSize: 14,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    borderColor: '#ccc',
  },
  link: {
    position: 'relative',
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 15,
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ForgotPassword;
