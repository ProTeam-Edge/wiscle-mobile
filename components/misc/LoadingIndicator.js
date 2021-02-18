import React, { Component } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";

class LoadingIndicator extends Component {
  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>

        <ActivityIndicator size="large" />
   
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