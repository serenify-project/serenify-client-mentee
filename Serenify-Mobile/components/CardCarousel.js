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
              {item.name}
            </Text>
          </View>

          <Text className="text-[#3E6D9C] text-2xl font-bold">
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(item.price)}
          </Text>
        </View>

        <Text className="text-center m-4 text-xl font-semibold ">
          1 {item.duration}
        </Text>

        <View className="mx-4 border-t-2 border-neutral-400 py-4">
          <Text className="mb-2 font-semibold">Description</Text>
          <Text className="tracking-wide text-base text-neutral-800">
            {item.description.slice(0, 200) + "..."}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
