import { StatusBar } from 'expo-status-bar';
import React, { useState,Component  } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {globals} from './styles/globals';
import LoginView from './components/pages/LoginView';
import LoadingIndicator from './components/misc/LoadingIndicator';
export default function App() {
  return (
  <View style={globals.container}>
     <LoginView />

  </View>
  );
}

