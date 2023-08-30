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

import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { themeColors } from "../themes";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { login } from "../stores/actions/actionCreators.js/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  // useState and useEffect
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

  const handleSubmit = async (event) => {
    try {
      // await AsyncStorage.clear();
      const token = await dispatch(login(user));
      if (token) {
        navigation.navigate("Home");
      } else {
        console.log("else");
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
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className=" p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
            style={{ backgroundColor: themeColors.bg2 }}
          >
            <ArrowLeftIcon size="20" color="black" />
          </TouchableOpacity>
        </View>
        <View className="flex-row justify-center ">
        <Image
            source={require("../assets/test2.png")}
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
          {/* <TouchableOpacity className="flex items-end">
            <Text className="text-gray-700 mb-5">Forgot Password?</Text>
          </TouchableOpacity> */}
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
            <Text className="font-semibold " style={{ color: themeColors.bg2 }}>
              {" "}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
