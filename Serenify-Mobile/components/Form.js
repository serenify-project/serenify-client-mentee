import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";

import React, { useState } from "react";
import { themeColors } from "../themes";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

export default function Form({ data, handleChange, handleSubmit }) {
  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: themeColors.bg }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView>
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
          <View className="flex-row justify-center">
            <Image
              source={require("../assets/SerenifyLogo.png")}
              style={{ width: 165, height: 110 }}
            />
          </View>
        </SafeAreaView>
        {/* Form */}
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderRadius: 50 }}
        >
          <View className="form space-y-2">
            {/* Username */}
            <Text className="text-gray-700 ml-4">Username</Text>
            <TextInput
              autoCapitalize="none"
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={data.username}
              onChangeText={(text) => handleChange("username", text)}
              placeholder="Enter Email"
            />
            {/* Email */}
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              autoCapitalize="none"
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={data.email}
              onChangeText={(text) => handleChange("email", text)}
              placeholder="Enter Email"
            />
            {/* Password */}
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              autoCapitalize="none"
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              onChangeText={(text) => handleChange("password", text)}
              value={data.password}
              placeholder="Enter Password"
            />
            {/* Gender */}
            <Text className="text-gray-700 ml-4">Gender</Text>
            <TextInput
              autoCapitalize="none"
              onChangeText={(text) => handleChange("gender", text)}
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={data.gender}
              placeholder="Male/Female"
            />
            {/* BirthDate */}
            <Text className="text-gray-700 ml-4">Birth Date</Text>
            <TextInput
              autoCapitalize="none"
              onChangeText={(text) => handleChange("birthDate", text)}
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={data.birthDate}
              placeholder="DD/MM/YYYY"
            />

            <TouchableOpacity
              onPress={handleSubmit}
              className="p-4 my-8 rounded-xl"
              style={{ backgroundColor: themeColors.bg2 }}
            >
              <Text className="font-xl font-bold text-center text-gray-700">
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
