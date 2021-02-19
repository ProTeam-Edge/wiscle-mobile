import React, { Component } from "react";
import {StyleSheet, Text, TextInput, View, Image, Button, Alert } from "react-native";

import {globals} from '../../styles/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
class HomeView extends Component {
	constructor(props) {
	super(props);

	}
	clearSession = () => {
   	console.log('triggered');
	AsyncStorage.clear();
	const { navigate } = this.props.navigation;
	navigate('LoginView');
	}
	
  render() {
    return (
      <View style={globals.container}>
	  <Text>HomePage</Text>
		<Button onPress={this.clearSession} style={globals.loginButton} type="button"title="Logout"/>
      </View>
    );
  }
}

export default HomeView;