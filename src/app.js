
import React, { useState,Component  } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {globals} from './theme/globals';
import LoginView from './screens/login/login';
import HomeView from './screens/home/home';
import FlashMessage from 'react-native-flash-message';
import {TextChatView} from './screens/text-chat/text-chat';
import AudioChatView from './screens/audio-chat/audio-chat';
import PersonalDetailsEdit from './screens/personal/personal-details-edit';
import PersonalDetailsView from './screens/personal/personal-details-view';
import {ChatRoomScreen} from './screens/chat-room-screen/chat-room-screen';
import {ChatCreateScreen} from './screens/chat-create-screen/chat-create-screen';
import TopicsView from './screens/topics/topics';
import LoadingIndicator from './misc/LoadingIndicator';
import { AppProvider } from './app-context';
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
	TextChatView () {
		return  <View><TextChatView /></View>
	}
	AudioChatView () {
		return  <View><AudioChatView /></View>
	}
	TopicsView () {
		return  <View><TopicsView /></View>
	}
	// Workaround for initialRoutName Issue
	mainRender(initialRouteName) {
		console.log(initialRouteName)
		 if (initialRouteName !== null) {
			 return (
			<NavigationContainer >
			 <AppProvider>
				<Stack.Navigator initialRouteName={initialRouteName}>
					<Stack.Screen  options={{ headerShown: false }} name="LoginView" component={LoginView} />
					<Stack.Screen options={{ headerShown: false }} name="HomeView" component={HomeView} />
					<Stack.Screen options={{ headerShown: false }} name="TextChatView"  component={TextChatView} />
					<Stack.Screen  name="AudioChatView" options={{  headerTitle: "Audio Chat" }}   component={AudioChatView} />
					<Stack.Screen name="TopicsView" options={{  headerTitle: "Topics" }}    component={TopicsView} />
					<Stack.Screen options={{ headerShown: false }}  name="ChatRoomScreen"  component={ChatRoomScreen} />
					<Stack.Screen name="ChatCreateScreen" options={{  headerTitle: "Create Chatroom" }} component={ChatCreateScreen} />
					<Stack.Screen name="PersonalDetailsEdit" options={{ headerShown: false }}  component={PersonalDetailsEdit} />
					<Stack.Screen name="PersonalDetailsView" options={{ headerShown: false }}  component={PersonalDetailsView} />
					
				</Stack.Navigator>
				  <FlashMessage position="bottom" />
			</AppProvider>
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