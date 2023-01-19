import {Text, View} from "react-native";
import React from "react";
import {styles} from "./MessageTextModal.style";
import Input from "../../components/Input";
import Modal from "react-native-modal";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";

function MessageTextModal({SendMessage, setMessage}) {
  return (
    <View style={styles.container}>
      <View style={styles.container_body}>
        <Input
          placeholder={"Mesajınızı Girin"}
          secureTextEntry={false}
          onChangeText={setMessage}
        />
      </View>

      <Button
        title={<Icon name={"send"} size={30} />}
        onPress={SendMessage}
        theme="secondary"
      />
    </View>
  );
}

export default MessageTextModal;
