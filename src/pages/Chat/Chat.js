/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from "react";
import {View, FlatList, Text} from "react-native";
import {formatDistance, parseISO} from "date-fns";
import {tr} from "date-fns/locale";
import {styles} from "./Chat.style";

import auth from "@react-native-firebase/auth";
import database from "@react-native-firebase/database";
import parseContentData from "../../utils/parseContentData";
import MessageCard from "../../components/MessageCard";
import MessageTextModal from "../../modal/MessageTextModal";
import {ActivityIndicator} from "react-native";

function Chat({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const room = route.params;

  const formattedDate = formatDistance(parseISO(room.createdAt), new Date(), {
    addSuffix: true,
    locale: tr,
  });

  useEffect(() => {
    navigation.setOptions({title: route.params.name});

    setLoading(true);
    getMessages();
    setLoading(false);
  }, []);

  function handleRefresh() {
    getMessages();
  }

  function getMessages() {
    console.log("getMessages");
    database()
      .ref(`/ChatRooms/${room.id}/Messages`)
      .on("value", (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const parsedData = parseContentData(data);
          setMessages(parsedData);
        }
      });
  }

  function handleSend() {
    console.log("send istek");
    database()
      .ref(`/ChatRooms/${room.id}/Messages`)
      .push({
        text: message,
        createdAt: new Date().toISOString(),
        createdName: auth().currentUser.email.split("@")[0],
      });
    console.log("send gödenrildi");
    getMessages();
    this.flatListRef.scrollToEnd({animated: true});

    setMessage("");
  }

  const renderItem = ({item}) => <MessageCard message={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Oluşturan: {room.createdName} </Text>
        <Text style={styles.headerText}>
          Oluşturulma Tarihi: {formattedDate}
        </Text>
      </View>
      <View style={styles.flatList}>
        <FlatList
          ref={(ref) => {
            this.flatListRef = ref;
          }}
          onRefresh={handleRefresh}
          refreshing={loading}
          scrollEnabled={true}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.createdAt}
        />
      </View>
      <MessageTextModal
        SendMessage={handleSend}
        setMessage={setMessage}
        message={message}
      />
    </View>
  );
}

export default Chat;
