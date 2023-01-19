import { View, TouchableOpacity, Text } from "react-native";
import React from "react";

import styles from "./Button.style";

const Button = ({ title, onPress, IconName, theme = "primary" }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles[theme].container}
      activeOpacity={0.6}
      underlayColor="#DDDDDD"
    >
      {IconName && <IconName name="google" size={20} color="red" />}
      <Text style={styles[theme].title}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
