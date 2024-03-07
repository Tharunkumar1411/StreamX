import { combineReducers } from "@reduxjs/toolkit"

const initialState = {
    recentViewed: [],
    favourites: [],
}

const playerReducer = (state = initialState, action) => {
  console.log("payload in reducer::", action.payload)
  switch (action.type) {
    case "SET_PLAYER_TIME":
      return {...state, recentViewed: action.payload};
      default:
      return state
  }
}

const videoPlayerReducer = combineReducers({
  player: playerReducer
})

export default videoPlayerReducer