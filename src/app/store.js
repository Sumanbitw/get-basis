import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../features/authentication/loginSlice';

export const store = configureStore({
  reducer: {
    login : loginSlice
  },
});
