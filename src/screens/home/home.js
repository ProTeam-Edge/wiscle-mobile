import React, { Component,useState } from "react";
import { Container, Header, Content, List, Text,ListItem, Left, Body, Right, Thumbnail,Button, Footer, FooterTab,Icon,Title  } from 'native-base';   

import {StyleSheet,  TextInput, View, Image,  Alert,BackHandler,TouchableOpacity,ScrollView  } from "react-native";
import {globals} from '../../theme/globals';
import APIKit from '../../services/APIKit';
import PersonalDetailsEdit from '../../screens/personal/personal-details-edit';
import LoadingIndicator from '../../misc/LoadingIndicator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
const initialState  = { 
	username: null,
		email:null,
		token:null,
		isLoggedIn:null,
		uid:null,
		data:null,
		chat_token:null,
		

	};
class HomeView extends Component {
	state = { 
		username: null,
		email:null,
		token:null,
		isLoggedIn:null,
		uid:null,
		data:null,
		chat_token:null,
	
	
	};
	 componentDidMount() {

        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
		 this.props.navigation.addListener('focus', () => {
			var that = this;
		
			that.setState({ LoadingIndicatorShow: true  });
	
		let username = AsyncStorage.getItem("username");
		username.then(function(username_result){
		
		that.setState({ username: username_result });
		})
		
		
		let uid = AsyncStorage.getItem("uid");
		uid.then(function(uid_result){
		that.CallHttp(uid_result)
		that.setState({ uid: uid_result });
		})
		let email = AsyncStorage.getItem("email");
		email.then(function(email_result){
	
		that.setState({ email: email_result });
		})
		
		let token = AsyncStorage.getItem("token");
		token.then(function(token_result){
		 
		that.setState({ token: token_result });
		})
		let chat_token = AsyncStorage.getItem("chat_token");
		chat_token.then(function(chat_token_result){
	
		that.setState({ chat_token: chat_token_result });
		})
		let isLoggedIn = AsyncStorage.getItem("isLoggedIn");
		isLoggedIn.then(function(isLoggedIn_result){
	
		that.setState({ token: isLoggedIn_result });
		})
		 })
      // Update you
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
		
	
	}
	CallHttp = (uid) => {
		
		const payload = {id:uid};
		this.setState({ LoadingIndicatorShow: true });
		APIKit.post('get_topics_contacts.php', payload).then(this.onSuccess).catch(this.onFailure);
	}
	onSuccess = ({data}) => {
		console.log(data)
		this.setState({ LoadingIndicatorShow: false });
		this.setState({ data: data});
		
    };
	onFailure = ({data}) => {
	
    };
	PersonalDetailsViewRedirect=()=>{
	
	const { navigate } = this.props.navigation;
		navigate('PersonalDetailsView'); 
	}
	TopicsRedirect = () => {
		const { navigate } = this.props.navigation;
		navigate('TopicsView');
	}
	TextChatRedirect = () => {
		const { navigate } = this.props.navigation;

		navigate('TextChatView', { username:this.state.uid });
	}
	AudioChatRedirect = () => {
		const { navigate } = this.props.navigation;
		navigate('AudioChatView');
	}
	redirectChat = (data,channel_id,connection_name) => {
		
		const { navigate } = this.props.navigation;
		
		navigate('TextChatView', { channel_id:channel_id,username:this.state.uid,connection_name:connection_name });
		//navigate('ChatRoomScreen', { channelId:channel_id,identity:this.state.uid });
	}
	
	clearSession = () => {
		console.log('triggered');
		AsyncStorage.clear();
		this.setState({initialState});
		const { navigate } = this.props.navigation;
		navigate('LoginView');
	}
	 repeatList = (results,type,string) => {
		 console.log(results)
		 // Ensure arr is defined in scope of, or is "visible" to, renderT()
 if(results!=null && typeof results['data'][type] !== 'undefined')
 {
  var arr = results['data'][type];
		return arr.map((obj, index) => {
    const key = index;
    return  <ListItem avatar onPress={ () => { this.redirectChat(obj.id,obj.channel_id,obj.name) } } >
              <Left>
                <Thumbnail source={{ uri: obj.image,}}  />
              </Left>
              <Body>
                <Text>{obj.name}</Text>
                <Text note>{obj.about}</Text>
              </Body>
              <Right>
               
              </Right>
            </ListItem>
         ;
  });
 } else {
	  return <ListItem>
              <Text>No {string} to show here..</Text>
            </ListItem>
 }
	}


 
 HomeViewHtml = () => {
	     var results = this.state.data;
		 var user_image ='';
		 if(results!=null && typeof results['data']['user_image'] !== 'undefined') {
			user_image = results['data']['user_image'];
		 }
	
		return  <Container >
		 <Header>
          <Left>    
		  <Button onPress={this.clearSession} transparent>
              <Icon name='arrow-back' />
            </Button>
			</Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
		<Content style={{padding: 10}}>
		
	  <Image style={{marginBottom: 20}}  source={require('../../assets/logo/logo.png')} />

	     <Text style={[globals.Heading,globals.Bottom10]}>Personal</Text>
	  <List>
	  <ListItem avatar onPress={this.PersonalDetailsViewRedirect} >
              <Left>
                <Thumbnail source={{ uri: user_image,}}  />
              </Left>
              <Body>
                <Text>Personal Details</Text>
                <Text note>View Personal Details</Text>
              </Body>
              <Right>
               
              </Right>
            </ListItem>
	  </List>
	  <Text style={[globals.Heading,globals.Top20,globals.Bottom10]}>Contacts</Text>
	  <List>
	  {this.repeatList(results,'contact','Contacts')}
	  </List>
	  
		<Text  style={[globals.Heading,globals.Top20,globals.Bottom10]}>Topics</Text>
		  <List>
	  {this.repeatList(results,'topic','Topics')}
	   </List>
	  </Content>
	   <Footer>
          <FooterTab>
            <Button active vertical>
              <Icon type="FontAwesome"  name="home" />
              <Text>Home</Text>
            </Button>
        
            <Button onPress={this.clearSession} vertical>
               <Icon type="FontAwesome" name="power-off" />
              <Text>Logout</Text>
            </Button>
          </FooterTab>
        </Footer>
	 </Container>
	
	}
render() {
		return (this.state.LoadingIndicatorShow ?  <LoadingIndicator /> : this.HomeViewHtml());
	}
}

export default HomeView;