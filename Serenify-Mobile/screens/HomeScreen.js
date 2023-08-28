import { View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { themeColors } from "../themes";
import CardCarousel from "../components/CardCarousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchPackages } from "../stores/actions/actionCreators.js/package";
export default function HomeScreen() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const { packages, packagesLoading } = useSelector((state) => state.package);

  useEffect(() => {
    dispatch(fetchPackages());
  }, []);
  return (
    <View className="flex-1" style={{ backgroundColor: themeColors.bg }}>
      <SafeAreaView>
        <View className="flex-row justify-between items-center mx-4">
          {/* <Image
            source={require("../assets/SerenifyLogo.png")}
            style={{ width: 120, height: 60 }}
          /> */}
          {/* Replace with username */}
          <Text className="text-[#1A1B4B] mr-4  text-base">Hello, Putri</Text>
        </View>
      </SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 10 }}
      >
        <CardCarousel data={packages} name={"Nenangin"} />
      </ScrollView>
    </View>
  );
}
