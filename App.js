import { StatusBar } from 'expo-status-bar';
import React, { useState,Component  } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globals} from './styles/globals';
import LoginView from './components/pages/LoginView';
import HomeView from './components/pages/HomeView';
import LoadingIndicator from './components/misc/LoadingIndicator';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

class App extends Component {
	state = { 
		initialRouteName: null,
	};
	constructor(props) {
		super(props);
		this.NativeOnLoad();
	}
	NativeOnLoad() {
		var that = this;
		let isLoggedIn = AsyncStorage.getItem("isLoggedIn");
		isLoggedIn.then(function(result){
		
		if(result=='1'){
			that.setState({ initialRouteName: 'HomeView' });
		}
		else
			that.setState({ initialRouteName: 'LoginView' });
		})
	
	}
	LoginView () {
		return <View><LoginView /></View>
	}
	HomeView () {
		return  <View><HomeView /></View>
	}
	// Workaround for initialRoutName Issue
	mainRender(initialRouteName) {
		console.log(initialRouteName)
		 if (initialRouteName !== null) {
			 return (
		
			<NavigationContainer >
				<Stack.Navigator initialRouteName={initialRouteName}>
					<Stack.Screen  options={{ headerShown: false }} name="LoginView" component={LoginView} />
					<Stack.Screen options={{ headerShown: false }} name="HomeView" component={HomeView} />
				</Stack.Navigator>
			</NavigationContainer>
			);
		 }
		 else {
			 return (<View></View>);
		 }
	}
	
	// Render View
	render() {
		return this.mainRender(this.state.initialRouteName);
	}
}
export default App;