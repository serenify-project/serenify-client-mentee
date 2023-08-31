import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import { themeColors } from "../themes";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/api";
import BackButton from "../components/BackButton";
export default function LoginScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(API_URL + "/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        const data = await response.json();
        const access_token = data.access_token
        await AsyncStorage.setItem('access_token', access_token)
        navigation.navigate("Home");
      } else {
        Alert.alert(
          "Invalid Username/Password",
          "Please check your username/password"[
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ],
          { cancelable: false },
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View
      className="flex-1 bg-white"
      style={{ backgroundColor: themeColors.bg }}
    >
      <SafeAreaView className="flex ">
        <View className="flex-row justify-start">
          <BackButton />
        </View>
        <View className="flex-row justify-center ">
        <Image
            source={require("../assets/logo-serenify.png")}
            style={{ flex: 1, resizeMode: "contain", width: 80, height: 45, marginBottom: 50, marginTop: 50}}
          />
        </View>
      </SafeAreaView>
      <View
        style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        className="flex-1 bg-white px-8 pt-8"
      >
        <View className="form space-y-2">
          <Text className="text-gray-700 ml-4">Email Address</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
            placeholder="email"
            onChangeText={(text) => handleChange("email", text)}
            autoCapitalize="none"
            value={user.email}
          />
          <Text className="text-gray-700 ml-4">Password</Text>
          <TextInput
            className="p-4 bg-gray-100 text-gray-700 rounded-xl mb-3"
            secureTextEntry
            autoCapitalize="none"
            placeholder="password"
            onChangeText={(text) => handleChange("password", text)}
            value={user.password}
          />
          <TouchableOpacity
            onPress={handleSubmit}
            className="py-3  rounded-xl"
            style={{ backgroundColor: themeColors.bg2 }}
          >
            <Text className="text-xl font-bold text-center text-gray-700">
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <View className="flex-row justify-center mt-7">
          <Text className="text-gray-500 font-semibold">
            Don't have an account?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
            <Text className="font-semibold " style={{ color: themeColors.bg3 }}>
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
