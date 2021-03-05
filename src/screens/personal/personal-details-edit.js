import React, { Component,useState } from "react";
import {StyleSheet,  TextInput, View, Image,  Alert,BackHandler,TouchableOpacity,ScrollView  } from "react-native";
import {globals} from '../../theme/globals';
import { Container, Header, Content, List, Text,ListItem, Left, Body, Right, Thumbnail,Button, Footer, FooterTab,Icon,Title, Form,Item,Input,Label,Textarea } from 'native-base';  
import AsyncStorage from '@react-native-async-storage/async-storage';
class PersonalDetailsEdit extends Component {
	state = { 

	
	
	};
	GetForm = () => {
		alert("reached")
	}
	movetoHome = () => {
		const { navigate } = this.props.navigation;

	navigate('HomeView');
	}
	movetoView = () => {
		const { navigate } = this.props.navigation;

	navigate('PersonalDetailsView');
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
		  <Button onPress={this.movetoView} transparent>
              <Icon name='arrow-back' />
            </Button>
			</Left>
          <Body>
            <Title>Edit Personal</Title>
          </Body>
          <Right />
        </Header>
		<Content style={{padding: 10}}>
		  <Image style={{marginBottom: 20}}  source={require('../../assets/logo/logo.png')} />
		  <Form OnPress={this.GetForm}>
          	<Item floatingLabel>
              <Label>Firstname</Label>
              <Input ref="firstname" />
            </Item>
           	<Item floatingLabel>
              <Label>Lastname</Label>
              <Input ref="lastname" />
            </Item>
			 	<Item floatingLabel>
              <Label>Title</Label>
              <Input ref="title" />
            </Item>
				<Item floatingLabel>
              <Label>Occupation</Label>
              <Input ref="occupation" />
            </Item>
			<Item floatingLabel>
              <Label>Email</Label>
              <Input ref="email"  />
            </Item>
			<Item floatingLabel>
              <Label>Linked-In</Label>
              <Input ref="linked_in"  />
            </Item>
			<Item floatingLabel>
              <Label>Mobile Phone</Label>
              <Input ref="mobile_phone" />
            </Item>
			<Item floatingLabel>
              <Label>Fax Number</Label>
              <Input ref="fax_number"/>
            </Item>
			<Item floatingLabel>
              <Label>#interests</Label>
              <Input ref="inerests"/>
            </Item>
			<Item floatingLabel>
              <Label>About</Label>
              <Input ref="about"/>
            </Item>
			<Button style={[globals.Top20,globals.Bottom20,globals.Left10]}>
            <Text>Submit</Text>
          </Button>
          </Form>
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

export default PersonalDetailsEdit;