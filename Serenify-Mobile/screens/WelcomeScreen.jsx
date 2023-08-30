import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../themes";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView
      className="flex-1"
      style={{ backgroundColor: themeColors.bg }}
    >
      <View className="flex-1 flex justify-between my-4">
        <View className="flex-row justify-center mt-[250px]">
          <Image
            source={require("../assets/logo-serenify.png")}
            style={{ flex: 1, resizeMode: "contain", width: 80, height: 45 }}
          />
        </View>
        {/* <Text className="text-[#1A1B4B] font-bold text-l text-center mx-[50px]">
          Where professional care, convenience, and community converge to
          empower your well-being journey.
        </Text> */}
        <View className="space-y">
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="py-3  mx-7 rounded-xl"
            style={{ backgroundColor: themeColors.bg2 }}
          >
            <Text className="text-xl font-bold text-center text-[#1A1B4B] mx-[50px]">
              Sign Up
            </Text>
          </TouchableOpacity>
          <View className="flex-row justify-center mt-3 ">
            <Text className="text-[#1A1B4B] font-semibold ">
              Already have an account?
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text
                className="font-semibold "
                style={{ color: themeColors.bg3 }}
              >
                {" "}
                Log In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
