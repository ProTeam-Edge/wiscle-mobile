import React, { Component,useState } from "react";
import {StyleSheet,  TextInput, View, Image,  Alert,BackHandler,TouchableOpacity,ScrollView  } from "react-native";
import {globals} from '../../theme/globals';
import { Container, Header, Content, List, Text,ListItem, Left, Body, Right, Thumbnail,Button, Footer, FooterTab,Icon,Title, Form,Item,Input,Label,Textarea,Card,CardItem } from 'native-base';  
import AsyncStorage from '@react-native-async-storage/async-storage';
import APIKit, {setClientToken} from '../../services/APIKit';
class PersonalDetailsView extends Component {
	state = { 
	person_givenname:null,
	person_familyname:null,
	person_jobtitle:null,
	person_email:null,
	person_url:null,
	person_telephone:null,
	person_faxnumber:null,
	person_knowsabout:null,
	person_description:null,
	occupation:null,
	
	
	};
	 componentDidMount() {
		let that = this;
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
		 this.props.navigation.addListener('focus', () => {
			 let uid = AsyncStorage.getItem("uid");
			uid.then(function(uid_result){
			that.CallHttp(uid_result)
			})
		 })
      // Update you
    }
	CallHttp = (uid) => {
		
		const payload = {id:uid};
		APIKit.post('get_personal_information.php', payload).then(this.onSuccess).catch(this.onFailure);
	}
	onSuccess = ({data}) => {
		console.log(data.data)
		let datafinal = data.data;
		this.setState({ person_givenname: datafinal.person_givenname, person_familyname: datafinal.person_familyname, person_jobtitle: datafinal.person_jobtitle, person_email: datafinal.person_email, person_url: datafinal.person_url,person_telephone: datafinal.person_telephone,person_faxnumber: datafinal.person_faxnumber,person_knowsabout: datafinal.person_knowsabout,person_description: datafinal.person_description,occupation:datafinal.occupation});
		
		
    };
	onFailure = ({data}) => {
	alert('fail')
    };
	GetForm = () => {
		alert("reached")
	}
	movetoHome = () => {
		const { navigate } = this.props.navigation;

	navigate('HomeView');
	}
	movetoEdit = () => {
		const { navigate } = this.props.navigation;

	navigate('PersonalDetailsEdit');
	}

	clearSession = () => {
		console.log('triggered');
		AsyncStorage.clear();
		const { navigate } = this.props.navigation;
		navigate('LoginView');
	}
 PersonalHtml = () => {
		return  <Container >
		 <Header>
          <Left>    
		  <Button onPress={this.movetoHome} transparent>
              <Icon name='arrow-back' />
            </Button>
			</Left>
          <Body>
            <Title>View Personal Details</Title>
          </Body>
          <Right />
        </Header>
		<Content style={{padding: 10}}>
		  <Image style={{marginBottom: 20}}  source={require('../../assets/logo/logo.png')} />
			  {/*  <Button onPress={this.movetoEdit}>
              <Icon name='edit' type="FontAwesome"/>
			  <Text>Edit</Text>
 </Button> */ }
		 <List>
            <ListItem itemHeader first>
              <Text>Firstname</Text>
            </ListItem>
            <ListItem >
              <Text>{this.state.person_givenname ? this.state.person_givenname : null}</Text>
            </ListItem>
			
			 <ListItem itemHeader first>
              <Text>Lastname</Text>
            </ListItem>
            <ListItem >
              <Text>{this.state.person_familyname ? this.state.person_familyname : null}</Text>
            </ListItem>
			
			 <ListItem itemHeader first>
              <Text>Title</Text>
            </ListItem>
            <ListItem >
              <Text>{this.state.person_jobtitle ? this.state.person_jobtitle : null}</Text>
            </ListItem>
			 <ListItem itemHeader first>
              <Text>Email</Text>
            </ListItem>
            <ListItem >
              <Text>{this.state.person_email ? this.state.person_email : null}</Text>
            </ListItem>
			 <ListItem itemHeader first>
              <Text>Linked-In</Text>
            </ListItem>
            <ListItem >
              <Text>{this.state.person_url ? this.state.person_url : null}</Text>
            </ListItem>
			 <ListItem itemHeader first>
              <Text>Telephone</Text>
            </ListItem>
            <ListItem >
              <Text>{this.state.person_telephone ? this.state.person_telephone : null}</Text>
            </ListItem>
			 <ListItem itemHeader first>
              <Text>Fax Number</Text>
            </ListItem>
            <ListItem >
              <Text>{this.state.person_faxnumber ? this.state.person_faxnumber : null}</Text>
            </ListItem>
			 <ListItem itemHeader first>
              <Text>#interests</Text>
            </ListItem>
            <ListItem >
              <Text>{this.state.person_knowsabout ? this.state.person_knowsabout : null}</Text>
            </ListItem>
			<ListItem itemHeader first>
              <Text>About</Text>
            </ListItem>
            <ListItem >
              <Text>{this.state.person_description ? this.state.person_description : null}</Text>
            </ListItem>
				<ListItem itemHeader first>
              <Text>Occupation</Text>
            </ListItem>
            <ListItem >
              <Text>{this.state.occupation ? this.state.occupation : null}</Text>
            </ListItem>

          </List>
	  </Content>
	   <Footer>
          <FooterTab>
            <Button onPress={this.movetoHome} vertical>
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
		return ( this.PersonalHtml());
	}
}

export default PersonalDetailsView;