import { Alert } from "react-native";
import { API_URL } from "../../../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
export function initPayment(packageId) {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await fetch(API_URL + "/payment/init", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: token,
        },
        body: JSON.stringify({ packageId: packageId }),
      });
      const responseJSON = await response.json();
      return responseJSON;
    } catch (err) {
      console.log(err);
    }
  };
}

export function paymentSuccess(packageId) {
  return async (dispatch) => {
    try {
      const token = await AsyncStorage.getItem("access_token");

      const response = await fetch(API_URL + "/payment/success", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          access_token: token,
        },
        body: JSON.stringify({ packageId: packageId }),
      });
      const responseJSON = await response.json();
      Alert.alert(
        `${responseJSON.message}`,
        `Your transaction id is : ${responseJSON.transactionId}`
      );
    } catch (err) {
      console.log(err);
    }
  };
}
