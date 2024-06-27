import {ScrollView, StyleSheet} from 'react-native';
import React, {useRef} from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Category from '../components/Category';
import Services from '../components/Services';
import Deals from '../components/Deals';
import Profiles from '../components/Profiles';
import BottomSheet from '@gorhom/bottom-sheet';
import {View, Text, Button, Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Get the full height of the screen
const screenHeight = Dimensions.get('window').height;

// Calculate the heights based on percentages
const headerHeight = screenHeight * 0.18;
const categoryHeight = screenHeight * 0.12;
const flatListHeight = screenHeight * 0.7;
const HomeScreen = () => {
  const bottomSheetRef = useRef(null);

  const handleOpenBottomSheet = () => {
    bottomSheetRef.current?.expand();
  };

  const handleCloseBottomSheet = () => {
    bottomSheetRef.current?.close();
  };
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <Header handleOpenBottomSheet={handleOpenBottomSheet} />
      </View>
      {/* <View style={styles.category}>
        <Category />
      </View> */}
      {/* <Services /> */}

      {/* <Deals /> */}

      <Profiles />
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['1%', '50%', '100%']}
        initialSnapIndex={-1}
        enablePanDownToClose={true}>
        <View className="flex flex-1 items-center justify-center">
          <Text>Hello from Bottom Sheet!</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: headerHeight,
    // ... other header styles
  },
  category: {
    height: categoryHeight,
    // ... other category styles
  },
  // ... other styles
});
export default HomeScreen;
