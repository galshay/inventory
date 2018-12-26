/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavItems,
  NetInfo
} from 'react-native';
import {
  Scene,
  Router,
  Actions,
  Reducer,
  ActionConst,
  Drawer,
  Stack,
  Lightbox
} from "react-native-router-flux";
import LoginDemo from  './Login.js'
import ListStation from './ListStation.js'
import About from './About.js'
import Items from './List'
const reducerCreate = params => {
  const defaultReducer = new Reducer(params);
  return (state, action) => {
    console.log("ACTION:", action);
    return defaultReducer(state, action);
  };
};
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
global.hosts={prod:"https://service.winner.co.il/rest/TotoDMZServices/equipment/",
test:"https://affiliates-test.winner.co.il/rest/TotoDMZServices/equipment/"}
global.types=[];
global.host="https://service.winner.co.il/rest/TotoDMZServices/equipment/";




export default class App extends Component {
  render() {
    return (
    <View style={{ flex: 1 }}>
    <Router createReducer={reducerCreate}>
   
      <Scene key="root" showLable="false" hideNavBar="true"> 
      <Scene key="login" component={LoginDemo} />
      <Scene  key="list" component={ListStation}/>
      <Scene key="about" component={About}/>
      <Scene key="items" component={Items}/>
     
     </Scene>
    </Router>
   </View>
   );
  }
}

const styles = StyleSheet.create({
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
