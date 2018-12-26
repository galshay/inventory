



import React, { Component } from 'react';
import { View, Text,Button,StyleSheet,Modal,
    TouchableHighlight,
    FlatList,TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
    
export default class ListExcept extends Component {
  
  constructor(props) {
    super(props);
    this.state = { close:false,
        modalVisible:props.myvisible,
        }
    
  }
  setModalVisible=(visible)=>{
    this.setState({modalVisible: visible});
  }
  render() {
    return (
      <Modal animationType="slide"
          transparent={false}
          
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}>
          <View style={{paddingTop:20,flex:1,paddingBottom:10}}>
          <View><Text style={{textAlign:'center',fontSize:22,fontWeight:'bold'}}>דוח התאמות</Text></View>
          
          <View><Text style={{textAlign:'right',fontSize:18}}>פריטים שנספרו שלא מתאימים</Text></View>
          <View><Text style={{textAlign:'right',fontSize:18}}> לכמות צפויה כפי שנרשם</Text></View>
          <FlatList  style={{paddingTop:30}}
          renderItem={({item}) =>
      
                <View style={{flexDirection:'row'}}>
                <View style={{flex:0.25,display:this.props.readonly ? "none" : "flex"}}><Text style={{textAlign:'right',fontSize:18}}>{item.c}</Text></View>
                <View style={{flex:0.25}}><Text style={{textAlign:'right',fontSize:18}}>{item.e}</Text></View>
                <View style={{flex:0.4}}><Text style={{textAlign:'right',fontSize:18,color:item.r == "1" ? 'red':'black'}}>{item.n}</Text></View>
                
                </View>      
            }
   
         ListHeaderComponent={() =>
                <View style={{flexDirection:'row',flex:1,
                borderBottomColor:'green',borderBottomWidth:2}}>
                <View style={{flex:0.25,display:this.props.readonly ? "none" : "flex"}}><Text style={{textAlign:'right',fontWeight:'bold',fontSize:24}}>כמות קיימת</Text></View>
                <View style={{flex:0.25}}><Text style={{textAlign:'right',fontWeight:'bold',fontSize:24}}>כמות מוערכת</Text></View>
                <View style={{flex:0.4}}><Text style={{textAlign:'right',fontWeight:'bold',fontSize:24}}>ציוד</Text></View>
                </View>
            }
            ItemSeparatorComponent={() => 
            
            <View style= {{flexDirection:'row',height:2,backgroundColor:'lightgray',width:'100%',paddingTop:4}} />}
          data={this.props.data}>

          </FlatList>
          <View style={{paddingBottom:5,paddingRight:10}}>
          <Text style={{textAlign:'right',fontWeight:'bold',fontSize:20}}>שים לב !</Text>
            <Text style={{textAlign:'right',fontWeight:'bold',fontSize:20}}>סיום ספירה לא יאפשר לשנות את הספירה לתחנה</Text>
            <Text  style={{textAlign:'right',fontWeight:'bold',fontSize:20}}>שינוי יתאפשר רק בהתקשרות לטוטו</Text>
            <Text  style={{textAlign:'right',fontWeight:'bold',fontSize:20,color:'red'}}>אדום ציוד נחוץ</Text>
            
          </View>
          <View style={{flexDirection:'row',display: this.props.readonly ? "none":"flex",
          justifyContent:'space-between',paddingLeft:10,
          paddingRight:10}}>
         
          <Icon.Button onPress={() => {
            this.setModalVisible(!this.state.modalVisible)
              this.props.save();
          }} size={32} backgroundColor="green" name="check-circle" color="white">
          <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>סיום ספירה</Text>
        </Icon.Button>
        <Icon.Button onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
              this.props.cancel();
            }}size={32} backgroundColor="red" name="close" color="white">
            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>ביטול</Text>
          </Icon.Button>
    </View>
    <View style={{flexDirection:'row',display: this.props.readonly ? "flex":"none",
          justifyContent:'space-between',paddingLeft:10,
          paddingRight:10}}>
         
         
        <Icon.Button onPress={() => {
              //this.setModalVisible(!this.state.modalVisible)
              this.props.cancel();
            }}size={32} backgroundColor="red" name="close" color="white">
            <Text style={{color:'white',fontSize:20,fontWeight:'bold'}}>חזרה</Text>
          </Icon.Button>
    </View>
     </View>
     </Modal>
      )
  }
  
  
  }
  const styles = StyleSheet.create({
    textClose:
    {
      color:'black',
      fontWeight:'bold',
      fontSize:12,
      flexWrap: "wrap"
    },
  buttonClose: {
    flex:0.5,
    height:60,
    borderWidth: 2,
    borderColor:'white',
    backgroundColor: '#3498db',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:0,
},
  });
  module.exports = ListExcept