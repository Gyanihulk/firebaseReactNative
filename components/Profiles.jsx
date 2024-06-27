import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
} from 'react-native';
import React, {useEffect} from 'react';

import {useDispatch, useSelector} from 'react-redux';
import Brand1 from '../assets/brand1.jpeg';
import Brand2 from '../assets/brand2.jpeg';
import Brand3 from '../assets/brand3.jpeg';
import Brand4 from '../assets/brand4.jpeg';
import {fetchProfiles} from '../redux/slices/profiles';
import colors from '../theme/colors';
const {width} = Dimensions.get('window');
const cardWidth = width / 2 - 15;
const Profiles = () => {
  const dispatch = useDispatch();
  const {items, status, lastVisible} = useSelector(state => state.profiles);

  useEffect(() => {
    // Fetch initial profiles on component mount without searchTerm
    dispatch(fetchProfiles({searchTerm: '', lastDoc: null}));
  }, [dispatch]);

  const loadMoreProfiles = () => {
    if (status !== 'loading' && lastVisible) {
      // Fetch more profiles starting from the last document retrieved
      dispatch(fetchProfiles({searchTerm: '', lastDoc: lastVisible}));
    }
  };

  console.log(items.length, 'profile cards');
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>
          Connect with Top Local Mentors Ready to Guide You!
        </Text>
        <View>
          <FlatList
            data={items}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            numColumns={2} // Set the number of columns to 2
            // onEndReached={loadMoreProfiles}
            // onEndReachedThreshold={0.1}
            columnWrapperStyle={styles.row} // Style for th/e row wrapper
            contentContainerStyle={styles.listContainer} // Style for the content container
          />
        </View>
        <View style={styles.row}>
          <View style={styles.brands}>
            <Image source={Brand1} style={styles.imgStyle} />
            <Text style={styles.brandTitle}>
              Min. 20% off | CaratLane Diamond Neklace
            </Text>
          </View>
          <View style={styles.brands}>
            <Image source={Brand2} style={styles.imgStyle} />
            <Text style={styles.brandTitle}>
              Min. 40% off | Fossil, Titan Smart Watch & More
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.brands}>
            <Image source={Brand3} style={styles.imgStyle} />
            <Text style={styles.brandTitle}>
              Heels - Upto 50% OFF on Heeled Sandals, High Heel{' '}
            </Text>
          </View>
          <View style={styles.brands}>
            <Image source={Brand4} style={styles.imgStyle} />
            <Text style={styles.brandTitle}>
              Sony 60W Blutooth SoundBar Speaker Audio Engine
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const renderItem = ({item}) => (
  <View style={styles.brands}>
    <Image
      source={{
        uri:
          item.photoURL ||
          'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80',
      }}
      style={styles.imgStyle}
    />

    <Text style={styles.brandTitle}>{item.name || 'No Name'}</Text>
  </View>
);
const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderTopColor: colors.yellow,
  },
  imgStyle: {
    height: 150,
    width: '100%',
    borderRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    padding: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  brands: {
    width: '50%',
    padding: 10,
  },
  brandTitle: {
    fontSize: 12,
    color: 'black',
    marginTop: 4,
  },

  card: {
    backgroundColor: '#fff',
    width: cardWidth,
    alignItems: 'center', // Center items horizontally
    padding: 10,
    borderRadius: 5,
    // Add more styles to match your design
  },

  name: {
    fontSize: 16,
    // Add more styles for the name text
  },
});

export default Profiles;
