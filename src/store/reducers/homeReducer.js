import { combineReducers } from "@reduxjs/toolkit"

const initialState = {
  favourites: [],
  recentViewed: [],
  loading: true,
}

const moviewReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return {...state, ...action.payload}
    case "SET_SEARCH_RESULTS":
      return {...state, searchResults: action.payload}
    case "SET_FAV": 
      return {...state, favourites: [...state.favourites, action.payload]}
    case "UPDATE_FAV": 
      return {...state, favourites: action.payload}
    case "REMOVE_FAV": 
      return {
        ...state,
        favourites: state.favourites.filter(item => item.title !== action.payload?.title)
      };
    case 'SET_RECENT': 
      return {...state, recentViewed: action.payload}
    default:
      return state
  }
}

const homeReducer = combineReducers({
  movieList: moviewReducer
})

export default homeReducer