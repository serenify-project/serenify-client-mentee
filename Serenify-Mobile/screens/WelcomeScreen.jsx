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
        <View className="space-y mb-5">
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            className="py-3  mx-7 rounded-l my-3"
            style={{ backgroundColor: themeColors.bg2 }}
          >
            <Text className="text-[16px] font-bold text-center text-[#1A1B4B] mx-[50px]">
              Get started
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Login")}
            className="py-3  mx-7 rounded-l"
            style={{ backgroundColor: "white" }}
          >
            <Text className="text-[16px] font-bold text-center text-[#1A1B4B] mx-[50px]">
              I already have an account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
