import {
  View,
  Text,
  ScrollView,
  Image,
  SafeAreaView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { themeColors } from "../themes";
import { PencilSquareIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const ios = Platform.OS == "ios";
const verticalMargin = ios ? "" : " my-3";
var { width, height } = Dimensions.get("window");
export default function ProfileScreen() {
  const navigation = useNavigation();
  // TODO
  // useEffect utk findUserById?
  // isi tiap data scr dinamis
  return (
    <ScrollView
      className="flex-1"
      style={{ backgroundColor: themeColors.bg }}
      contentContainerStyle={{ paddingBottom: 20 }}
    >
      <SafeAreaView>
        {/* Edit Button */}
        <TouchableOpacity
          // Ke Edit Screen
          onPress={() => navigation.navigate("Edit")}
          className="flex items-end mx-4"
        >
          <PencilSquareIcon size={35} color={"#1A1B4B"} />
        </TouchableOpacity>
        {/* ProfPict */}
        <View
          className="flex-row justify-center mt-32"
          style={{
            shadowColor: "gray",
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 1,
          }}
        >
          <View className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
            <Image
              source={require("../assets/DefaultProfile.jpeg")}
              style={{ height: height * 0.33, width: width * 0.7 }}
            />
          </View>
        </View>
        {/* username */}
        <View className="mt-6">
          <Text className="text-3xl text-[#1A1B4B] font-bold text-center">
            Putri Indah
            {/* {user.username} */}
          </Text>
          {/* Gender */}
          <Text className="text-neutral-700 text-base text-center">
            putri@gmail.com
            {/* {user.email} */}
          </Text>
        </View>

        {/* Details */}
        <View className="mx-28 p-4 mt-6 flex-row justify-between items-center rounded-full border-2 border-[#1A1B4B]">
          <View className="border-r-2 border-r-[#1A1B4B] px-2 items-center">
            <Text className="text-[#1A1B4B] font-semibold mx-2 ">Gender</Text>
            <Text className="text-neutral-700 text-sm">
              Female {/* {user.gender} */}
            </Text>
          </View>

          <View className="px-2 items-center">
            <Text className="text-[#1A1B4B] font-semibold">Birthday</Text>
            <Text className="text-neutral-700 text-sm ">
              1964-09-02 {/* {user.birthYear} */}
            </Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}
