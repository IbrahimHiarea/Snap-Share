import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import authSlice from '../features/auth/auth.slice';
import homeSlice from '../features/home/home.slice';

export const store = configureStore({
  reducer: {
   auth: authSlice,
   home: homeSlice,
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export const AppDispatch: () => typeof store.dispatch=useDispatch  // instead of useDispatch 
export const AppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>>=useSelector // instead of useSelector