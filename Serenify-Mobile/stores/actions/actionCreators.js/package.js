import {
  PACKAGES_SUCCESS,
  PACKAGES_LOADING,
  PACKAGES_DETAIL_SUCCESS,
  PACKAGES_DETAIL_LOADING,
} from "../actionType";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../../../config/api";

export function fetchPackagesSuccess(payload) {
  return {
    type: PACKAGES_SUCCESS,
    payload,
  };
}

export function fetchPackagesLoading(payload) {
  return {
    type: PACKAGES_LOADING,
    payload,
  };
}

export function fetchPackageDetailSuccess(payload) {
  return {
    type: PACKAGES_DETAIL_SUCCESS,
    payload,
  };
}
export function fetchDetailPackageLoading(payload) {
  return {
    type: PACKAGES_DETAIL_LOADING,
    payload,
  };
}

export function fetchPackages() {
  return async (dispatch) => {
    try {
      dispatch(fetchPackagesLoading(true));
      const response = await fetch(API_URL + "/packages", {
        method: "GET",
        headers: {
          access_token: await AsyncStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(fetchPackagesSuccess(responseJSON));
    } catch (error) {
      console.log(err);
    } finally {
      dispatch(fetchPackagesLoading(false));
    }
  };
}

export function fetchPackageDetail(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchDetailPackageLoading(true));
      const response = await fetch(API_URL + `/packages/${id}`, {
        method: "GET",
        headers: {
          access_token: await AsyncStorage.getItem("access_token"),
        },
      });
      const responseJSON = await response.json();
      dispatch(fetchPackageDetailSuccess(responseJSON));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchDetailPackageLoading(false));
    }
  };
}
