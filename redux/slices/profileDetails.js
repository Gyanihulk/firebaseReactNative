/* eslint-disable prettier/prettier */
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Toast from 'react-native-toast-message';

// Async thunk for saving profile details
export const saveProfileDetails = createAsyncThunk(
  'profileDetails/saveProfileDetails',
  async (profileData, {rejectWithValue}) => {
    try {
      const userId = auth().currentUser.uid;

      // Create a reference to the user's document in the profiledetails collection
      const profileRef = firestore().collection('profiledetails').doc(userId);
      console.log('profileCreatedSuccefully');
      Toast.show({
        type: 'success',
        position: 'bottom',
        text1: 'Account profile updated.',
      });
      // Set the profile data in Firestore
      await profileRef.set(profileData);

      // Return the saved profile data
      return profileData;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const fetchProfileImage = createAsyncThunk(
  'profileDetails/fetchProfileImage',
  async (_, {rejectWithValue}) => {
    try {
      const userId = auth().currentUser.uid;

      // Get a reference to the user's document in the profiledetails collection
      const profileRef = firestore().collection('profiledetails').doc(userId);

      // Get the profile data from Firestore
      const profileSnapshot = await profileRef.get();

      // Check if the profile data exists and has a photoURL field
      if (profileSnapshot.exists && profileSnapshot.data().photoURL) {
        // Return the photoURL
        return profileSnapshot.data().photoURL;
      } else {
        // Throw an error if no photoURL is found
        throw new Error('No profile image found.');
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
const profileDetailsSlice = createSlice({
  name: 'profileDetails',
  initialState: {
    data: null,
    profileImage: null,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    // Optional: add reducers for other actions here
  },
  extraReducers: builder => {
    builder
      .addCase(saveProfileDetails.pending, state => {
        state.status = 'loading';
      })
      .addCase(saveProfileDetails.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
      })
      .addCase(saveProfileDetails.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
      builder
      .addCase(fetchProfileImage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProfileImage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.profileImage = action.payload; // Store the profile image URL
      })
      .addCase(fetchProfileImage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default profileDetailsSlice.reducer;
