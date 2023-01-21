/* eslint-disable prettier/prettier */
import {Text, View, TouchableOpacity} from "react-native";
import React, {useState} from "react";
import {useNavigation} from "@react-navigation/native";
import {styles} from "./ChatRoomCard.style";

import auth from "@react-native-firebase/auth";
import ChatPasswordInput from "../../modal/ChatPasswordInput";

import database from "@react-native-firebase/database";
import {ErrorShowMessage} from "../../utils/ErrorShowMessage";
function ChatRoomCard({room}) {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);

  const [roomPassword, setRoomPassword] = useState("");

  function userControl() {
    database()
      .ref(`ChatRooms/${room.id}/users`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const user = Object.values(data).find(
            (user) => user.uid === auth().currentUser.uid
          );
          if (user) {
            database()
              .ref(`ChatRooms/${room.id}/users`)
              .push({
                uid: auth().currentUser.uid,
                name: auth().currentUser.email.slice("@", 0),
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
      handleToggleInput();
      navigation.navigate("ChatScreen", room);
    } else {
      ErrorShowMessage("Hatalı şifre girdiniz!", "danger");
    }
  }
  console.log("111111111111111111111111111111111111", room.users);
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
          Katılımcı Sayısı: {room.users ? room.users.length : "1"}
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
