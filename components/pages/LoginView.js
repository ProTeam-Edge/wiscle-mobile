import { StatusBar } from 'expo-status-bar';
import React, { useState,Component  } from 'react';
import APIKit, {setClientToken} from '../api/APIKit';
import { StyleSheet, Text, TextInput, View, Image, Button, Alert} from 'react-native';
import {globals} from '../../styles/globals';
import {axios} from 'axios';
import LoadingIndicator from '../../components/misc/LoadingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';

class LoginView extends Component {
	// Global State Variables
	state = { 
		emailEmpty: false,
		passwordEmpty:false,
		invalidEmail:false,
		invalidPassword:false,
		responseMessage:null,
		LoadingIndicatorShow:false,
		password_field:'',email:'',
		sessionData:null 
	};
	
	// Native Component
	ShowAlert(title,message) {
		return Alert.alert(title, [ { text: "OK", onPress: () => console.log("OK Pressed") } ],
		{ cancelable: false });
	}
	
	//Custom Functions
	
	// Check Password Length
	isValidPassword(str) {
		if(str.length>=8)
			return true;
		else
			return false;
	}
	
	// Email Validation
	isEmailAddress(str) {
		var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return pattern.test(str);  // returns a boolean 
	}
	
	// Empty Form
	EmptyFields() {
		this.setState({ email: '',password_field:'' });	
	}
	EmptyVariables() {
		this.setState({ emailEmpty: false,passwordEmpty:false,invalidEmail:false,invalidPassword:false,responseMessage:null	});	
	}
	// Add Input Into State 
	addInputState = () => {
   	console.log('triggered');
	AsyncStorage.clear();
	const { navigate } = this.props.navigation;
	navigate('LoginView');
	}
	
	// Process Form submission
	formsubmission = (e) => {
		let error = 0;
		let email=this.state.email;
		let password_field = this.state.password_field;
		if(typeof email === "undefined") {
			error = 1;
			this.setState({ emailEmpty: true });
		}
		else {
			if(email=='') {
				error = 1;
				this.setState({ emailEmpty: true });
			}
			else {
			if(this.isEmailAddress(email)==false) {
				error = 1;
				this.setState({ invalidEmail: true });
			}
			else {
				this.setState({ invalidEmail: false });
			}
			this.setState({ emailEmpty: false });
			}
		}
		if(typeof password_field === "undefined") {
			error = 1;
			this.setState({ passwordEmpty: true });
		}
		else {
			if(password_field=='') {
				error = 1;
				this.setState({ passwordEmpty: true });
			}
			else {
				if(this.isValidPassword(password_field)==false) {
				error = 1;
				this.setState({ invalidPassword: true });
			}
			else {
				this.setState({ invalidPassword: false });
			}
			this.setState({ passwordEmpty: false });
			}
		} 
		if(error==0) {
			this.setState({ LoadingIndicatorShow: true });
			const payload = {email, password_field};
			console.log(payload);
		
			// Call HTTP request
			APIKit.post('/authenticate.php', payload).then(this.onSuccess);
		}
    }
	
	// Ajax Response Handlers
	onSuccess = ({data}) => {
		console.log(data);
		console.log('response success');
		const { navigate } = this.props.navigation;
		this.setState({ LoadingIndicatorShow: false });
		if(data.success==0) {
			this.setState({ responseMessage:data.message });
			 this.ShowAlert('Response',data.message);
		}
		else {
		this.EmptyFields();
		this.setState({ responseMessage:data.message });
		AsyncStorage.setItem("isLoggedIn", '1');
		AsyncStorage.setItem("ID", data.data.ID);
		AsyncStorage.setItem("username", data.data.username);
		AsyncStorage.setItem("email", data.data.email);
		AsyncStorage.setItem("token", data.data.token);
		//this.ShowAlert('Response',data.message);
		this.EmptyVariables();
		navigate('HomeView');
		}
     
    };
	onFailure = ({data}) => {
		console.log(data);
		console.log('response failure');
		this.setState({ LoadingIndicatorShow: false });
		console.log('faliure')
		console.log(data)
    };
	
	// Template Part Login
	LoginViewHtml() {
		return <View style={globals.container}>
				<Image style={globals.logo} source={require('../../assets/logo/logo.png')} />
				<Text style={globals.errors}>
				{this.state.responseMessage ? this.state.responseMessage : null} 
				</Text>
				<TextInput value={this.state.email}  onChangeText={(email) => this.setState({email})}   style={globals.inputs} placeholder="Email" />
				<Text style={globals.errors}>
					{this.state.emailEmpty ? " Email is a required field." : null}
					{this.state.invalidEmail ? " Email is invalid." : null}
				</Text>
				<TextInput value={this.state.password_field} secureTextEntry={true} onChangeText={(password_field) => this.setState({password_field})}  style={globals.inputs} 
				placeholder="Password"/>  
				<Text style={globals.errors}>
					{this.state.passwordEmpty ? " Password is a required field." : null}
					{this.state.invalidPassword ? " Password must be 8 characters long." : null}
				</Text>
				<Button onPress={this.formsubmission} style={globals.loginButton} type="submit"title="Login"/>
			</View>
	}
 	// Render View
	render() {
		return (this.state.LoadingIndicatorShow ?  <LoadingIndicator /> : this.LoginViewHtml());
	}
}
export default LoginView;