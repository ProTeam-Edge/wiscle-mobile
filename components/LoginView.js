import { StatusBar } from 'expo-status-bar';
import React, { useState,Component  } from 'react';
import APIKit, {setClientToken} from '../shared/APIKit';

import { StyleSheet, Text, TextInput, View, Image, Button, Alert} from 'react-native';
import {globals} from '../styles/globals';
import {axios} from 'axios';


class LoginView extends Component {
	
	state = { emailEmpty: false,passwordEmpty:false,invalidEmail:false,invalidPassword:false };
	isValidPassword(str) {
		
			if(str.length>=8)
				return true;
			else
				return false;
		
	}
	isEmailAddress(str) {
		
		var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
		return pattern.test(str);  // returns a boolean 
		
	}
	formsubmission = (e) => {
		let error = 0;
		let email=this.state.email;
		let password_field = this.state.password_field;

		if(typeof email === "undefined") {
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
		if(typeof password_field === "undefined") {
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
		if(error==0)
		{
			 const payload = {email, password_field};
			APIKit.post('/', payload)
      .then(this.onSuccess)
      .catch(this.onFailure);
		}
    }
	onSuccess = ({data}) => {
      console.log('success')
      console.log(data)
    };
	onFailure = ({data}) => {
		 console.log('faliure')
      console.log(data)
    };
  render() {
        return (
     <View style={globals.container}>
	
            <Image style={globals.logo} source={require('../assets/logo/logo.png')} />
			
			<TextInput  onChangeText={(email) => this.setState({email})}   style={globals.inputs}
         placeholder="Email"
       />
	    <Text style={globals.errors}>
		{this.state.emailEmpty ? " Email is a required field." : null}
		{this.state.invalidEmail ? " Email is invalid." : null}
		</Text>
     <TextInput secureTextEntry={true} onChangeText={(password_field) => this.setState({password_field})}  style={globals.inputs} 
         placeholder="Password"
       />  
	     <Text style={globals.errors}>
						{this.state.passwordEmpty ? " Password is a required field." : null}
						{this.state.invalidPassword ? " Password must be 8 characters long." : null}
					</Text>
  <Button
		 onPress={this.formsubmission}
         style={globals.loginButton}
		type="submit"
         title="Login"
       />

  </View>
  );
  }
}
export default LoginView;
