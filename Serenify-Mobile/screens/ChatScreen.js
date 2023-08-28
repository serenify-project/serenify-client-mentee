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

export default function ChatScreen() {
  const [messages, setMessages] = useState([]);
  const navigation = useNavigation();
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        textStyle={{
          right: {
            color: "white",
          },
          left: {
            color: "white",
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: "#FF901C",
          },
          left: {
            backgroundColor: "#1A1B4B",
          },
        }}
      />
    );
  };

  useLayoutEffect(() => {
    const collectionRef = collection(database, "chats");
    const q = query(collectionRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      console.log("querySnapshot unsusbscribe");
      setMessages(
        querySnapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        })),
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
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      // user={{
      //   _id: currentUser.uid,
      //   name: currentUser.displayName,
      // }}
      messagesContainerStyle={{
        backgroundColor: "white",
      }}
      renderBubble={renderBubble}
      renderUsernameOnMessage={true}
    />
  );
}
