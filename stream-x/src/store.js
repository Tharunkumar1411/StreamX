import rotateReducer from "reducers/rotateReducer";
import { createStoreHook } from "react-redux";

function configureStore(state = { rotating: true }) {
  return createStoreHook(rotateReducer,state);
}

export default configureStore;