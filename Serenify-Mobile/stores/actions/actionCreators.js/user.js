import { API_URL } from "../../../config/api";
import { LOGGED_IN_USER_LOADING, LOGGED_IN_USER_SUCCESS } from "../actionType";
// LocalStoragenya react native
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchDetailPackageLoading } from "./package";

export function getUserSuccess(payload) {
  return {
    type: LOGGED_IN_USER_SUCCESS,
    payload,
  };
}

export function getUserLoading(payload) {
  return {
    type: LOGGED_IN_USER_LOADING,
    payload,
  };
}

export function login(userData) {
  return async (dispatch) => {
    try {
      const response = await fetch(API_URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw data.message;
      }
      if (!data.access_token) {
        throw { name: "Invalid Password" };
      } else {
        await AsyncStorage.setItem("access_token", data.access_token);
        dispatch(getUserSuccess(data));
        return data.access_token;
      }
    } catch (err) {
      console.log(err);
    }
  };
}

export function getUserById(id) {
  return async (dispatch) => {
    try {
      dispatch(fetchDetailPackageLoading(true));
      const response = await fetch(API_URL + `/users/${id}`, {
        method: "GET",
      });
      const responseJSON = await response.json();
      dispatch(getUserSuccess(responseJSON));
    } catch (err) {
      console.log(err);
    } finally {
      dispatch(fetchDetailPackageLoading(false));
    }
  };
}

export function register(userData) {
  return async (dispatch) => {
    try {
      userData.birthDate = new Date(userData.birthDate);
      console.log(userData);
      //   const response = await fetch(API_URL + "/register", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(userData),
      //   });
      //   const data = response.json();
      //   if (!response.ok) {
      //     throw data.message;
      //   }
    } catch (err) {
      console.log(err);
    }
  };
}

export function editUser(userData, id) {
  return async (dispatch) => {
    try {
      // console.log(userData, id);
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch(API_URL + `/users/detail`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          access_token: await AsyncStorage.getItem("access_token"),
        },

        body: JSON.stringify(userData),
      });
      const data = await response.json();
    } catch (err) {
      console.log(err);
    }
  };
}
