import React, { Component,useState } from "react";
import {StyleSheet, Text, TextInput, View, Image, Button, Alert,BackHandler } from "react-native";
import {globals} from '../../theme/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
class AudioChatView extends Component {
	
  render() {
    return (
      <View style={globals.container}>
	  <Text>Audio Chat</Text> 
      </View>
    );
  }
}

export default AudioChatView;