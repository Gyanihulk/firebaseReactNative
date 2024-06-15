import React from 'react';
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
const {width: screenWidth} = Dimensions.get('window');
const SignIn = () => {
  const navigation = useNavigation();

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
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              placeholder="Enter Email"
            />
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl"
              secureTextEntry={true}
              placeholder="Enter Password"
            />
            <TouchableOpacity className="flex items-end mb-5">
              <Text className="text-gray-700">Forgot Password?</Text>
            </TouchableOpacity>
            <TouchableOpacity className="py-3 bg-yellow-400 rounded-xl">
              <Text className="font-xl font-bold text-center text-gray-700">
                Login
              </Text>
            </TouchableOpacity>
          </View>
          <Text className="text-xl text-gray-700 font-bold text-center py-5">
            Or
          </Text>
          <View className="flex-row justify-center space-x-12 ">
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <FontAwesome name="google" size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 bg-gray-100 rounded-2xl">
              <Icon name="facebook" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-center mt-7 pb-10">
            <Text className="text-gray-500 font-semibold">
              Don't have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text className="font-semibold text-yellow-500"> Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
