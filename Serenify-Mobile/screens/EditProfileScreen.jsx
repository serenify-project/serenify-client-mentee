import React, { useState } from "react";
import Form from "../components/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../config/api";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
export default function EditProfileScreen({ route, navigation }) {
  const populatedData = route?.params
  const [form, setForm] = useState(populatedData);

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('access_token')
      const response = await fetch(`${API_URL}/users/edit`, {
        method: 'put',
        headers: {
          "Content-Type": "application/json",
          access_token: token
        },
        body: JSON.stringify({
          username: form.username,
          gender: form.gender,
          birthDate: form.birthDate,
        })
      })
      if (response.ok) {
        navigation.navigate("Profile");
      } else {
        throw Error('response not ok')
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <SafeAreaProvider style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <BackButton />
        <Form
          title={"Edit Profile"}
          data={form}
          isEditPage={true}
          handleChange={setForm}
          handleSubmit={handleSubmit}
          isEdit
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
