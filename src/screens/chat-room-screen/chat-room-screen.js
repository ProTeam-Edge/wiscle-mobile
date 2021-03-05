import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { showMessage } from 'react-native-flash-message';
import { Container, Header, Content, List, Text,ListItem, Left, Body,Title, Right, Thumbnail,Button, Footer, FooterTab,Icon  } from 'native-base';   
import { colors } from '../../theme';
import { TwilioService } from '../../services/twilio-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChatLoader  from '../../misc/LoadingIndicator';
export function ChatRoomScreen({ navigation, route }) {
	
  const { channelId, identity,connection_name } = route.params;

  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const chatClientChannel = useRef();
  const chatMessagesPaginator = useRef();

  const setChannelEvents = useCallback((channel) => {
    chatClientChannel.current = channel;
    chatClientChannel.current.on('messageAdded', (message) => {
      const newMessage = TwilioService.getInstance().parseMessage(message);
      const { giftedId } = message.attributes;
      if (giftedId) {
        setMessages((prevMessages) => {
          if (prevMessages.some(({ _id }) => _id === giftedId)) {
            return prevMessages.map((m) => (m._id === giftedId ? newMessage : m));
          }
          return [newMessage, ...prevMessages];
        });
      }
    });
    return chatClientChannel.current;
  }, []);
  
  const movetoHome = () => { 
		
		navigation.navigate('HomeView');
	}
const clearSession = () => { 
		console.log('triggered');
		AsyncStorage.clear();

		navigation.navigate('LoginView');
	}
  useEffect(() => {

    TwilioService.getInstance()
      .getChatClient()
      .then((client) => client.getChannelBySid(channelId))
      .then((channel) => setChannelEvents(channel))
      .then((currentChannel) => currentChannel.getMessages())
      .then((paginator) => {
        chatMessagesPaginator.current = paginator;
        const newMessages = TwilioService.getInstance().parseMessages(paginator.items);
        setMessages(newMessages);
      })
      .catch((err) => showMessage({ message: err.message, type: 'danger' }))
      .finally(() => setLoading(false));
  }, [channelId, setChannelEvents]);

  const onSend = useCallback((newMessages = []) => {
    const attributes = { giftedId: newMessages[0]._id };
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    chatClientChannel.current?.sendMessage(newMessages[0].text, attributes);
  }, []);

  return  <Container >
   <Header>
          <Left>    
		  <Button onPress={movetoHome} transparent>
              <Icon name='arrow-back' />
            </Button>
			</Left>
          <Body>
            <Title>{connection_name}</Title>
          </Body>
          <Right />
        </Header>
		<Content contentContainerStyle={{flex: 1}} style={{padding: 10}}>
 
      {loading ? (
        <ChatLoader />
      ) : (
        <GiftedChat
          messagesContainerStyle={styles.messageContainer}
          messages={messages}
	  renderAvatar={null}
          onSend={(messages) => onSend(messages)}
          user={{ _id: identity }}
        />
      )}

	</Content>
	  <Footer>
          <FooterTab>
            <Button vertical>
              <Icon onPress={movetoHome} type="FontAwesome" name="home" />
              <Text>Home</Text>
            </Button>
        
            <Button onPress={clearSession} vertical>
               <Icon type="FontAwesome" name="power-off" />
              <Text>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
	 </Container >

}

const styles = StyleSheet.create({
  screen: {
    flexGrow: 1,
    backgroundColor: colors.white,
  },
  messageContainer: {
    backgroundColor: colors.snow,
  },
});
