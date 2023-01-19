import {Text, View} from "react-native";
import React from "react";
import {styles} from "./ChatPasswordInput.style";
import Input from "../../components/Input";
import Modal from "react-native-modal";
import Button from "../../components/Button";
function ChatPasswordInput({
  isVisible,
  handleToggleInput,
  handleJoinRoom,
  setRoomPassword,
}) {
  return (
    <Modal
      style={styles.modal}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      onBackdropPress={handleToggleInput}
      onBackButtonPress={handleToggleInput}
      visible={isVisible}
    >
      <View style={styles.container}>
        <Input
          placeholder={"Oda Şifresi"}
          secureTextEntry={false}
          onChangeText={setRoomPassword}
        />
        <Button title="Katıl" onPress={handleJoinRoom} theme="secondary" />
      </View>
    </Modal>
  );
}

export default ChatPasswordInput;
