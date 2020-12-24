import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from 'react-navigation';
import HomeScreen from './src/Screens/HomeScreen';
import SecondScreen from './src/Screens/SecondScreen';
import NameScreen from './src/Screens/NameScreen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';


const navigator = createStackNavigator({
  Home: HomeScreen,
  Second: SecondScreen,
  Name: NameScreen,
}, {

  initialRouteName: 'Home',

  defaultNavigationOptions: {
    title: '#Todo',

    // headerStatusBarHeight: -20,
    cardStyle: { backgroundColor: '#1a1a2e' },


    headerStyle: {
      backgroundColor: '#16213e',

    },
    headerTintColor: '#fff',
  }
})

const App = createAppContainer(navigator)
export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
    justifyContent: 'center',
  },

});