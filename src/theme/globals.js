import {StyleSheet} from 'react-native'

const globals = StyleSheet.create({
	
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   },
  logo: {
      width: 270,
      height: 60,
      resizeMode: 'contain',
      marginBottom: 25,
  },
  userImage: {
	  width: 220,
      height: 210,
	 
     
  },
   buttonText: {
    fontSize: 17,
    color: "#fff",
  },
   button: {
    width: 280,
    height: 50,
    backgroundColor: "#55acee",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  WelcomeText:{
  marginBottom:20,
  fontSize: 20,
  },
  input: {
    width: 280,
    height: 50,
    padding: 12,
    fontSize: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor:"#3e3e3e",
    marginTop: 32,
    marginBottom: 5,
  },
  inputs:{
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
	 width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    fontSize: 17,
    padding: 10
  },
   Outer:{

    padding: '0 1rem'
  },
  loginButton:{
	   width: 280,
    height: 50,
    backgroundColor: "#55acee",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
	 marginTop: 32,
  },
   normalButton:{
	   width: 120,
    height: 50,
    backgroundColor: "#55acee",
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
	 marginTop: 10,
  },
  
   logOutButton:{
	   marginBottom:15
  },
  errors:{
	  color:"red",
	
  },
  titleText: {
    fontSize: 20,
    fontWeight: '700',
    color:  '#E0434C',
  },


})

export {globals}