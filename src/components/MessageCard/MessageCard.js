/* eslint-disable prettier/prettier */
import {Text, View} from "react-native";
import React, {useState, useEffect} from "react";
import styles from "./MessageCard.style";
import {formatDistance, parseISO} from "date-fns";
import {tr} from "date-fns/locale";
import auth from "@react-native-firebase/auth";
import Icon from "react-native-vector-icons/FontAwesome";
function MessageCard({message}) {
  const [theme, setTheme] = useState("secondary");
  const formattedDate = formatDistance(
    parseISO(message.createdAt),
    new Date(),
    {
      addSuffix: true,
      locale: tr,
    }
  );
  function displayName(name) {
    if (name === auth().currentUser.displayName) {
      return "Sen";
    }
    return name;
  }

  useEffect(() => {
    if (message.createdBy === auth().currentUser.displayName) {
      setTheme("primary");
    }
  }, []);

  return (
    <View style={styles[theme].container}>
      {theme === "secondary" && (
        <View style={styles.avatar}>
          <Icon name="user" size={20} color="#900" />
        </View>
      )}
      <View style={styles.container_inner}>
        <Text style={styles[theme].title}>
          {displayName(message.createdBy)}
        </Text>
        <Text style={styles[theme].text}>{message.text}</Text>
        <Text style={styles[theme].date}>{formattedDate}</Text>
      </View>
    </View>
  );
}

export default MessageCard;
