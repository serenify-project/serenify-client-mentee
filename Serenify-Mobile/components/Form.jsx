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
  StyleSheet,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import React, { useState } from "react";
import { themeColors } from "../themes";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { ArrowLeftIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";

import DateTimePicker from "@react-native-community/datetimepicker";

export default function Form({ title, data, handleChange, handleSubmit }) {
  const navigation = useNavigation();
  const [date, setDate] = useState(new Date());
  const [dateOfBirth, setDateOfbirth] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const onChange = ({ type }, selectedDate) => {
    console.log(selectedDate, 13);
    if (type == "set") {
      const currentDate = selectedDate;
      setDate(currentDate);
      handleChange((val) => {
        return {
          ...val,
          birthDate: selectedDate,
        };
      });
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
    <SafeAreaProvider>
      <SafeAreaView style={{ backgroundColor: themeColors.bg }}>
        <KeyboardAvoidingView
          style={{ backgroundColor: themeColors.bg }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView>
            {/* Form */}
            <Text style={Styles.formTitle}>{title}</Text>
            <View
              className="flex-1 bg-white px-8 pt-8 mb-8"
              style={{ borderRadius: 30, margin: 25 }}
            >
              <View className="form space-y-2">
                {/* Username */}
                <Text className="text-gray-700 ml-2">Username</Text>
                <TextInput
                  className="p-3 bg-gray-100 text-gray-700 rounded-xl mb-3 h-10"
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
                <Text className="text-gray-700 ml-2">Email Address</Text>
                <TextInput
                  className="p-3 bg-gray-100 text-gray-700 rounded-xl mb-3"
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
                <Text className="text-gray-700 ml-2">Password</Text>
                <TextInput
                  className="p-3 bg-gray-100 text-gray-700 rounded-xl mb-3"
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
                <Text className="text-gray-700 ml-2">Gender</Text>
                <SelectDropdown
                  data={["male", "female"]}
                  buttonStyle={{
                    borderRadius: 10,
                    width: "100%",
                    height: 40,
                    backgroundColor: "rgb(243 244 246)",
                  }}
                  buttonTextStyle={{
                    color: "rgb(55 65 81)",
                    textAlign: "left",
                    fontSize: 15,
                  }}
                  onSelect={(selectedItem) => {
                    handleChange((val) => {
                      return {
                        ...val,
                        gender: selectedItem,
                      };
                    });
                  }}
                />
                {/* <TextInput
                  onChangeText={(text) =>
                    handleChange((val) => {
                      return {
                        ...val,
                        gender: text,
                      };
                    })
                  }
                  className="p-3 bg-gray-100 text-gray-700 rounded-xl mb-3"
                  value={data.gender}
                  placeholder="Male/Female"
                /> */}
                {/* BirthDate */}
                {/* <Text className="text-gray-700 ml-2">Birth Date</Text>
                <TextInput
                  onChangeText={(text) =>
                    handleChange((val) => {
                      return {
                        ...val,
                        birthDate: text,
                      };
                    })
                  }
                  className="p-3 bg-gray-100 text-gray-700 rounded-xl mb-3"
                  value={data.birthDate}
                  placeholder="YYYY-MM-DD"
                /> */}

                <View>
                  <Text className="text-gray-700 ml-2">Birth Date</Text>
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
                        placeholder="Select Date"
                        value={dateOfBirth}
                        onChangeText={setDateOfbirth}
                        editable={false}
                        className="p-3 bg-gray-100 text-gray-700 rounded-xl mb-3 h-10"
                        onPressIn={toggleDatePicker}
                      />
                    </Pressable>
                  )}
                </View>

                <TouchableOpacity
                  onPress={handleSubmit}
                  className="p-3 bg-gray-100 text-gray-700 rounded-xl mb-3"
                  style={{
                    backgroundColor: themeColors.bg2,
                    height: 40,
                    marginBottom: 40,
                  }}
                >
                  <Text
                    className="text-center text-gray-700 ml-2"
                    style={{
                      height: 30,
                      padding: 0,
                      fontSize: 15,
                      fontWeight: "bold",
                      textTransform: "capitalize",
                    }}
                  >
                    Submit
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const Styles = StyleSheet.create({
  formTitle: {
    paddingTop: 25,
    fontWeight: "bold",
    fontSize: 25,
    flexDirection: "row",
    textAlign: "center",
    color: themeColors.bg1,
    marginBottom: 0,
  },
});
