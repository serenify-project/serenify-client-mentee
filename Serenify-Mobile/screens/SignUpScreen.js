import { View, Text } from "react-native";
import React, { useState } from "react";
import Form from "../components/Form";
export default function SignUpScreen() {
  const [user, setUser] = useState({
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
    console.log(user);
  };
  return (
    <Form data={user} handleChange={handleChange} handleSubmit={handleSubmit} />
  );
}
