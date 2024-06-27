import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';
import colors from '../theme/colors';
import {useDispatch, useSelector} from 'react-redux';

import {fetchProfiles, resetProfiles} from '../redux/slices/profiles';
import {logoutUser, setIsAuthenticated} from '../redux/slices/user';

const AVATAR_URL =
  'https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80';

const Header = ({handleOpenBottomSheet}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user.user);
  const isAuthenticated = useSelector(state => state.user.isAutheticated);
  // todo : write resirection logic
  const {
    data: profileDetails,
    status,
    error,
  } = useSelector(state => state.profileDetails);

  const handleSearch = text => {
    setSearchTerm(text);
    dispatch(resetProfiles()); // Clear the current search results
    dispatch(fetchProfiles({searchTerm: text, lastDoc: null})); // Fetch new results
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    dispatch(setIsAuthenticated(false));
  };
  return (
    <View>
      <LinearGradient
        start={{x: 1, y: 1}}
        end={{x: 1, y: 0}}
        colors={[colors.background, colors.secondary]}
        style={styles.container}>
        <View style={styles.headerContent}>
          <Image
            source={{uri: profileDetails?.photoURL || AVATAR_URL}}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.greeting} numberOfLines={1}>
              Hi, {profileDetails?.name} 👋
            </Text>
            <Text style={styles.discover} numberOfLines={1}>
              {profileDetails?.location}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.notificationIcon}
            onPress={handleLogout}>
            <Icon name="notifications" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.inputBox}>
            <Icon name="search" size={22} color="#1f1f1f" />
            <TextInput
              placeholder="Search Gyanigurus"
              placeholderTextColor="#848484"
              style={styles.textInput}
              value={searchTerm}
              onChangeText={handleSearch}
            />
          </View>

          <TouchableOpacity
            style={styles.tuneIcon}
            onPress={handleOpenBottomSheet}>
            <Icon name="tune" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerContent: {
    paddingHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 52,
    aspectRatio: 1,
    borderRadius: 52,
  },
  headerTextContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 1,
    color: colors.text,
  },
  discover: {
    color: colors.text,
    opacity: 0.75,
  },
  notificationIcon: {
    width: 52,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 52,
    marginLeft: 25,
  },
  searchContainer: {
    marginTop: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '98%',
    justifyContent: 'space-between',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#a1bcc0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    flex: 1,
    paddingHorizontal: 10,
    elevation: 5,
  },
  textInput: {
    padding: 8,
    flex: 1,
  },
  tuneIcon: {
    width: 52,
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 52,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Header;
