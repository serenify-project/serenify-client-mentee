import { combineReducers } from "redux";
import packageReducer from "./packageReducer";
import userReducer from "./userReducer";
const rootReducer = combineReducers({
  // fill in reducer
  package: packageReducer,
  user: userReducer,
});

export default rootReducer;
