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
import storage from '@react-native-firebase/storage';


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
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
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
export const updateProfileImage = createAsyncThunk(
  'user/updateProfileImage',
  async ({ imageUri}, {rejectWithValue}) => {
    try {
      const uid = auth().currentUser.uid;
      // Create a reference to the Firebase Storage location
      const storageRef = storage().ref(`profileImages/${uid}.jpg`);

      // Upload the image to Firebase Storage
      await storageRef.putFile(imageUri);

      // Get the download URL for the uploaded image
      const downloadUrl = await storageRef.getDownloadURL();

      // Update the user's profile with the new image URL
      await firestore().collection('users').doc(uid).update({
        photoURL: downloadUrl,
      });

      // Return the new image URL to update the user state
      return downloadUrl;
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
    setIsAuthenticated: (state, action) => {
      state.isAutheticated = action.payload;
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
        })
        .addCase(updateProfileImage.pending, state => {
          state.userLoading = true;
        })
        .addCase(updateProfileImage.fulfilled, (state, action) => {
          // Assuming `state.user` is an object containing user data
          if (state.user) {
            state.user.photoURL = action.payload;
          }
          state.userLoading = false;
        })
        .addCase(updateProfileImage.rejected, state => {
          state.userLoading = false;
          // You can add additional error handling here if needed
        });
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUser, setUserLoading,setIsAuthenticated} = userSlice.actions;

export default userSlice.reducer;
