import React,{useState} from 'react';
import { StyleSheet, TouchableOpacity, Image, Text,View,Alert  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../../../theme';
import { images } from '../../../assets';
import APIKit, {setClientToken} from '../../../services/APIKit';
import { showMessage } from 'react-native-flash-message';
export function ChatListItem({ channel, onPress }) {
	
	var obj = channel.name;
	console.log('channel')
	console.log(channel)
	var contact_id = obj.contact_id;
	var owner_id = obj.owner_id;
	
	


	
  return (
	<View>
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image style={styles.cardIcon} source={images.message} />
      <Text style={styles.cardText}>{channel.name}</Text>
    </TouchableOpacity>
	 <TouchableOpacity onPress={() => createTwoButtonAlert(channel.id)}>
      <Text>Delete Channel</Text>
    </TouchableOpacity>
	</View>
  );
}
	
	

 const PerformDelete = (id) =>
 APIKit.post('delete_chat_channel.php', {id:id}).then((response) =>showMessage({ message: response.data.message, type: 'success' }))
 
 const createTwoButtonAlert = (id) =>
    Alert.alert(
      "Message",
      "Are you sure you want to delete this channel?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => PerformDelete(id) }
      ],
      { cancelable: false }
    );
	
	
	
const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: colors.windsor,
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
    borderRadius: 10,
    marginHorizontal: 12,
    marginTop: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  cardIcon: {
    height: 44,
    width: 44,
  },
  cardText: {
    fontSize: 16,
    color: colors.cinder,
    marginLeft: 24,
    marginRight: 8,
  },
});
