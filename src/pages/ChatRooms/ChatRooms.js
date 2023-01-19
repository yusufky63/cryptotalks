/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {Text, View, FlatList} from "react-native";
import auth from "@react-native-firebase/auth";
import React, {useEffect, useState} from "react";
import ChatRoomsAddInput from "../../modal/ChatRoomsAddInput";
import FlatButton from "../../components/FlatButton";
import {styles} from "./ChatRooms.style";
import parseContentData from "../../utils/parseContentData";
import database from "@react-native-firebase/database";
import ChatRoomCard from "../../components/ChatRoomCard";
import ChatPasswordInput from "../../modal/ChatPasswordInput";

function ChatRooms({navigation}) {
  const [isVisible, setIsVisible] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [roomName, setRoomName] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  useEffect(() => {
    getChatRooms();
  }, []);

  function getChatRooms() {
    database()
      .ref("/ChatRooms")
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const parsedData = parseContentData(data);
          setChatRooms(parsedData);
        }
      });
  }

  function handleToggleInput() {
    setIsVisible(!isVisible);
  }

  function handleCreateRoom() {
    console.log(roomName);
    database()
      .ref("/ChatRooms")
      .push({
        createdName: auth().currentUser.email,
        name: roomName,
        users: [{uid: auth().currentUser.uid, name: auth().currentUser.email}],
        password: roomPassword,
        createdAt: new Date().toISOString(),
        Messages: [
          {text: "Oda Oluşturuldu", createdAt: new Date().toISOString()},
        ],
      });
    handleToggleInput();
  }

  const renderItem = ({item}) => <ChatRoomCard room={item} />;

  return (
    <View style={styles.container}>
      <FlatList data={chatRooms} renderItem={renderItem} />
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
