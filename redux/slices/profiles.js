/* eslint-disable prettier/prettier */
// profileSlice.js
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import firestore from '@react-native-firebase/firestore';

const pageSize = 10; // Number of profiles to fetch per page

export const fetchProfiles = createAsyncThunk(
  'profiles/fetchProfiles',
  async ({searchTerm, lastDoc}, {rejectWithValue}) => {
    try {
      let query = firestore()
        .collection('profiledetails')
        .orderBy('name') // Assuming you want to filter by name
        .limit(pageSize);

      if (searchTerm) {
        query = query.startAt(searchTerm);
      }

      if (lastDoc) {
        query = query.startAfter(lastDoc);
      }

      const snapshot = await query.get();

      const profiles = snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
      const lastVisible = snapshot.docs[snapshot.docs.length - 1];
      const lastVisibleData = {
        id: lastVisible.id,
        // other relevant data you need from the document
      };
      return {profiles, lastVisible: lastVisibleData};
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

const profileSlice = createSlice({
  name: 'profiles',
  initialState: {
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null,
    lastVisible: null,
  },
  reducers: {
    resetProfiles: state => {
      state.items = [];
      state.lastVisible = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProfiles.pending, state => {
        state.status = 'loading';
      })
      .addCase(fetchProfiles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload.lastVisible
          ? [...state.items, ...action.payload.profiles]
          : action.payload.profiles;
        state.lastVisible = action.payload.lastVisible;
      })
      .addCase(fetchProfiles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const {resetProfiles} = profileSlice.actions;
export default profileSlice.reducer;
