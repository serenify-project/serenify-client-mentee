import {
  View,
  StyleSheet,
  Text,
  Button,
  TextInput,
  Image,
  TouchableOpacity,
} from "react-native";
import { WebView } from "react-native-webview";

export default function VideoCallScreen(string_url) {
  return (
  <WebView source={{ uri: "https://serenify.daily.co/test" }} />
  );
}

