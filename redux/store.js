import {configureStore} from '@reduxjs/toolkit';
import user from './slices/user';
import profileDetails from './slices/profileDetails';

export const store = configureStore({
  reducer: {user, profileDetails},
});
