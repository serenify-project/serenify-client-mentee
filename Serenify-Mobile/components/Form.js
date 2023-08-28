import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Button,
  Platform,
  Pressable,
} from "react-native";

import React, { useState } from "react";
import { themeColors } from "../themes";
import { SafeAreaView } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function Form({ data, handleChange, handleSubmit }) {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [dateOfBirth, setDateOfbirth] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChange = ({ type }, selectedDate) => {
    console.log(type, 11);
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === "android") {
        toggleDatePicker();
        setDateOfbirth(formatDate(currentDate));
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setDateOfbirth(formatDate(date));
    toggleDatePicker();
  };

  const formatDate = (rawDate) => {
    let date = new Date(rawDate);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    month = month < 10 ? `0${month}` : month;
    day = day < 10 ? `0${day}` : day;
    return `${year}-${month}-${day}`;
  };
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
              source={require("../assets/test4.png")}
              style={{ width: 300, height: 50 }}
            />
          </View>
        </SafeAreaView>
        {/* Form */}
        <View
          className="flex-1 bg-white px-8 pt-8"
          style={{ borderTopLeftRadius: 50, borderTopRightRadius: 50 }}
        >
          <View className="form space-y-2">
            {/* Username */}
            <Text className="text-gray-700 ml-4">Username</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={data.username}
              onChangeText={(text) =>
                handleChange((val) => {
                  return {
                    ...val,
                    username: text,
                  };
                })
              }
              placeholder="Enter Username"
            />
            {/* Email */}
            <Text className="text-gray-700 ml-4">Email Address</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={data.email}
              onChangeText={(text) =>
                handleChange((val) => {
                  return {
                    ...val,
                    email: text,
                  };
                })
              }
              placeholder="Enter Email"
            />
            {/* Password */}
            <Text className="text-gray-700 ml-4">Password</Text>
            <TextInput
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-7"
              secureTextEntry
              onChangeText={(text) =>
                handleChange((val) => {
                  return {
                    ...val,
                    password: text,
                  };
                })
              }
              value={data.password}
              placeholder="Enter Password"
            />
            {/* Gender */}
            <Text className="text-gray-700 ml-4">Gender</Text>
            <TextInput
              onChangeText={(text) =>
                handleChange((val) => {
                  return {
                    ...val,
                    gender: text,
                  };
                })
              }
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={data.gender}
              placeholder="Male/Female"
            />
            {/* BirthDate */}
            <Text className="text-gray-700 ml-4">Birth Date</Text>
            <TextInput
              onChangeText={(text) =>
                handleChange((val) => {
                  return {
                    ...val,
                    birthDate: text,
                  };
                })
              }
              className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
              value={data.birthDate}
              placeholder="YYYY-MM-DD"
            />

            {/* <View>
              <Text className="text-gray-700 ml-4">Birth Date</Text>
              {showDatePicker && (
                <DateTimePicker
                  mode="date"
                  display="spinner"
                  value={new Date()}
                  onChange={onChange}
                  style={{ height: 120, marginTop: -10 }}
                />
              )}

              {showDatePicker && Platform.OS == "ios" && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                  }}
                >
                  <TouchableOpacity
                    style={{ height: 20 }}
                    onPress={toggleDatePicker}
                  >
                    <Text>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity style={{}} onPress={confirmIOSDate}>
                    <Text>Confirm</Text>
                  </TouchableOpacity>
                </View>
              )}

              {!showDatePicker && (
                <Pressable onPress={toggleDatePicker}>
                  <TextInput
                    placeholder="select date"
                    value={dateOfBirth}
                    // onChangeText={setDateOfbirth}
                    onChangeText={(text) => {
                      handleChange((val) => {
                        return {
                          ...val,
                          gender: text,
                        };
                      });
                    }}
                    editable={false}
                    className="p-4 bg-gray-100 text-gray-700 rounded-2xl mb-3"
                    onPressIn={toggleDatePicker}
                  />
                </Pressable>
              )}
            </View> */}

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
