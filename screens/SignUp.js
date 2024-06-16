import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
// Replace with actual path to your icon
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import colors from '../theme/colors';
import {useDispatch} from 'react-redux';
import {registerUser} from '../redux/slices/user';
import Toast from 'react-native-toast-message';
import onGoogleButtonPress from '../lib/google';
const {width: screenWidth} = Dimensions.get('window');
const SignUp = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const handleSubmit = () => {
    try {
      if (name !== '' && email !== '' && password !== '') {
        const userData = {
          name,
        };

        // Dispatch the registerUser action with the email, password, and userData
        dispatch(registerUser({email, password, userData}));
      } else {
        Toast.show({
          type: 'error',
          position: 'bottom',
          text1: 'All fields are required.',
        });
      }
    } catch (error) {
      console.error(error);
    }

    // Create a userData object with additional information if needed
  };
  
  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{backgroundColor: colors.bg}}>
      <View className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-4 left-4 z-10 bg-yellow-400 p-2 rounded-bl-2xl">
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        keyboardShouldPersistTaps="handled">
        <View className="flex-row justify-center -mb-8">
          <Image
            source={require('../assets/images/signin.jpeg')}
            style={{width: screenWidth, height: 300}}
          />
        </View>

        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{borderTopLeftRadius: 50, borderTopRightRadius: 50}}>
          <View className="form space-y-2">
            <Text className="text-gray-700 ml-4">Name</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Name"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#4B5563"
            />
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Email"
              value={email}
              placeholderTextColor="#4B5563"
              onChangeText={setEmail}
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-5"
              secureTextEntry={true}
              placeholder="Enter Password"
              placeholderTextColor="#4B5563"
              value={password}
              onChangeText={setPassword}
            />

            <TouchableOpacity
              className="py-3 bg-yellow-400 rounded-xl"
              onPress={handleSubmit}>
              <Text className="font-xl font-bold text-center text-gray-700">
                Register
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          <View className="flex-row justify-center space-x-12 ">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl" onPress={() => onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}>
              <FontAwesome name="google" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Icon name="facebook" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7 pb-10">
            <Text className="text-gray-500 font-semibold">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
              <Text className="font-semibold text-yellow-500"> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
