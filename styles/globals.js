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
	  width: 270,
      height: 260,
	   marginBottom: 25,
     
  },
  WelcomeText:{
  marginBottom:20,
  fontSize: 20,
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
  },
   logOutButton:{
	   marginBottom:15
  },
  errors:{
	  color:"red",
	  marginBottom:10
  },
})

export {globals}