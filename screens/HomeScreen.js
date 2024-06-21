import React, { useState } from 'react';
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
import Header from '../components/Header';
const {width: screenWidth} = Dimensions.get('window');
const HomeScreen = () => {
  const navigation = useNavigation();
  const [searchValue, setSearchValue] = useState('');
  const userLocation = 'New York, NY'; // Replace with actual user location data

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Search for:', searchValue);
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white"
      style={{backgroundColor: colors.bg}}>
      {/* <View className="flex-row justify-start">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          className="absolute top-4 left-4 z-10 bg-yellow-400 p-2 rounded-bl-2xl">
          <Icon name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      </View> */}
      <Header />
    </SafeAreaView>
  );
};

export default HomeScreen;
