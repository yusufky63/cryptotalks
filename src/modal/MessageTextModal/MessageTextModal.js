import {View} from "react-native";
import React from "react";
import {styles} from "./MessageTextModal.style";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Icon from "react-native-vector-icons/FontAwesome";

function MessageTextModal({SendMessage, setMessage, message}) {
  return (
    <View style={styles.container}>
      <View style={styles.container_body}>
        <Input
          placeholder={"Mesajınızı Girin"}
          secureTextEntry={false}
          onChangeText={setMessage}
          value={message}
        />
      </View>
      <View style={styles.container_footer}>
        <Button
          title={<Icon name={"send"} size={30} />}
          onPress={SendMessage}
          theme="secondary"
        />
      </View>
    </View>
  );
}

export default MessageTextModal;
