/* eslint-disable prettier/prettier */
import {Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from './MessageCard.style';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';
import auth from '@react-native-firebase/auth';
function MessageCard({message}) {
  const [theme, setTheme] = useState('primary');
  const formattedDate = formatDistance(
    parseISO(message.createdAt),
    new Date(),
    {
      addSuffix: true,
      locale: tr,
    }
  );
  function displayName(name) {
    if (name === auth().currentUser.email) {
      return 'Sen';
    }
    return name;
  }

  useEffect(() => {
    if (message.createdName+"@gmail.com" === auth().currentUser.email) {
      setTheme('secondary');
    }
  }, []);

  return (
    <View style={styles[theme].container}>
      <Text style={styles[theme].title}>
        {displayName(message.createdName)}
      </Text>
      <Text style={styles[theme].text}>{message.text}</Text>
      <Text style={styles[theme].date}>{formattedDate}</Text>
    </View>
  );
}

export default MessageCard;
