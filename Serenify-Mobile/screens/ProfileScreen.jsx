import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import React, { useEffect, useState } from "react";
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/api";

export default function ProfileScreen({ navigation }) {
  const [userProfile, setUserProfile] = useState({})

  async function getProfile() {
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
        setUserProfile(data)
      } else {
        throw Error("response name not ok");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const unsubs = navigation.addListener('focus', () => {
      getProfile()
    })

    return unsubs
  }, [navigation])

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('access_token')
      navigation.navigate('Login')
    } catch (error) {
      console.log(error)
    }
  }

  const handleEdit = async () => {
    navigation.navigate('Edit', userProfile)
  }

  useEffect(() => {
    getProfile()
  }, []);
  return (
    <SafeAreaProvider style={styles.container}>
      <SafeAreaView style={styles.container}>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity onPress={handleLogout}>
            <MaterialCommunityIcons name="logout" size={24} color="black" style={{ transform: [{ scaleX: -1 }] }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleEdit}>
            <FontAwesome5 name="edit" size={20} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.avatarContainer}>
          <Image source={require('../assets/DefaultProfile.jpeg')} style={styles.avatar} />
        </View>
        <View style={styles.usernameContainer}>
          <Text style={styles.username}>{userProfile?.username}</Text>
        </View>
        <View style={styles.capsuleContainer}>
          <View style={styles.capsule}>
            <View style={styles.genderContainer}>
              <Text style={styles.field}>Gender</Text>
              <Text style={styles.value}>{userProfile?.gender}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.birthdayContainer}>
              <Text style={styles.field}>Birthday</Text>
              <Text style={styles.value}>{userProfile?.birthDate && `${new Date(userProfile?.birthDate).toLocaleDateString()}`}</Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: 'black'
  },
  avatarContainer: {
    // backgroundColor: 'red',
    alignItems: 'center',
    marginTop: 100,
  },
  birthdayContainer: {
    width: '20%',
    alignItems: 'flex-start',
    marginLeft: 10
  },
  buttonsContainer: {
    // backgroundColor: 'blue',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    paddingVertical: 10
  },
  capsule: {
    // backgroundColor: 'orange',
    flexDirection: 'row',
    borderRadius: 50,
    paddingHorizontal: 30,
    paddingVertical: 10,
    // borderWidth: 1.5,
    justifyContent: 'center'
  },
  capsuleContainer: {
    alignItems: 'center',
    // backgroundColor: 'purple'
  },
  container: {
    flex: 1,
    // backgroundColor: 'yellow'
  },
  field: {
    fontWeight: '600',
    fontSize: 16
  },
  genderContainer: {
    width: '20%',
    alignItems: 'flex-end',
    marginRight: 10
  },
  separator: {
    borderWidth: 0.5,
  },
  username: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '600'
  },
  usernameContainer: {
    alignItems: 'center',
    // backgroundColor: 'green',
    marginTop: 10,
    marginBottom: 20,
  },
  value: {
    fontWeight: '300',
    fontSize: 11,
  },
})
