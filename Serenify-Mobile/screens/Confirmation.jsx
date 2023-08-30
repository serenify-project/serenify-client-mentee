import { View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import VideoCallScreen from "./VideoCallScreen"

export default function ConfirmationScreen(){
    return (
        <SafeAreaView>
        <View>
            <Text>Con</Text>
            <Text>Yes</Text>
            <Text>No</Text>
        </View>
        <View>
            <VideoCallScreen/>
        </View>
        </SafeAreaView>
        
    )   
}