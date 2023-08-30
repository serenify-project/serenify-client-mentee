import { View, Text } from "react-native";
import React, { useState } from "react";
import Form from "../components/Form";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  getUserById,
} from "../stores/actions/actionCreators.js/user";
import { useNavigation } from "@react-navigation/native";
export default function EditProfileScreen() {
  const { user } = useSelector((state) => state.user);
  const navigation = useNavigation();
  const [form, setForm] = useState(
    user
      ? {
          username: user.username,
          email: user.email,
          gender: user.gender,
          birthDate: user.birthDate,
        }
      : { username: "", email: "", password: "", gender: "", birthDate: "" }
  );
  const dispatch = useDispatch();
  const handleChange = (field, value) => {
    setForm((prevUser) => ({
      ...prevUser,
      [field]: value,
    }));
  };
  // Pemanggilan API (trycatch)
  const handleSubmit = async (event) => {
    try {
      await dispatch(editUser(form, user.id));
      // setelah submit fetch ulang user berdasarkan id
      await dispatch(getUserById(user.id));
      navigation.navigate("Profile");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Form
    title={"Edit Profile"}
      data={form}
      isEditPage={true}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}
