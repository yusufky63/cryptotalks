/* eslint-disable prettier/prettier */
/* eslint-disable no-unused-vars */
import {Button, View, FlatList} from "react-native";
import auth from "@react-native-firebase/auth";
import React, {useEffect, useState} from "react";
import ChatRoomsAddInput from "../../modal/ChatRoomsAddInput";
import FlatButton from "../../components/FlatButton";
import {styles} from "./ChatRooms.style";
import parseContentData from "../../utils/parseContentData";
import database from "@react-native-firebase/database";
import ChatRoomCard from "../../components/ChatRoomCard";

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
    database()
      .ref("/ChatRooms")
      .push({
        createdName: auth().currentUser.email.split("@")[0],
        name: roomName,
        users: [{}],
        password: roomPassword,
        createdAt: new Date().toISOString(),
        Messages: [{}],
      });
    handleToggleInput();
  }

  const renderItem = ({item}) => <ChatRoomCard room={item} />;

  return (
    <View style={styles.container}>
      <FlatList removeClippedSubviews={false} data={chatRooms} renderItem={renderItem} />
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
