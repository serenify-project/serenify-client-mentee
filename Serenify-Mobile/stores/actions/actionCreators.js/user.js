import { API_URL } from "../../../config/api";

export function login(userData) {
  return async (dispatch) => {
    try {
      console.log(userData);
      //   const response = await fetch(API_URL + "/login", {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify(userData),
      //   });
      //   const data = await response.json();

      //   localStorage.setItem("access_token", data.message);
      //   if (!response.ok) {
      //     throw data.message;
      //   }
    } catch (err) {
      console.log(err);
    }
  };
}

export function register(userData) {
  return async (dispatch) => {
    try {
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
