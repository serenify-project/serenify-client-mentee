import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../themes";
import CardCarousel from "../components/CardCarousel";

export default function HomeScreen() {
  // Dummy (replace dengan fetch API)
  const [packages, setPackages] = useState([1, 1, 1, 1, 1]);
  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView>
        <View className="flex-row justify-between items-center mx-4">
          <Image
            source={require("../assets/SerenifyLogo.png")}
            style={{ width: 120, height: 60 }}
          />
          <Text className="text-[#1A1B4B] mr-4  text-base">Hello, Putri</Text>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <CardCarousel data={packages} />
      </ScrollView>
    </View>
  );
}
