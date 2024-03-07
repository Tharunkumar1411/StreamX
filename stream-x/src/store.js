
import { configureStore } from '@reduxjs/toolkit';
import homeReducer from './store/reducers/homeReducer';
import videoPlayerReducer from './store/reducers/playerReducer';

const store = configureStore({
  reducer:{
     home: homeReducer,
     player: videoPlayerReducer
  },
})

export default store;