
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './store/reducers/homeReducer';

const store = configureStore({
  reducer:{
     home: homeReducer,
  },
})

export default store;