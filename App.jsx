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

import AppNavigator from './navigators/appNavigator';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import Toast from 'react-native-toast-message';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
GoogleSignin.configure({
  webClientId:
    '412369366800-hlu24ris7tpg9i84e8v36cqbmvuatgr3.apps.googleusercontent.com',
});

function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
      <Toast position="top" topOffset={20} />
    </Provider>
  );
}

export default App;
