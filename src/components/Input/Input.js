import React from "react";
import {View, TextInput} from "react-native";
import {styles} from "./Input.style";
function Input({onChangeText, placeholder, secureTextEntry}) {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
       
      />
    </View>
  );
}

export default Input;
