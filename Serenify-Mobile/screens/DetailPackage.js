import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { themeColors } from "../themes";
import React from "react";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
export default function DetailPackage() {
  const navigation = useNavigation();
  return (
    <View
      className="flex-1 bg-white"
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
        className="flex-1 bg-neutral-100 px-8 pt-8 mx-4 mb-10 mt-4"
        style={{ borderRadius: 50 }}
      >
        <View className="space-y-2  border-b-2 border-neutral-400 pb-2">
          <Text className="text-3xl font-bold text-[#1A1B4B]  ">
            Super Package
          </Text>
          <Text className="text-2xl font-bold text-neutral-700">
            Rp.299.000
          </Text>
        </View>
        <View className="my-4">
          <Text className="font-bold text-lg mt-2">• Schedule :</Text>
          <Text className="font-bold text-lg">Sunday, 18 October 2023</Text>
        </View>
        <View className="my-4">
          <Text className="font-bold text-lg mt-2">• Duration :</Text>
          <Text className="font-bold text-lg ">1 Hour</Text>
        </View>
      </View>
    </View>
  );
}
