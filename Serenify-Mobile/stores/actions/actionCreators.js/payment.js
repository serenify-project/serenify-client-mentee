import { API_URL } from "../../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function initPayment(packageId) {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      console.log(token);

      const response = await fetch(API_URL + "/payment/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: token,
        },
        body: packageId,
      });
      const responseJSON = await response.json();
      console.log(responseJSON);
    } catch (err) {
      console.log(err);
    }
  };
}
