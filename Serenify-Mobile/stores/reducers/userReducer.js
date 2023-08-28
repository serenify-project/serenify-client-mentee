import {
  LOGGED_IN_USER_LOADING,
  LOGGED_IN_USER_SUCCESS,
} from "../actions/actionType";

const initialState = {
  user: null,
  userLoading: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGED_IN_USER_LOADING:
      return {
        ...state,
        userLoading: action.payload,
      };
    case LOGGED_IN_USER_SUCCESS:
      return {
        ...state,
        user: action.payload,
      };

    default:
      return state;
  }
};
export default userReducer;
