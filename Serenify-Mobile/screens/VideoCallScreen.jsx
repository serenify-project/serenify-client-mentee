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

export default function VideoCallScreen() {
  return (
  <WebView source={{ uri: "http://serenify.daily.co/test" }} />
  );
}

