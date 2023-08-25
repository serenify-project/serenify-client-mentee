import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { themeColors } from "../themes";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
export default function DetailPackage() {
  const navigation = useNavigation();
  const handleEnroll = () => {
    console.log("Pemanggilan Stripe");
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
      <View
        className="flex-1 bg-neutral-100 px-8 pt-8 mx-4 mb-32 mt-12"
        style={{ borderRadius: 50 }}
      >
        <View className="space-y-2  border-b-2 border-neutral-400 pb-2 mt-6">
          <Text className="text-3xl font-bold text-[#1A1B4B]  ">
            Super Package
          </Text>
          <Text className="text-2xl font-bold text-neutral-700">
            Rp.299.000
          </Text>
        </View>
        <View className="my-2">
          <Text className="font-bold text-lg mt-2">Schedule :</Text>
          <Text className="font-semibold text-lg">
            • Sunday, 18 October 2023
          </Text>
        </View>
        <View className="my-2">
          <Text className="font-bold text-lg mt-2">Duration :</Text>
          <Text className="font-semibold text-lg">• 1 Hour</Text>
        </View>
        <View className="my-2">
          <Text className="font-bold text-lg mt-2">• Description :</Text>
          <Text className="font-semibold text-md text-base">
            Paket yang cocok bila kamu lagi ingin irit budget, paket ini akan
            berlangsung selama 2 jam. Saya gak tau bang , saya cuman kerja bang.
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
    </View>
  );
}
