import React, { Component,useState } from "react";
import {StyleSheet, Text, TextInput, View, Image, Button, Alert,BackHandler } from "react-native";
import {globals} from '../../styles/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
class TextChatView extends Component {
	
  render() {
    return (
      <View style={globals.container}>
	  <Text>Text Chat</Text> 
      </View>
    );
  }
}

export default TextChatView;