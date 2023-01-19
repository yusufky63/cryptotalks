/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';

import {styles} from './Chat.style';
import {formatDistance, parseISO} from 'date-fns';
import {tr} from 'date-fns/locale';

import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import parseContentData from '../../utils/parseContentData';
import MessageCard from '../../components/MessageCard';
import MessageTextModal from '../../modal/MessageTextModal';

function Chat({navigation, route}) {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');

  const room = route.params;
  navigation.setOptions({title: route.params.name});

  const formattedDate = formatDistance(parseISO(room.createdAt), new Date(), {
    addSuffix: true,
    locale: tr,
    includeSeconds: true,
  });

  console.log(room);
  useEffect(() => {
    database()
      .ref(`/ChatRooms/${room.id}/Messages`)
      .on('value', (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const parsedData = parseContentData(data);
          setMessages(parsedData);
        }
      });
  }, []);

  function handleSend() {
    database()
      .ref(`/ChatRooms/${room.id}/Messages`)
      .push({
        text: message,
        createdAt: new Date().toISOString(),
        createdName: auth().currentUser.email.split('@')[0],
      });
    setMessage('');
  }

  const renderItem = ({item}) => <MessageCard message={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.flatList}>
        <FlatList
          scrollEnabled={true}
          data={messages}
          renderItem={renderItem}
          keyExtractor={(item) => item.createdAt}
         />
      </View>

      <MessageTextModal SendMessage={handleSend} setMessage={setMessage} />
    </View>
  );
}

export default Chat;
