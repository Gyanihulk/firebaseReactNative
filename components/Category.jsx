import {
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Categories} from '../data/Categories';

import colors from '../theme/colors';
const Category = () => {
  const navigation = useNavigation();
  const [category, setCategory] = useState(Categories);

  // useEffect(() => {
  //   getCategoryFromApi(Categories);
  // }, []);

  return (
    <ScrollView
      showsHorizontalScrollIndicator={false}
      horizontal
      className="p-10">
      {category?.length &&
        category.map(item => (
          
            <TouchableOpacity
              onPress={() => navigation.navigate('ProductScreen')}
              key={item.id}
              style={styles.category}>
              <Icon name={item.icon} size={68} color={colors.text} />
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          
        ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 10,
    color: '#2c4341',
  },
  category: {
    paddingHorizontal: 8,
    alignItems: 'center',
  },
});

export default Category;
