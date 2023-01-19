/* eslint-disable prettier/prettier */
import {Text, View, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {styles} from "./ChatRoomCard.style";
import {formatDistance, parseISO} from "date-fns";
import {tr} from "date-fns/locale";
import auth from "@react-native-firebase/auth";
import ChatPasswordInput from "../../modal/ChatPasswordInput";
import {useNavigation} from "@react-navigation/native";
import database from "@react-native-firebase/database";
function ChatRoomCard({room}) {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  const formattedDate = formatDistance(parseISO(room.createdAt), new Date(), {
    addSuffix: true,
    locale: tr,
  });

  function userControl() {
    database()
      .ref(`ChatRooms/${room.id}/users`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const user = Object.values(data).find(
            (user) => user.uid === auth().currentUser.uid
          );
          if (!user) {
            database().ref(`ChatRooms/${room.id}/users`).push({
              uid: auth().currentUser.uid,
              name: auth().currentUser.displayName,
            });
          }
        }
      });
  }

  function handleToggleInput() {
    setIsVisible(!isVisible);
  }

  function handleJoinRoom() {
    if (room.password === roomPassword) {
      userControl();
      navigation.navigate("ChatScreen", room);
    } else {
      console.log("Şifre yanlış");
    }
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleToggleInput}>
      <View style={styles.container_main}>
        <ChatPasswordInput
          isVisible={isVisible}
          handleToggleInput={handleToggleInput}
          setRoomPassword={setRoomPassword}
          handleJoinRoom={handleJoinRoom}
        />
        {room.password ? (
          <Text style={styles.password}>Şifreli</Text>
        ) : (
          <Text style={styles.nopassword}>Şifresiz</Text>
        )}
        <Text style={styles.title}>{room.name}</Text>
      </View>
      <View style={styles.container_body}>
        <Text style={styles.userCount}>
          Katılımcı Sayısı: {room.users.length}
        </Text>
        <Text style={styles.createdName}>Oluşturan: {room.createdName}</Text>
        {/* <Text style={styles.createdName}>
          Oluşturma Tarihi: {formattedDate}
        </Text> */}
      </View>
    </TouchableOpacity>
  );
}

export default ChatRoomCard;
