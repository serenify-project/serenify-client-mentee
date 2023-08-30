import { useNavigation } from "@react-navigation/native";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { themeColors } from "../themes";

const { height } = Dimensions.get("screen");


export default function ScheduleCard({ data }) {

  const navigation = useNavigation();

  async function createRoom() {
    const value = await AsyncStorage.getItem("access_token");
    console.log(value);
    try {
      const response = await fetch(`${API_URL}/rooms`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          access_token: value,
        },
      })
      const room = await response.json();
      const roomUrl = room.url;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={() => navigation.navigate("VideoCall")}>
        <Text>
          {data.User.username}
        </Text>
        <Text>Room: {data.status}</Text>
        <Text>Date: {data.date}</Text>
        <Text>Join</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    height: height / 8,
    marginLeft: 20,
    marginRight: 20,
    marginVertical: 15,
    padding: 20,
    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
  },
});
