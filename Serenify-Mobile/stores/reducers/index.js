import { combineReducers } from "redux";
import packageReducer from "./packageReducer";
const rootReducer = combineReducers({
  // fill in reducer
  package: packageReducer,
});

export default rootReducer;
