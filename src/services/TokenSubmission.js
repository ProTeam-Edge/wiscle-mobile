import React, { useState, useLayoutEffect, useEffect, useCallback, useRef, useMemo } from 'react';
import axios from 'axios';
import APIKit from './APIKit';
import { useApp } from '../app-context';
import { TwilioService } from './twilio-service';

export function TokenSubmission() {
const { channels, updateChannels } = useApp();
APIKit.post('get_chat_token.php',{username: username}).then((twilioToken) =>TwilioService.getInstance().getChatClient(twilioToken.data)).then(() => TwilioService.getInstance().addTokenListener(TokenSubmission))
      .then(setChannelEvents)
      .then(getSubscribedChannels)
      .catch((err) => alert('error'))
      .finally(() => alert("success"));
 
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
 const sortedChannels = useMemo(
    () => channels.sort((channelA, channelB) => channelB.lastMessageTime - channelA.lastMessageTime),
    [channels],
  );
}