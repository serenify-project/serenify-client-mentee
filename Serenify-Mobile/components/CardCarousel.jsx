import { View, Text, TouchableWithoutFeedback, Dimensions, Image } from "react-native";
import React from "react";
import Carousel from "react-native-snap-carousel";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { fetchPackageDetail } from "../stores/actions/actionCreators.js/package";
const { width, height } = Dimensions.get("window");



export default function CardCarousel({ data, name }) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const handleClick = async (paket) => {
    try {
      // mengupdate store dengan paket yg terpilih
      await dispatch(fetchPackageDetail(paket.id));
      navigation.navigate("Package");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <View className="mb-40" >
      <View className="mb-4" style={{height: "100%"}}>
        <Carousel
        style={{flex: 1, height: "100%"}}
          data={data}
          renderItem={({ item }) => (
            <Package handleClick={handleClick} item={item} />
          )}
          firstItem={1}
          inactiveSlideOpacity={0.6}
          sliderWidth={width}
          itemWidth={width * 0.72}
          slideStyle={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            shadowColor: "gray",
            shadowRadius: 5,
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 1,
          }}
          // vertical={true}
        />
      </View>
    </View>
  );
}

const Package = ({ item, handleClick }) => {
  return (
    // Jika di tekan akan langsung ke card utk bayar
    <TouchableWithoutFeedback onPress={() => handleClick(item)}>
      <View className="bg-neutral-200 w-full rounded-xl my-2" style={{height: "90%", marginTop: 50, backgroundColor: "white", borderRadius: 10}}>
        <Image source={{uri: "https://doodleipsum.com/700x394/flat"}} height={250}/>
        <View className="flex-row justify-between items-center mx-4 mt-5 border-b-2 border-neutral-400 pb-2">
          <View className="flex-1">
            <Text className="text-black text-xl font-bold" style={{textAlign: "center"}}>
              {item.name} Package
            </Text>
          </View>
        </View>
          <Text className="text-[#5f8ecb] mt-8 text-2xl font-bold" style={{textAlign: "center"}}>
            {new Intl.NumberFormat("id-ID", {
              style: "currency",
              currency: "IDR",
              minimumFractionDigits: 0,
            }).format(item.price)}
          </Text>

        <Text className="text-center text-xl font-semibold text-black" style={{textTransform: "capitalize"}}>
        {item.duration}
        </Text>
        <Text className="text-center m-4 text-xl font-semibold text-black">
        Click for details!
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
};
