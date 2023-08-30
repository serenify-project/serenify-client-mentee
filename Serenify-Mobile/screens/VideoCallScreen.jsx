import { WebView } from "react-native-webview";

export default function VideoCallScreen({ route }) {
  const room = route?.params
  return (
    <WebView source={{ uri: room }} style={{flex: 1}} />
  );
}
