import { Alert } from "react-native";
import React, { useState } from "react";
import Form from "../components/Form";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../config/api";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
export default function SignUpScreen() {
  const navigation = useNavigation();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
  });

  const handleRegistration = async () => {
    // regis firebase
    if (user.email !== "" && user.password !== "") {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((result) => {
          const userToRegister = { ...user };
          userToRegister.userFirebaseId = result._tokenResponse.localId;
          AsyncStorage.setItem("firebaseToken", result._tokenResponse.idToken);
          return userToRegister;
        })
        .then((user) => {
          console.log(JSON.stringify(user, null, 2));
          handleRegisPostgres(user);
        })
        .catch((err) => Alert.alert("signup error", err.message));
    }
  };

  async function handleRegisPostgres(user) {
    try {
      const response = await fetch(`${API_URL}/users/register`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (response.ok) {
        // Registration successful
        navigation.navigate("Login");
      } else {
        // Registration failed
        console.error("Registration failed");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <BackButton />
        <Form
          title={"Sign Up"}
          data={user}
          isEditPage={false}
          handleChange={setUser}
          handleSubmit={handleRegistration}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
