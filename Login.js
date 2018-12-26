import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
  View,
  Switch,
} from 'react-native';
import { Router,Scene,Actions,ActionConst} from 'react-native-router-flux'
import Icon from 'react-native-vector-icons/SimpleLineIcons';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import Cookie from 'react-native-cookie';
export default class LoginDemo extends Component {

  constructor(props)
  {
    super(props);
    this.state = {
      
      tznumber: '',
      userCode:'',
      dataall:[],
      prod:true,
     
     
    }
  }
  changeenv=() =>
  {
    if ( this.state.prod)
      this.setState({prod:false})
    else
      this.setState({prod:true})
    
    //this.setState()
  }
  render() {
      
   
    return (
      <View style={styles.container}>
        <View style={{flex:0.2,paddingTop:10}}>
        <Text style={styles.title}>מערכת ספירת מלאי</Text>
        </View>
        <View style={styles.loginform}>
        <TextInput autoCorrect={false}  placeholderTextColor='black' 
        keyboardType='numeric' selectextOnFocus
        maxLength={9}
        style={{height: 60, marginBottom:20,borderColor: 'gray', borderWidth: 1,textAlign:'right',fontSize:30}}
        placeholder="תעודת זהות"
        value={this.state.tznumber}
          onChangeText={tznumber => this.setState({tznumber})}
          
        />
        <View style={{flexDirection:'row',borderWidth:1,
        width:'100%',
        height:50,

        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        borderTopLeftRadius:10,
        borderTopRightRadius:10,
        backgroundColor:'blue',
        paddingBottom:0,
        marginBottom:0,
        }}>
        <TouchableOpacity onPress={() =>
              {

                  this.onLogin();
              }} 
              >
        <View style={{flexDirection:'row',paddingTop:5,marginLeft:10}}>
        <Icon name="login" color="white" size={20} style={{paddingTop:10}}/>
        <Text style={{color:'white',fontSize:20,width:'90%',fontWeight:'bold',paddingTop:5,
        textAlign:'center'}}>התחברות</Text>
        </View>
        </TouchableOpacity>
       
        </View>
        </View>
        <View style={{justifyContent:'flex-end',flex:0.3}}>
        <Text style={styles.co}> המועצה להסדר הימורים בספורט</Text>
        <Text style={styles.co}>גרסה 1.0.7</Text>
        </View>
        
      </View>
    );
  }
  types(host)
  {
    
  }
  getPeriod=()=>
  {
    //alert(global.host+"period");
    fetch(global.host+"period")

    .then((response) => response.json())
    .then((responseJson) =>
    {
      //alert(JSON.stringify(responseJson))
      try
      {
        //alert(JSON.stringify(responseJson));
        if ( responseJson.errorId != undefined && responseJson.errorId != "0")
          {

           
            Alert.alert("שגיאה","אין תקופת מלאי פעילה כעת");
            return;
          }
      global.period=responseJson;
      Actions.list({usercode:this.state.userCode,host:host,
        firstName:responseJson.firstName,
        lastName:responseJson.lastName,period:responseJson})
  
      }
      catch(ex)
      {
        alert(ex);
        periodid=4;
      }
    })
    .catch((error) => {
      Alert.alert("שגיאה בשרת נסה שוב מאוחר יותר"+error);
    });
  }
 
  gettypes=()=>
  {
    fetch(global.host+"type")
    .then((response) => response.json())
    .then((responseJson) =>
    {
      responseJson.results.sort(function(a,b){
        //return a.attributes.OBJECTID - B.attributes.OBJECTID;
        if(a.isRequired == b.isRequired)
            return 0;
        if(a.isRequired < b.isRequired)
            return 1;
        if(a.isRequired > b.isRequired)
            return -1;
    });
      global.types=responseJson.results;
      
    })
    .catch((error) => {
      Alert.alert("שגיאה בשרת נסה שוב מאוחר יותר",error);
    });
  }
  async getTzFrom()
  {
    Cookie.get(null, "tz");
  }
  async setTzFrom(tz)
  {
    Cookie.set(null, "tz",tz);
  
  }
  
  
  onLogin()
  {
    //playSound(require('./beep.mp3'));
    var usercode="";
    //const { username, password } = this.state
    var url="";
    var host="";
    
    if (this.state.prod )
    host=global.hosts.prod;
    else
    host=global.hosts.test;
    global.prod=this.state.prod;
    global.host=host;
    //this.setTzFrom(this.state.tznumber);
    //alert(this.state.tznumber);
    //alert(host + "userData?userNationalId=" +this.state.tznumber);
    
    //fetch(host + "userData?userNationalId=" +this.state.tznumber )
    fetch(host + "userData?userNationalId=" +this.state.tznumber )
    
    .then((response) => response.json())
    .then((responseJson) =>
    {
      
      //alert(JSON.stringify(responseJson));
      if ( responseJson.errorId != undefined && responseJson.errorId != 0  )
        {
          Alert.alert(responseJson.errorDescription);
          return;
        }
      usercode=responseJson.userCode
      this.setState({userCode:usercode});
      global.usercode=usercode;
      global.userjson=responseJson;
      //alert(responseJson.firstName)
      this.gettypes();
      this.getPeriod();
      
    })
    
    .catch((error) => {
      //Alert.alert("שגיאה בשרת נסה שוב מאוחר יותר"+ error);
      Alert.alert(error.message);
    });
      //this.setState({dataall:responseJson})
     
    
    
    
  }
}
const styles = StyleSheet.create({
  buttonlogin: {
    width:60,
    height:40,
    borderWidth: 3,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25,
    color:'white',
    borderColor:'white',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:10,
},
  container: {
    flex: 1,
    paddingLeft:20,
    paddingRight:20,
    backgroundColor:'lightblue'
  },
  loginform: {
    flex: 0.5,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:0,
    
  },
  title:
  {
    textAlign:'center',
    fontSize:30,
  },
  co:
  { 
    textAlign:'center',
    fontSize:18,
    marginTop:10,
    fontWeight:'bold',
  },
  TouchableOpacityStyle:
  {
    backgroundColor:'#2980b9',
    paddingVertical:15,
    marginTop:10,
    
  },
  TouchableOpacityText:
  {
    textAlign:'center',
    color:'#ffffff',
    fontSize:20,
    fontWeight:'bold'
  },
  login:
  {
    backgroundColor:'green',
    color:'red'
    
  },
  input: {
   height:80,
    backgroundColor : 'rgba(255,255,255,0.2)',
    textAlign:'right',
    paddingRight:10,
    color:'#000000',
    paddingTop:20,
  },
})
module.export = LoginDemo