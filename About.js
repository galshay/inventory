import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  View
} from 'react-native';
import NavigationBar from 'react-native-navbar'
import { Router,Scene,Actions,ActionConst} from 'react-native-router-flux'

export default class About extends Component {
getday=(days) =>
{
  return days.substring(0,10);
}
render()
{
    return(<View style= {styles.container}>
      <NavigationBar
      title={{ title: "דף ראשי", tintColor: 'black', }}
  leftButton={{ title: "תחנות", handler:() => { Actions.list()} }}
  style={{ backgroundColor: "white", }}
  statusBar={{ tintColor: "white", }}
    />
      <View style={{flex:1}}><Text style={{flex:1,textAlign:'center',fontWeight:'bold'}}>פרטים כללים</Text></View>
      <View style={styles.tablerow}>
        <Text style={styles.tableValue}>{global.userjson.firstName} </Text>
        <Text style={styles.tableHeader}>שם פרטי:</Text>
        
      </View>
      <View style={styles.tablerow}>
      
      <Text style={styles.tableValue}>{global.userjson.lastName}</Text>
      <Text style={styles.tableHeader}>שם משפחה:</Text>
      
      </View>
      
      
      <View style={styles.tablerow}>
      <Text style={styles.tableValue}>{global.usercode} </Text>
      <Text style={styles.tableHeader}>קוד משתמש: </Text>
      </View>

      <View style={styles.tablerow}>
      <Text style={styles.tableValue}>{this.getday(global.period.fromDate)} </Text>
      <Text style={styles.tableHeader}>מתאריך: </Text>
      </View>

      <View style={styles.tablerow}>
      <Text style={styles.tableValue}>{this.getday(global.period.toDate)} </Text>
      <Text style={styles.tableHeader}>עד תאריך: </Text>
      </View>

      <View style={styles.tablerow}>
      <Text style={styles.tableValue}>{global.period.periodId} </Text>
      <Text style={styles.tableHeader}>קוד:</Text>
      </View>

      <View style={styles.tablerow}>
      <Text style={styles.tableValue}> </Text>
      <Text style={styles.tableHeader} >תחנות:</Text>
     
      </View>
     
      <View style={styles.tablerow}>
      <Text style={styles.tableValue}>{global.pos_finish} </Text>
      <Text style={styles.tableHeader}>הסתיימו:</Text>
      </View>
      <View style={styles.tablerow}>
      <Text style={styles.tableValue}>{global.pos_notstart} </Text>
      <Text style={styles.tableHeader}>לא התחילו:</Text>
      </View>
      <View style={styles.tablerow}>
      <Text style={styles.tableValue}>{global.pos_process} </Text>
      <Text style={styles.tableHeader}>בתהליך:</Text>
      </View>
      <View style={styles.tablerow}>
      <Text style={styles.tableValue}>{global.pos_process+global.pos_finish+global.pos_notstart} </Text>
      <Text style={styles.tableHeader}>סה"כ:</Text>
      </View>
     
      </View>)
}
}
module.export = About
const styles = StyleSheet.create({
  container: {
    flex: 0.4,
    paddingTop:30,
    justifyContent:'center',
    paddingRight:10,
  },
  tablerow:
  {
    flex:1,
    flexDirection:'row',
    alignItems:'flex-end',
  },
  tableHeader:
  {
    textAlign:'right',
    flex:0.4,
  },
  tableValue:
  {
    flex:0.4,
    fontWeight:'bold',
    alignItems:'flex-end',
    textAlign:'right'    
  }
})
