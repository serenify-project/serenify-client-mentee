import { View, Text } from "react-native";
import React, { useState } from "react";
import Form from "../components/Form";
import { register } from "../stores/actions/actionCreators.js/user";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
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
  const handleChange = (field, value) => {
    setUser((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };
  // Pemanggilan API (trycatch)
  const handleSubmit = (event) => {
    console.log(user, "<<< DARI SCREEN REGISTER");
    dispatch(register(user));
  };
  return (
    <Form data={user} handleChange={handleChange} handleSubmit={handleSubmit} />
  );
}
