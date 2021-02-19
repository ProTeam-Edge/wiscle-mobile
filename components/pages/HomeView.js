import React, { Component,useState } from "react";
import {StyleSheet, Text, TextInput, View, Image, Button, Alert } from "react-native";

import {globals} from '../../styles/globals';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
class HomeView extends Component {
	state = { 
		username: null,
		email:null,
		token:null,
		isLoggedIn:null,
	};
	constructor(props) {
	super(props);
	var that = this;
	
		let username = AsyncStorage.getItem("username");
		username.then(function(username_result){
		that.setState({ username: username_result });
		})
		
		let email = AsyncStorage.getItem("email");
		email.then(function(email_result){
		that.setState({ email: email_result });
		})
		
		let token = AsyncStorage.getItem("token");
		token.then(function(token_result){
		that.setState({ token: token_result });
		})
		
		let isLoggedIn = AsyncStorage.getItem("isLoggedIn");
		isLoggedIn.then(function(isLoggedIn_result){
		that.setState({ token: isLoggedIn_result });
		})
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
	   <Text>{this.state.username ? "Username : "+this.state.username  : null}</Text>
	   <Text>{this.state.email ? "Email : "+this.state.email  : null}</Text>
		<Button onPress={this.clearSession} style={globals.loginButton} type="button"title="Logout"/>
      </View>
    );
  }
}

export default HomeView;