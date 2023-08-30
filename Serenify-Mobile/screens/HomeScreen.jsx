import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { themeColors } from "../themes";
import CardCarousel from "../components/CardCarousel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { fetchPackages } from "../stores/actions/actionCreators.js/package";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/api";
import ScheduleCard from "../components/SheduleCard";
import { Entypo } from '@expo/vector-icons';
export default function HomeScreen({ route }) {
  const params = route?.params?.params
  const [isSubscriber, setIsSubscriber] = useState(false);
  const [username, setUsername] = useState("")
  const [scheduleMentor, setScheduleMentor] = useState([])
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { packages, packagesLoading } = useSelector((state) => state.package);

  const renderItem = ({ item }) => < ScheduleCard style={{ flex: 1 }} data={item} />;

  const getMentorSchedule = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/schedules`, {
        method: "get",
        headers: {
          access_token: token,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log({data}, "mentor")
        setScheduleMentor(data);
      } else {
        throw Error("response not ok");
      }
    } catch (err) {
      // error reading value
      console.log(err);
    }
  }

  const getData = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/users/trx`, {
        method: "get",
        headers: {
          access_token: token,
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log({data}, "<<<<")
        setIsSubscriber(data);
      } else {
        throw Error("response not ok");
      }
    } catch (err) {
      // error reading value
      console.log(err);
    }
  };

  const getName = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      const response = await fetch(`${API_URL}/users/detail`, {
        method: "get",
        headers: {
          access_token: token,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUsername(data.username);
      } else {
        throw Error("response name not ok");
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    dispatch(fetchPackages());
    getName() 
    getData()
    getMentorSchedule()
  }, [params]);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData()
    })

    return unsubscribe
  }, [navigation])

  return (
    <SafeAreaProvider
      className="flex-1"
      style={{ backgroundColor: themeColors.bg, flex: 1}}
    >
      <SafeAreaView >
        <View className="flex-row justify-between items-center mx-4" style={{}}>
          {/* Replace with username */}
          <Text className="text-[#1A1B4B] mr-4  text-base" style={{textTransform: "capitalize"}}>Hello, {username} </Text>
        </View>
        {isSubscriber ? (
          <View style={{ height: "100%", position: "relative"}}>
            <FlatList 
              data={scheduleMentor}
              renderItem={renderItem}
              keyExtractor={(item) => String(item.id)}
            />
            <View style={styles.container}>
              <TouchableOpacity
                  onPress={() => navigation.navigate("Chat")}
                  style={styles.chatButton}
              >
                  <Entypo name="chat" size={35}  />
              </TouchableOpacity>
          </View>
        </View>
        ) : ( <CardCarousel data={packages}/>)}
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
      position: "absolute",
      right: 0,
      bottom: 0
  },
  chatButton: {
      height: 50,
      width: 50,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: {
          width: 0,
          height: 2,
      },
      shadowRadius: 8,
      marginRight: 20,
      marginBottom: "20%",
  }
});
