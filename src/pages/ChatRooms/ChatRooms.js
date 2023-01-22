/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {Button, View, FlatList, Text} from "react-native";
import auth from "@react-native-firebase/auth";
import React, {useEffect, useState} from "react";
import ChatRoomsAddInput from "../../modal/ChatRoomsAddInput";
import FlatButton from "../../components/FlatButton";
import {styles} from "./ChatRooms.style";
import parseContentData from "../../utils/parseContentData";
import database from "@react-native-firebase/database";
import ChatRoomCard from "../../components/ChatRoomCard";
import firestore from "@react-native-firebase/firestore";
import {ErrorShowMessage} from "../../utils/ErrorShowMessage";
import ErrorMessages from "../../utils/ErrorMessages";

function ChatRooms({navigation}) {
  const [isVisible, setIsVisible] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  useEffect(() => {
    getChatRooms();
  }, []);


  function getChatRooms() {
    firestore()
      .collection("ChatRooms")
      .onSnapshot((snapshot) => {
        const rooms = snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        });
        setChatRooms(rooms);
      });
  }

  function handleToggleInput() {
    setIsVisible(!isVisible);
  }

  function handleCreateRoom() {
    firestore()
      .collection("ChatRooms")
      .add({
        createdName: auth().currentUser.email,
        name: roomName,
        users: [
          {
            email: auth().currentUser.email,
            name: auth().currentUser.displayName,
            joinedAt: new Date().toISOString(),
          },
        ],
        isSecure: roomPassword ? true : false,
        password: roomPassword,
        createdAt: new Date().toISOString(),
      })

      .then(() => {
        ErrorShowMessage("Başarılı", "success");
      })
      .catch((error) => {
        ErrorShowMessage(ErrorMessages[error.code], "danger");
      });

    handleToggleInput();
  }
  console.log(auth().currentUser.displayName);
  const renderItem = ({item}) => <ChatRoomCard room={item} />;

  return (
    <View style={styles.container}>
      {!chatRooms.length > 0 && (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Oda Yok</Text>
        </View>
      )}
      <FlatList
        removeClippedSubviews={false}
        data={chatRooms}
        renderItem={renderItem}
      />
      <FlatButton onPress={handleToggleInput} />
      <ChatRoomsAddInput
        isVisible={isVisible}
        roomName={setRoomName}
        roomPassword={roomPassword}
        setRoomPassword={setRoomPassword}
        handleCreateRoom={handleCreateRoom}
        handleToggleInput={handleToggleInput}
      />
    </View>
  );
}

export default ChatRooms;
