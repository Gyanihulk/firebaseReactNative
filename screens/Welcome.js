import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import colors from '../theme/colors';

const Welcome = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      className="flex-1"
      style={{backgroundColor: colors.background}}>
      <View className="flex-1 flex justify-around my-4">
        <Text className="text-white font-bold text-4xl text-center">
          Let's Get Started!
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image
          source={require('../assets/images/welcome.png')}
          style={{width: 350, height: 350}}
        />
      </View>
      <View className="space-y-4 ">
        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
          className="py-3 bg-yellow-400 mx-7 rounded-xl">
          <Text className="text-xl font-bold text-center text-gray-700">
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-center mb-12">
        <Text className="text-white font-semibold">
          Already have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signin')}>
          <Text className="font-semibold text-yellow-400"> Log In</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;
