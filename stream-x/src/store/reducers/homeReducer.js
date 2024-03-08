import { combineReducers } from "@reduxjs/toolkit"

const initialState = {
  favourites: [],
  recentViewed: []
}

const moviewReducer = (state = initialState, action) => {
  console.log("chekcinn payload::", action.payload)
  switch (action.type) {
    case "GET_MOVIES":
      return {...state, ...action.payload}
    case "SET_SEARCH_RESULTS":
      return {...state, searchResults: action.payload}
    case "SET_FAV": 
      return {...state, favourites: [...state.favourites, action.payload]}
    case "REMOVE_FAV": 
      return {
        ...state,
        favourites: state.favourites.filter(item => item !== action.payload)
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