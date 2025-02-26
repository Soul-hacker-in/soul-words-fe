import { configureStore } from '@reduxjs/toolkit';
import wordReducer from './wordSlice'; 

const store = configureStore({
  reducer: {
    words: wordReducer, 
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;