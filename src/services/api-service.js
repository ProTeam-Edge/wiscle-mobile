import axios from 'axios';
import APIKit from './APIKit';
export const getToken = (username) =>
APIKit.post('get_chat_token.php',{username: username}).then((twilioToken) => twilioToken.data); 

