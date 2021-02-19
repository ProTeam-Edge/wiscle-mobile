import React, { Component,useState } from "react";
import {StyleSheet, Text, TextInput, View, Image, Button, Alert,BackHandler } from "react-native";
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
	 componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
    }
    handleBackButton() {
		Alert.alert(
		"Exit App?",
		"Are you sure you want to exit app?",[{
		  text: "Cancel",
		  onPress: () => console.log("Cancel Pressed"),
		  style: "cancel"
		},
		{ text: "OK", onPress: () => BackHandler.exitApp() }],
		{ cancelable: false });
		return true;
    }
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
	
	TextChatRedirect = () => {
		const { navigate } = this.props.navigation;
		navigate('TextChatView');
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
	  <Image style={globals.logo} source={require('../../assets/logo/logo.png')} />
	   <Image style={globals.userImage} source={require('../../assets/user-male.png')} />
	    <View style={globals.logOutButton}>
	   <Button  onPress={this.clearSession}  type="button"title="Logout"/>
	   </View>
	  <Text style={globals.WelcomeText}>Welcome {this.state.username ? this.state.username  : null}</Text>
	  <View style={{
          flex: 1,
          flexDirection: 'row'
        }}>
		 <View style={{right: 20,width: 120, height: 50}}>
     <Button  onPress={this.TextChatRedirect} title='Text Chat'/>
   </View>
   <View style={{ left: 20, width: 120, height: 50,}}>
     <Button  title='Audio Chat'/>
   </View>
   
   </View>
		
      </View>
    );
  }
}

export default HomeView;