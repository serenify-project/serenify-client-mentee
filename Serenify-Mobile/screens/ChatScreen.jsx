import { View, Text, TouchableOpacity } from "react-native";
// import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import React, {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
} from "react";
import { GiftedChat, Bubble } from "react-native-gifted-chat";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  addDoc,
  orderBy,
  query,
  onSnapshot,
} from "firebase/firestore";
import * as firebase from "firebase/app";
import { auth, database } from "../config/firebase";
import { AntDesign } from "@expo/vector-icons";
import { API_URL } from "../config/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const [user, setUser] = useState({})
  const navigation = useNavigation();
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "black",
          },
          left: {
            color: "black",
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: "#ffbd90",
          },
          left: {
            backgroundColor: "white",
          },
        }}
      />
    );
  };

  useEffect(() => {
    async function getUser() {
      try {
        const access_token = await AsyncStorage.getItem('access_token')
        const response = await fetch(`${API_URL}/users/detail`, {
          method: 'get',
          headers: {
            access_token
          }
        })
        const userDetail = await response.json()
        setUser(userDetail)
      } catch (error) {
        console.log(error)
      }
    }
    getUser()
  }, [])

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setMessages(
        querySnapshot.docs.map((doc) => {
          return ({
            _id: doc.data()._id,
            createdAt: doc.data().createdAt.toDate(),
            text: doc.data().text,
            user: doc.data().user,
          })
        }),
      );
    });
    return unsubscribe;
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages),
    );
    // setMessages([...messages, ...messages]);
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(database, "chats"), {
      _id,
      createdAt,
      text,
      user,
    });
  }, []);

  return ( 
    <SafeAreaView style={{ flex: 1 }}>
    {user &&
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth?.currentUser?.email,
          // avatar: "https://i.pravatar.cc/300",
          name: user.username
        }}
        showAvatarForEveryMessage={true}
        showUserAvatar={true}
        messagesContainerStyle={{
          backgroundColor: "#F2F3F2",
        }}
        renderBubble={renderBubble}
        renderUsernameOnMessage={true}
      />
    }
    </SafeAreaView>
  );
}
