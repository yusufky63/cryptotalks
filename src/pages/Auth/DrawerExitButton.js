import React from "react";
import {View, Text, Alert, Pressable} from "react-native";

import auth from "@react-native-firebase/auth";

const CustomSidebarMenu = ({navigation}) => {
  return (
    <>
      {Alert.alert(
        "Çıkış",
        "Çıkış yapmak istediğinize emin misiniz?",
        [
          {
            text: "Hayır",
            onPress: () => navigation.navigate("ChatRoomsScreen"),
            style: "cancel",
          },
          {text: "Evet", onPress: () => auth().signOut()},
        ],
        {cancelable: false}
      )}
    </>
  );
};

export default CustomSidebarMenu;
