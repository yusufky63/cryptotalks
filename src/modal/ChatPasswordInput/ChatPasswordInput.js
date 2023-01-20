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
        <Text style={styles.title}>Oda Şifresi</Text>
        <Input
          autoFocus={true}
          placeholder={"Şifreyi Giriniz (Şifreli ise)"}
          secureTextEntry={false}
          onChangeText={setRoomPassword}
        />
        <View style={styles.container_inner}>
          <Button title="Katıl" onPress={handleJoinRoom} theme="secondary" />
          <Button title="Geri" onPress={handleToggleInput} theme="primary" />
        </View>
      </View>
    </Modal>
  );
}

export default ChatPasswordInput;
