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
import { API_URL } from "../config/api";
import { Ionicons, Entypo, MaterialIcons } from '@expo/vector-icons';
const { height } = Dimensions.get("screen");

const options = {
  weekday: 'short',
  day: 'numeric',
  month: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
};

export default function ScheduleCard({ data }) {

  const navigation = useNavigation();

  async function createRoom() {
    const value = await AsyncStorage.getItem("access_token");
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

  async function action_todo() {
    const value = await AsyncStorage.getItem("access_token");
    await fetch (`${API_URL}/rooms`, {
      method: "patch",
      headers: {
        "Content-Type": "application/json",
        access_token: value,
      },
    })
  }

  return (
    <TouchableOpacity style={styles.cardContainer}>
      {/* <TouchableOpacity onPress={() => navigation.navigate("VideoCall")}>
        <Text>
          {data.User.username}
        </Text>
        <Text>Room: {data.status}</Text>
        <Text>Date: {data.date}</Text>
        <Text>Join</Text>
      </TouchableOpacity> */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{data.User.username}</Text>
        <View style={styles.iconAndTextContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="notifications-circle-outline" size={16} color="black" />
          </View>
          <Text style={styles.textInfo}>{data.status}</Text>
        </View>
        <View style={styles.iconAndTextContainer}>
          <View style={styles.iconContainer}>
            <Entypo name="calendar" size={16} color="black" />
          </View>
          <Text style={styles.textInfo}>{data?.date && `${new Date(data?.date).toLocaleString('au', options)}`}</Text>
        </View>
      </View>
      <View style={styles.imageContainer}>
        {data?.uri ? <Image source={{ uri: data?.uri }} style={styles.image} /> : <Image source={{ uri: 'https://doodleipsum.com/700x394/flat' }} style={styles.image} />}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    height: height / 8,
    marginLeft: 20,
    marginRight: 20,
    marginVertical: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    paddingRight: 10, // INI BIAR MEPET KE KANAN DIKIT
    width: "90%",
    // backgroundColor: "red",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'rgba(0, 0, 0, 0.2)'
  },
  iconContainer: {
    // backgroundColor: 'yellow',
    maxWidth: 24,
    marginRight: 5
  },
  image: {
    width: '90%',
    height: '100%',
    borderRadius: 15,
  },
  textContainer: {
    // backgroundColor: 'blue',
    flex: 1,
  },
  imageContainer: {
    // backgroundColor: 'green',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'left',
    marginBottom: 5,
  },
  iconAndTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 3,
  },
  textInfo: {
    fontSize: 12,
    fontWeight: '300',
    textTransform: 'capitalize'
  },
});
