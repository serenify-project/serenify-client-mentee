import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { ArrowLeftIcon } from "react-native-heroicons/solid";

export default function BackButton() {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className=" p-2 rounded-tr-2xl rounded-bl-2xl ml-4"
    >
      <ArrowLeftIcon size="20" color="black" />
    </TouchableOpacity>
  );
}
