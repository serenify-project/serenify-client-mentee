import { API_URL } from "../../../config/api";
// LocalStoragenya react native
import AsyncStorage from "@react-native-async-storage/async-storage";
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
      if (!data.access_token) {
        throw { name: "Invalid Password" };
      } else {
        await AsyncStorage.setItem(
          "access_token",
          JSON.stringify(data.access_token)
        );
      }
      if (!response.ok) {
        throw data.message;
      }
    } catch (err) {
      console.log(err);
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
