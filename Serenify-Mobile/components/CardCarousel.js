import { View, Text, TouchableWithoutFeedback, Dimensions } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
var { width, height } = Dimensions.get("window");
export default function CardCarousel({ data, name }) {
  const navigation = useNavigation();
  const handleClick = () => {
    // Payment
    navigation.navigate("Package");
  };
  return (
    <View className="mb-8">
      <Text className="text-[#1A1B4B] text-2xl mx-4 mb-4 font-bold">
        {name}
      </Text>
      <View className="mb-4">
        <Carousel
          data={data}
          renderItem={({ item }) => (
            <Package handleClick={handleClick} item={item} />
          )}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.72}
          slideStyle={{
            display: "flex",
            alignItems: "center",
            shadowColor: "gray",
            shadowRadius: 5,
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 1,
          }}
        />
      </View>
    </View>
  );
}

const Package = ({ item, handleClick }) => {
  return (
    // Jika di tekan akan langsung ke card utk bayar
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View className="bg-neutral-200 w-full h-[400px] rounded-xl my-2">
        <View className="flex-row justify-between items-center mx-4 mt-8 border-b-2 border-neutral-400 pb-2">
          <View className="flex-1">
            <Text className="text-black text-lg font-semibold">PAKET</Text>
            <Text className="text-black text-xl font-semibold">
              Small {/* {item.name} */}
            </Text>
          </View>

          <Text className="text-[#3E6D9C] text-2xl font-bold">
            Rp.299k {/* {item.price} */}
          </Text>
        </View>
        <View className="flex-row my-4 justify-between mx-24">
          <Text className="text-center text-xl font-semibold ">SESI</Text>
          <Text className="text-center text-xl font-semibold ">
            1 JAM {/* {item.duration} */}
          </Text>
        </View>

        <View className="mx-4 border-t-2 border-neutral-400 py-4">
          <Text className="mb-2 font-semibold">Description</Text>
          <Text className="tracking-wide text-base text-neutral-800">
            Paket yang cocok bila kamu lagi ingin irit budget, paket ini akan
            berlangsung selama 2 jam. Saya gak tau bang , saya cuman kerja bang.
            {/* item.description */}
          </Text>
        </View>
        {/* Schedule */}
        <View className="my-2 mx-4">
          <Text className="mb-2 font-semibold">Schedule</Text>
          <Text className="tracking-wide text-base text-neutral-800">
            Monday, 20 October 2023
            {/* item.schedule */}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
