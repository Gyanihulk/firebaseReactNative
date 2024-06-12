import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Button, TextInput, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';

function App() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const signInWithPhoneNumber = async () => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      // Save the confirmation object in your state and use it to verify the OTP
      console.log(confirmation,"user logged in sucess");
      // Navigate to the OTP verification screen and pass the confirmation object
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Unable to send verification code.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter phone number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        textContentType="telephoneNumber"
      />
      <Button
        title="Sign In with Phone Number"
        onPress={signInWithPhoneNumber}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
});

export default App;
