import {
  PACKAGES_SUCCESS,
  PACKAGES_LOADING,
  PACKAGES_DETAIL_SUCCESS,
  PACKAGES_DETAIL_LOADING,
} from "../actions/actionType";

const initialState = {
  packages: [],
  packagesLoading: false,
  packageDetail: null,
  packageLoading: false,
};

const packageReducer = (state = initialState, action) => {
  switch (action.type) {
    case PACKAGES_SUCCESS:
      return {
        ...state,
        packages: action.payload,
      };
    case PACKAGES_LOADING:
      return {
        ...state,
        packagesLoading: action.payload,
      };
    case PACKAGES_DETAIL_SUCCESS:
      return {
        ...state,
        packageDetail: action.payload,
      };
    case PACKAGES_DETAIL_LOADING:
      return {
        ...state,
        packageLoading: action.payload,
      };
    default:
      return state;
  }
};

export default packageReducer;
