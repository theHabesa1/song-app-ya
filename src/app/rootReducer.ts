// src/app/rootReducer.ts
import { combineReducers } from '@reduxjs/toolkit';
import songsReducer from './songsSlice';

const rootReducer = combineReducers({
  songs: songsReducer,
});

export type RootState = ReturnType<typeof rootReducer>; // Define RootState type

export default rootReducer;
