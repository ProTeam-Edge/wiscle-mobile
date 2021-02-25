import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View ,Image} from "react-native";
import {globals} from '../theme/globals';
class LoadingIndicator extends Component {
  render() {
    return (
    <View style={globals.container}>
		<Image style={globals.logo} source={require('../assets/logo/logo.png')} />

        <ActivityIndicator  size="large" color="#0000ff" />
   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default LoadingIndicator;