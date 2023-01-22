/* eslint-disable quotes */
/* eslint-disable no-shadow */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from "react";
import {
  View,
  Text,
  Switch,
  StyleSheet,
  ActivityIndicator,
  Clipboard,
} from "react-native";
import {
  GiftedChat,
  Send,
  Actions,
  InputToolbar,
  Bubble,
  SystemMessage,
  Composer,
  MessageText,
} from "react-native-gifted-chat";
import auth from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/Ionicons";
import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import {launchImageLibrary, launchCamera} from "react-native-image-picker";
import {IconButton} from "react-native-paper";

function Chat({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const room = route.params;

  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    console.log(room);
    navigation.setOptions({title: route.params.name});

    return firestore()
      .doc(`ChatRooms/` + room.id)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.data()?.messages ?? []);
      });
  }, [navigation, room, room.id, route.params.name]);

  const handleUploadImage = async (image) => {
    console.log("Resim", image);
    const uploadTask = await storage()
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
          firestore()
            .doc("ChatRooms/" + room.id)
            .set(
              {
                messages: GiftedChat.append(messages, {
                  _id: Math.random().toString(36).substring(7),
                  text: "",
                  createdAt: new Date(),
                  user: {
                    _id: auth().currentUser.uid,
                    name: auth().currentUser.displayName,
                    avatar: auth().currentUser.photoURL,
                  },
                  image: downloadURL,
                }),
              },
              {merge: true}
            );
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

  function renderLoading() {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6646ee" />
        <Text>Yükleniyor</Text>
      </View>
    );
  }

  function scrollToBottomComponent() {
    return (
      <View style={styles.bottomComponentContainer}>
        <IconButton icon="chevron-double-down" size={36} color="#6646ee" />
      </View>
    );
  }

  const customtInputToolbar = (props) => {
    return (
      <InputToolbar
        {...props}
        containerStyle={{
          backgroundColor: "white",
          borderTopColor: "#E8E8E8",
          borderTopWidth: 1,
          padding: 3,
        }}
      />
    );
  };

  const handleTakePhoto = () => {
    launchCamera({mediaType: "photo"}, (response) => {
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

  const handleInputTextChanged = (text) => {
    if (text.length > 0) {
      firestore().collection("ChatRooms").doc(room.id).update({
        typing: true,
      });
      setIsTyping(true);
    } else {
      firestore().collection("ChatRooms").doc(room.id).update({
        typing: false,
      });
      setIsTyping(false);
    }
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
        renderLoading={renderLoading}
        showAvatarForEveryMessage={true}
        isTyping={isTyping}
        placeholder="Mesajınızı yazın..."
        renderUserName
        alwaysShowSend={true}
        timeFormat="HH:mm"
        renderUsernameOnMessage
        renderAvatarOnTop={true}
        // renderChatEmpty={() => (
        //   <View
        //     style={{alignItems: "center", justifyContent: "center", flex: 1}}
        //   >
        //     <Text style={{fontSize: 18, color: "#2e64e5", fontWeight: "bold"}}>
        //       Burada hiç mesaj yok
        //     </Text>
        //   </View>
        // )}
        ActivityIndicator={true}
        renderInputToolbar={customtInputToolbar}
        onInputTextChanged={handleInputTextChanged}
        sent={true}
        scrollToBottom
        pending={true}
        received={true}
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
        scrollToBottomComponent={scrollToBottomComponent}
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
              "Fotoğraf Çek": handleTakePhoto,

              İptal: () => {},
            }}
            icon={() => <Icon name="attach-sharp" size={25} color="#2e64e5" />}
            optionTintColor="#222B45"
          />
        )}
      />
    </View>
  );
}

export default Chat;

const styles = StyleSheet.create({
  // rest remains same
  bottomComponentContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  sendingContainer: {
    justifyContent: "center",
    alignItems: "center",
  },

  systemMessageWrapper: {
    backgroundColor: "#6646ee",
    borderRadius: 4,
    padding: 5,
  },
  systemMessageText: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },
});
