import React, { useState, useLayoutEffect, useEffect, useCallback, useRef, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';

import { colors } from '../../theme';
import { TwilioService } from '../../services/twilio-service';
import { getToken } from '../../services/api-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useApp } from '../../app-context';

import ChatListLoader  from '../../misc/LoadingIndicator';
import ChatCreateScreen  from '../chat-create-screen/chat-create-screen';
import ChatRoomScreen  from '../chat-room-screen/chat-room-screen';
import { ChatListEmpty } from './components/chat-list-empty';
import { ChatListItem } from './components/chat-list-item';

export function TextChatView({ navigation, route }) {

  const { username } = route.params;
  const { channel_id } = route.params;
  const { connection_name } = route.params;

	
 

  const [loading, setLoading] = useState(true);
  const { channels, updateChannels } = useApp();
  const channelPaginator = useRef();
  
  function ChatCreateScreen() {
	  navigation.navigate('ChatCreateScreen');
  }
  function ChatRoomScreenRedirect(channelId,identity){
	

		console.log('ChatRoomScreenRedirect')
		navigation.navigate('ChatRoomScreen', { channelId:channelId.channelId,identity:channelId.identity });
	}
  useLayoutEffect(() => {
	console.log(navigation)
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate(routes.ChatCreat.name)}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const setChannelEvents = useCallback(

    (client) => {
      client.on('messageAdded', (message) => {
        updateChannels((prevChannels) =>
          prevChannels.map((channel) =>
            channel.id === message.channel.sid ? { ...channel, lastMessageTime: message.dateCreated } : channel,
          ),
        );
      });
      return client;
    },
    [updateChannels],
  );

  const getSubscribedChannels = useCallback(
    (client) =>
      client.getSubscribedChannels().then((paginator) => {
		  console.log('paginator')
		  console.log(paginator)
        channelPaginator.current = paginator;
        const newChannels = TwilioService.getInstance().parseChannels(channelPaginator.current.items);
        updateChannels(newChannels);
      }),
    [updateChannels],
  );

  useEffect(() => {
	
    getToken(username)
      .then((token) => TwilioService.getInstance().getChatClient(token))
      .then(() => TwilioService.getInstance().addTokenListener(getToken))
      .then(setChannelEvents)
      .then(getSubscribedChannels)
      .catch((err) => alert('error'))
      .finally(() => navigation.navigate('ChatRoomScreen', { channelId:channel_id,identity:username,connection_name:connection_name }));

    return () => TwilioService.getInstance().clientShutdown();
  }, [username, setChannelEvents, getSubscribedChannels]);

  const sortedChannels = useMemo(
    () => channels.sort((channelA, channelB) => channelB.lastMessageTime - channelA.lastMessageTime),
    [channels],
  );

  return (
    <View style={styles.screen}>

       
      {loading ? (
        <ChatListLoader />
      ) : (
	  
       <Text>Test</Text>
      )}
	 
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.snow,
  },
  addButton: {
    height: 24,
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 22,
    fontWeight: '700',
    lineHeight: 24,
    color: colors.white,
  },
});
