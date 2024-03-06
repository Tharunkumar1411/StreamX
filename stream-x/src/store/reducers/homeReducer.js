import { combineReducers } from "@reduxjs/toolkit"

const moviewReducer = (state = null, action) => {
  switch (action.type) {
    case "GET_MOVIES":
      return {...state, ...action.payload}
    default:
      return state
  }
}

const homeReducer = combineReducers({
  movieList: moviewReducer
})

export default homeReducer