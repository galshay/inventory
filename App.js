/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import * as Sentry from "@sentry/react-native";
import {
  AppRegistry,
  StyleSheet,
  Button,
  Text,
  View,
  NavItems,
  NetInfo
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import LoginDemo from './Login.js'
import List from './ListStation.js'
import About from './About.js'
import Items from './List'

global.pos_notstart=0;
global.pos_finish=0;
global.pos_process=0;
global.pos_total=0;
global.host="";
global.usercode=0;
global.prod=true;
global.start=false;
global.periodid=1;
global.period=[];
global.posid=0;
global.pos=[];
global.hosts={
  prod: "https://service.winner.co.il/rest/TotoDMZServices/equipment/",
  test: "https://affiliates-test.winner.co.il/rest/TotoDMZServices/equipment/"
}
global.types=[];
global.host="https://service.winner.co.il/rest/TotoDMZServices/equipment/";



Stack=createStackNavigator();
export default class App extends Component {


  render() {
    Sentry.init({
      dsn: "https://457643e9febd4af389afc3abe32eaf3e@o440957.ingest.sentry.io/5410672",
    });

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginDemo} options={{headerShown: false}} />
          <Stack.Screen name="list" component={List}

          />
          <Stack.Screen name="items" component={Items} />
          <Stack.Screen name="about" component={About}
          />



        </Stack.Navigator>
      </NavigationContainer>

    );
  }
}

const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
