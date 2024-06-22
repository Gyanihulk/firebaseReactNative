import {ScrollView} from 'react-native';
import React, {useRef} from 'react';
import Header from '../components/Header';
import SubHeader from '../components/SubHeader';
import Category from '../components/Category';
import Services from '../components/Services';
import Deals from '../components/Deals';
import Brands from '../components/Brands';
import BottomSheet from '@gorhom/bottom-sheet';
import {View, Text, Button} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
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
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header handleOpenBottomSheet={handleOpenBottomSheet} />
        <Category />
        {/* <Services /> */}

        {/* <Deals /> */}
        <Brands />
      </ScrollView>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['25%', '50%', '100%']}
        initialSnapIndex={1}
        enablePanDownToClose={true} 
      >
        <View className="flex flex-1 items-center justify-center" >
          <Text>Hello from Bottom Sheet!</Text>
        </View>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default HomeScreen;
