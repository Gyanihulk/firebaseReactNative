/* eslint-disable prettier/prettier */
import {configureStore} from '@reduxjs/toolkit';
import user from './slices/user';
import profileDetails from './slices/profileDetails';
import profiles from './slices/profiles';

export const store = configureStore({
  reducer: {user, profileDetails, profiles},
});
