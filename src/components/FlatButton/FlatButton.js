import {Text, TouchableOpacity, View} from "react-native";
import React from "react";
import {styles} from "./FlatButton.style";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

function FlatButton({onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View>
        <Icon name="plus" size={25} color="green" />
      </View>
    </TouchableOpacity>
  );
}

export default FlatButton;
