import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  Alert,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AppNavigator from './navigators/appNavigator';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      // Save the confirmation object in your state and use it to verify the OTP
      console.log(confirmation, 'user logged in sucess');
      // Navigate to the OTP verification screen and pass the confirmation object
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to send verification code.');
    }
  };

  return <AppNavigator />;
}

export default App;
