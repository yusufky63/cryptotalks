/* eslint-disable quotes */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState, useCallback} from "react";
import {
  View,
  FlatList,
  Text,
  ToastAndroid,
  PermissionsAndroid,
} from "react-native";
import {formatDistance, parseISO} from "date-fns";
import {tr} from "date-fns/locale";
import {styles} from "./Chat.style";
import {GiftedChat, Send, Actions} from "react-native-gifted-chat";
import Clipboard from "@react-native-clipboard/clipboard";
import auth from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";
import MessageCard from "../../components/MessageCard";
import MessageTextModal from "../../modal/MessageTextModal";
import database from "@react-native-firebase/database";
import firestore from "@react-native-firebase/firestore";
import {ActivityIndicator} from "react-native";
import {launchCamera, launchImageLibrary} from "react-native-image-picker";
import storage from "@react-native-firebase/storage";
import ErrorMessages from "../../utils/ErrorMessages";
import {ErrorShowMessage} from "../../utils/ErrorShowMessage";
function Chat({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const room = route.params;

  useEffect(() => {
    navigation.setOptions({title: route.params.name});

    return firestore()
      .doc(`ChatRooms/` + room.id)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.data()?.messages ?? []);
      });
  }, [room.id]);

  const handleUploadImage = (image) => {
    const uploadTask = storage()
      .ref(`images/${image.fileName}`)
      .putFile(image.uri);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case storage.TaskState.PAUSED:
            console.log("Upload is paused");
            break;
          case storage.TaskState.RUNNING:
            console.log("Upload is running");

            break;
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
          onSend([
            {
              _id: Math.round(Math.random() * 1000000),
              image: downloadURL,
              createdAt: new Date(),
              user: {
                _id: auth().currentUser.uid,
                name: auth().currentUser.displayName,
              },
            },
          ]);
        });
      }
    );
  };

  const handleSelectImage = () => {
    launchImageLibrary({mediaType: "photo"}, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.error) {
        console.log("ImagePicker Error: ", response.error);
      } else if (response.customButton) {
        console.log("User tapped custom button: ", response.customButton);
      } else {
        handleUploadImage(response.assets[0]);
      }
    });
  };

  const onSend = (m = []) => {
    firestore()
      .doc("ChatRooms/" + room.id)
      .set(
        {
          messages: GiftedChat.append(messages, m),
        },
        {merge: true}
      );
  };

  // const renderItem = ({item}) => <MessageCard message={item} />;

  return (
    <View style={{flex: 1, backgroundColor: "white"}}>
      <GiftedChat
        messages={messages.map((x) => ({
          ...x,
          createdAt: x.createdAt?.toDate(),
        }))}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: auth().currentUser.uid,
          name: auth().currentUser.displayName,
          avatar: auth().currentUser.photoURL,
        }}
        showAvatarForEveryMessage={true}
        isTyping={true}
        placeholder="Mesajınızı yazın..."
        alwaysShowSend={true}
        timeFormat="HH:mm"
        renderUsernameOnMessage={true}
        renderAvatarOnTop={true}
        ActivityIndicator={true}
        renderSend={(props) => (
          <Send
            {...props}
            containerStyle={{
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Icon name="send" size={25} color="#2e64e5" />
          </Send>
        )}
        renderActions={(props) => (
          <Actions
            {...props}
            containerStyle={{
              height: 50,
              width: 50,
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 0,
            }}
            options={{
              "Galeriden Gönder": handleSelectImage,
              "Kameradan Gönder": handleSelectImage,
              İptal: () => {},
            }}
            icon={() => <Icon name="plus" size={25} color="#2e64e5" />}
            optionTintColor="#222B45"
          />
        )}
      />
    </View>
  );
}

export default Chat;
