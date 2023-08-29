// import { View, StyleSheet, Text, Button, TextInput } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { API_URL } from "../config/api";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import React, { useEffect, useState, useCallback } from "react";
// import Daily, {
//   DailyMediaView,
//   DailyEventObjectParticipant,
// } from "@daily-co/react-native-daily-js";

// export default function VideoCallScreen() {
//   const [videoTrack, setVideoTrack] = useState();
//   const [callObject, setCallObject] = useState();
//   const [inCall, setInCall] = useState(false);
//   const [roomUrl, setRoomUrl] = useState(ROOM_URL_TEMPLATE);
//   const [remoteParticipantCount, setRemoteParticipantCount] = useState(0);

//   const handleNewParticipantsState = (event) => {
//     const participant = event.participant;
//     // Early out as needed to avoid display the local participant's video
//     if (participant.local) {
//       return;
//     }
//     const videoTrack = participant.tracks.video;
//     setVideoTrack(videoTrack.persistentTrack);
//     // Set participant count minus the local participant
//     setRemoteParticipantCount(callObject.participantCounts().present - 1);
//   };

//   const joinRoom = () => {
//     console.log("Joining room");
//     callObject.join({
//       url: roomUrl,
//     });
//   };

//   const leaveRoom = async () => {
//     console.log("Leaving the room");
//     await callObject.leave();
//   };

//   // Create the callObject and join the meeting
//   useEffect(() => {
//     const callObject = Daily.createCallObject();
//     setCallObject(callObject);
//     return () => {};
//   }, []);

//   //Add the listeners
//   useEffect(() => {
//     if (!callObject) {
//       return;
//     }
//     callObject
//       .on("joined-meeting", () => setInCall(true))
//       .on("left-meeting", () => setInCall(false))
//       .on("participant-joined", handleNewParticipantsState)
//       .on("participant-updated", handleNewParticipantsState)
//       .on("participant-left", handleNewParticipantsState);
//     return () => {};
//   }, [callObject]);

//   async function createRoom() {
//     const value = await AsyncStorage.getItem("access_token");
//     console.log(value);
//     try {
//       const response = await fetch(`${API_URL}/rooms`, {
//         method: "post",
//         headers: {
//           "Content-Type": "application/json",
//           access_token: value,
//         },
//       });
//       console.log(await response.json(), 11);
//       const room = await response.json();
//       const roomUrl = room.url;
//     } catch (err) {
//       console.log(err);
//     }
//   }

//   const ROOM_URL_TEMPLATE = "https://YOUR_DOMAIN.daily.co/YOUR_ROOM";
//   return (
//     // <SafeAreaView>
//     //   <View>
//     //     <TouchableOpacity onPress={() => createRoom()}>
//     //       <Image></Image>
//     //       <Text>Session with kak Afi</Text>
//     //       <Text>
//     //         One on one session in 60 minutes with kak Afi, make you feel better
//     //       </Text>
//     //       <Text>Female</Text>
//     //       <Text>Room available</Text>
//     //       <Text>2023, Aug 28, 19.00 WIB</Text>
//     //       <Text>Join</Text>
//     //     </TouchableOpacity>
//     //   </View>
//     // </SafeAreaView>

//     <SafeAreaView style={styles.safeArea}>
//       {inCall ? (
//         <View style={styles.inCallContainer}>
//           {remoteParticipantCount > 0 ? (
//             <DailyMediaView
//               videoTrack={videoTrack}
//               mirror={false}
//               objectFit="cover"
//               style={styles.dailyMediaView}
//             />
//           ) : (
//             <View style={styles.infoView}>
//               <Text>No one else is in the call yet!</Text>
//               <Text>Invite others to join the call using this link:</Text>
//               <Text>{roomUrl}</Text>
//             </View>
//           )}
//           <Button
//             style={styles.controlButton}
//             onPress={() => leaveRoom()}
//             title="Leave call"
//           ></Button>
//         </View>
//       ) : (
//         <View style={styles.outCallContainer}>
//           <View style={styles.infoView}>
//             <Text>Not in a call yet</Text>
//             <TextInput
//               style={styles.roomUrlInput}
//               value={roomUrl}
//               onChangeText={(newRoomURL) => {
//                 setRoomUrl(newRoomURL);
//               }}
//             />
//             <Button
//               style={styles.controlButton}
//               onPress={() => joinRoom()}
//               title="Join call"
//             ></Button>
//           </View>
//         </View>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   safeArea: {
//     flex: 1,
//     backgroundColor: "#f7f9fa",
//     width: "100%",
//   },
//   outCallContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   inCallContainer: {
//     position: "absolute",
//     width: "100%",
//     height: "100%",
//   },
//   dailyMediaView: {
//     flex: 1,
//     aspectRatio: 9 / 16,
//   },
//   roomUrlInput: {
//     borderRadius: 8,
//     marginVertical: 8,
//     padding: 12,
//     fontStyle: "normal",
//     fontWeight: "normal",
//     borderWidth: 1,
//     width: "100%",
//   },
//   infoView: {
//     flex: 1,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   controlButton: {
//     flex: 1,
//   },
// });
