/* eslint-disable prettier/prettier */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';
const initialState = {
  isAutheticated: false,
  user: null,
  userLoading: false,
};
export const registerUser = createAsyncThunk(
  'user/registerUser',
  async ({email, password, userData}, {rejectWithValue}) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      // Add additional user data to the Firestore collection
      await firestore().collection('users').doc(user.uid).set({
        ...userData,
        uid: user.uid,
        email: user.email,
      });
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Account created.',
      });
      return {
        uid: user.uid,
        email: user.email,
        ...userData,
      };
    } catch (error) {
      console.error(error);
      return rejectWithValue(error.message);
    }
  },
);
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserLoading: (state, action) => {
      state.userLoading = action.payload;
    },
    extraReducers: builder => {
      builder
        .addCase(registerUser.pending, state => {
          state.userLoading = true;
        })
        .addCase(registerUser.fulfilled, (state, action) => {
          state.user = action.payload;
          state.isAuthenticated = true;
          state.userLoading = false;
        })
        .addCase(registerUser.rejected, (state, action) => {
          state.userLoading = false;
          // You can add additional error handling here if needed
        });
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, setUserLoading} = userSlice.actions;

export default userSlice.reducer;
