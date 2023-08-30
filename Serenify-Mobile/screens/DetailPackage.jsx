import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { themeColors } from "../themes";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  initPayment,
  paymentSuccess,
} from "../stores/actions/actionCreators.js/payment";
import { useStripe } from "@stripe/stripe-react-native";
export default function DetailPackage() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // STRIPE
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { packageDetail } = useSelector((state) => state.package);
  const handleEnroll = async () => {
    try {
      console.log("Pemanggilan Stripe dengan ID:", packageDetail.id);
      const intent = await dispatch(initPayment(packageDetail.id));
      console.log(intent);

      const initResponse = await initPaymentSheet({
        merchantDisplayName: "Serenify",
        paymentIntentClientSecret: intent.clientSecret,
      });
      if (initResponse.error) {
        console.log(initResponse.error);
        Alert.alert("Something went wrong");
        return;
      }
      const paymentResponse = await presentPaymentSheet();
      if (paymentResponse.error) {
        Alert.alert(
          `${paymentResponse.error.code}`,
          paymentResponse.error.message,
        );
        return;
      }
      await dispatch(paymentSuccess(packageDetail.id));
      navigation.navigate("Home", { params: 'paymentSuccess' });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View
      className="flex-1 bg-neutral-100"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex">
        {/* Back Button */}
        <View className="flex-row justify-start">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            style={{ backgroundColor: themeColors.bg2 }}
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {/* Card Detail */}
      <ScrollView>
        <View
          className="flex-1 bg-neutral-100 px-8 pt-8 mx-4 mb-32 mt-12"
          style={{ borderRadius: 50 }}
        >
          <View className="space-y-2  border-b-2 border-neutral-400 pb-2 mt-6">
            <Text className="text-3xl font-bold text-[#1A1B4B]  ">
              {packageDetail.name}
            </Text>
            <Text className="text-2xl font-bold text-neutral-700">
              {new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              }).format(packageDetail.price)}
            </Text>
          </View>
          <View className="my-2">
            <Text className="font-bold text-lg mt-2">Duration :</Text>
            <Text className="font-semibold text-lg" style={{textTransform: "capitalize"}}>
              • {packageDetail.duration}
            </Text>
          </View>
          <View className="my-2">
            <Text className="font-bold text-lg mt-2">• Description :</Text>
            <Text className=" text-md text-base">
              {packageDetail.description}
            </Text>
          </View>
          <TouchableOpacity onPress={handleEnroll}>
            <View
              className="p-4 rounded-full my-12 shadow-md "
              style={{ backgroundColor: themeColors.bg2 }}
            >
              <Text className="text-center font-bold text-[#1A1B4B] text-xl ">
                Enroll
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
