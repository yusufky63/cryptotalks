import {Text, View} from "react-native";
import React from "react";
import {styles} from "./ChatRoomsAddInput.style";
import Input from "../../components/Input";
import Modal from "react-native-modal";
import Button from "../../components/Button";
function ChatRoomsAddInput({
  isVisible,
  handleToggleInput,
  handleCreateRoom,
  roomName,
  roomPassword,
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
        <Input placeholder={"Oda ismi"} onChangeText={roomName} />
        <Input
          placeholder={"Oda Şifresi (isteğe bağlı)"}
          secureTextEntry={true}
          onChangeText={setRoomPassword}
          value={roomPassword}
        />
        <Button title="Oda Kur" onPress={handleCreateRoom} theme="secondary" />
        <Button title="İptal" onPress={handleToggleInput} theme="primary" />
      </View>
    </Modal>
  );
}

export default ChatRoomsAddInput;
