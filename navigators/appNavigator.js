import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import Welcome from '../screens/Welcome';
import SignUp from '../screens/SignUp';
import SignIn from '../screens/SignIn';
import {useSelector} from 'react-redux';
import UserOnboarding from '../screens/UserOnboarding';
const Stack = createNativeStackNavigator();
const AppNavigator = () => {
  const user = useSelector(state => state.user);
  if (user.isAutheticated) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen
            name="Welcome"
            options={{headerShown: false}}
            component={Welcome}
          />
          <Stack.Screen
            options={{headerShown: false}}
            name="Signup"
            component={SignUp}
          />
          <Stack.Screen
            name="Signin"
            options={{headerShown: false}}
            component={SignIn}
          />
          <Stack.Screen
            name="UserOnboarding"
            options={{headerShown: false}}
            component={UserOnboarding}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default AppNavigator;
