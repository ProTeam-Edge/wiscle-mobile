
import React, { useState,Component  } from 'react';
import APIKit, {setClientToken} from '../../services/APIKit';
import { StyleSheet, TextInput, View, Image,  Alert,ImageBackground,BackHandler,TouchableOpacity} from 'react-native';
import {globals} from '../../theme/globals';
import {axios} from 'axios';
import {Notifications} from 'twilio-notifications';
import LoadingIndicator from '../../misc/LoadingIndicator';
import { Container, Header, Content, Form, Item, Input, Label,Text,Button,Icon } from 'native-base';
/* import { TokenSubmission } from '../../services/TokenSubmission'; */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
const image = { uri: "https://reactjs.org/logo-og.png" };

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
	
	ShowAlert = (title,message) => {
		return Alert.alert(title, message, [{ text: "OK", onPress: () => console.log("OK Pressed") }],{ cancelable: true });
	}
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

	OnchangeEmail = (email) => {
		 this.setState({email:email,emailEmpty:false,invalidEmail:false,responseMessage:null});
		this.EmailValidationTrigger(email);
	}
	OnChangePassword = (password_field) => {
		 
		 this.setState({password_field:password_field,passwordEmpty:false,invalidPassword:false,responseMessage:null});
		 this.PasswordValidationTrigger(password_field);

	}
	EmailValidationTrigger = (email) => {
		let error_val = 0;
		if(typeof email === "undefined") {
			this.setState({ emailEmpty: true});
			error_val = 1;
		}
		else {
			if(email=='') {
				
				this.setState({ emailEmpty: true  });
				error_val = 1;
			}
			else {
			if(this.isEmailAddress(email)==false) {
				
				this.setState({ invalidEmail: true  });
				error_val = 1;
			}
			else {
				this.setState({ invalidEmail: false });
			}
			this.setState({ emailEmpty: false });
			}
		}
		return error_val;
	}
	PasswordValidationTrigger = (password_field) => {
		let error_val = 0;
		if(typeof password_field === "undefined") {
			error_val = 1;
			this.setState({ passwordEmpty: true });
		}
		else {
			if(password_field=='') {
				error_val = 1;
				this.setState({ passwordEmpty: true  });
			}
			else {
				if(this.isValidPassword(password_field)==false) {
				error_val = 1;
				this.setState({ invalidPassword: true  });
			}
			else {
				this.setState({ invalidPassword: false });
			}
			this.setState({ passwordEmpty: false });
			}
		}
		return error_val;
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
		let email=this.state.email;
		let password_field = this.state.password_field;
		let error1 = this.EmailValidationTrigger(email);
		let error2 = this.PasswordValidationTrigger(password_field);
		if(error1==0 && error2==0)
			this.CallHttp(email, password_field);
		
    }
	
	// Call HTTP
	CallHttp = (email, password_field) => {
		const payload = {email, password_field};
		this.setState({ LoadingIndicatorShow: true });
		APIKit.post('authenticate.php', payload).then(this.onSuccess).catch(this.onFailure);
	}
	// Ajax Response Handlers
	onSuccess = ({data}) => {
		console.log(data);
		console.log('response success');
		const { navigate } = this.props.navigation;
		
		if(data.success==0) {
			this.setState({ LoadingIndicatorShow: false })
			this.setState({ responseMessage:data.message });
			//this.ShowAlert('Response',data.message);
		}
		else {
		
		this.EmptyFields();
		this.setState({ responseMessage:data.message });
	
		AsyncStorage.setItem("isLoggedIn", '1');
		AsyncStorage.setItem("uid", data.data.ID);
		AsyncStorage.setItem("username", data.data.username);
		AsyncStorage.setItem("email", data.data.email);
		AsyncStorage.setItem("token", data.data.token);
		AsyncStorage.setItem("channel_id", data.data.channel_id);
		//this.ShowAlert('Response',data.message);
		this.EmptyVariables();
		/* TokenSubmission( data.data.ID).then(navigate('HomeView')); */
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
		return <Container contentContainerStyle={{flex: 1}} style={{padding: 50}}>
		<Content >
				<Image style={globals.logo} source={require('../../assets/logo/logo.png')} />
				
				 <Item floatingLabel >
              <Label>Email</Label>
              <Input value={this.state.email}  onChangeText={(email) => this.OnchangeEmail(email)}   />
            </Item>
			<Text style={globals.errors}>
					{this.state.emailEmpty ? " Email is a required field." : null}
					{this.state.invalidEmail ? " Email is invalid." : null}
				</Text>
				
			
				<Item floatingLabel>
              <Label>Password</Label>
              <Input value={this.state.password_field} secureTextEntry={true} onChangeText={(password_field) => this.OnChangePassword(password_field)}   />
            </Item>
				<Text style={globals.errors}>
					{this.state.passwordEmpty ? " Password is a required field." : null}
					{this.state.invalidPassword ? " Password must be 8 characters long." : null}
				</Text>
				<Text style={globals.errors}>
				{this.state.responseMessage ? this.state.responseMessage : null} 
				</Text>
		  <Button  style={globals.Top20} onPress={this.formsubmission} >
		   <Icon type="FontAwesome" name="sign-in" />
            <Text>Login</Text>
          </Button>
				
				
	</Content> 
			</Container >
    
	}
 	// Render View
	render() {
		return (this.state.LoadingIndicatorShow ?  <LoadingIndicator /> : this.LoginViewHtml());
	}
}
export default LoginView;