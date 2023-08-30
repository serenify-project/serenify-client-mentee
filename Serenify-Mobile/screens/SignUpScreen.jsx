import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import Form from "../components/Form";
import { register } from "../stores/actions/actionCreators.js/user";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { API_URL } from "../config/api";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function SignUpScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    gender: "",
    birthDate: "",
  });

  const handleRegistration = async () => {
    console.log("register", user, "<<<<<");

    // regis firebase
    if (user.email !== "" && user.password !== "") {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((result) => {
          const userToRegister = { ...user };
          console.log(result);
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
    console.log(user, 1212);
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
      // console.log(await response.json());
      if (response.ok) {
        // Registration successful
        console.log("Registration successful");
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
    <Form
      title={"Sign Up"}
      data={user}
      isEditPage={false}
      handleChange={setUser}
      handleSubmit={handleRegistration}
    />
  );
}
