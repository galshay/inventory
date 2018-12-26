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
export class Onelist extends Component
{
    render()
    {
    
        return <TouchableOpacity onPress={this.props.onPress} 
            style={ this.props.class}>
       <Text style={this.props.textclass}>
      {this.props.text}</Text>
     </TouchableOpacity>
       
    }
}
export class SelectButton extends Component
{
    constructor(props)
    {
        super(props);
        this.state={selectIndex:-1}
    }
    render() {
        
       
           
            return (
                <View style={{flexDirection:'row', flexWrap:'wrap',alignItems:'flex-start'}}>
                { this.props.types.map((data,index) => {
                    return (
                    <Onelist  
                    text={data.a} onPress={() =>
                    {
                        
                        this.setState({selectIndex:index})
                        this.props.callback({index});
                    }} index={index} 
                    textclass={this.state.selectIndex == index ? styles.textClose : styles.textClose1} 
                    class={ data.k == "1" ? styles.buttonClose : styles.buttonClose1}/>
                    )
                })}
                </View>
            )
        
      }

}
const styles = StyleSheet.create({
    buttonClose: {
        width:60,
        height:60,
        borderWidth: 1,
        borderRadius: 30,
  
        borderColor:'white',
        backgroundColor: 'coral',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:0,
    },
    buttonClose1: {
      width:60,
      height:60,
      borderWidth: 1,
      borderRadius: 30,
      borderColor:'white',
      backgroundColor: 'darkcyan',
      justifyContent:'center',
      alignItems:'center',
      paddingTop:0,
  },
  textClose:
  {
    color:'black',
    fontWeight:'bold',
    fontSize:12,
    flexWrap: "wrap"
  },
  textClose1:
  {
    flexWrap: "wrap",
    color:'white',
    fontWeight:'bold',
    fontSize:12
  },
    iconb:
    {
        flex:0.1,
        maxWidth:90,
        minWidth:70,
        display:'flex',
        marginTop:3,
        marginRight:13,
    },
}
/*export default class Demo extends Component {

  constructor(props)
  {
    super(props);
    this.state={types:[
        {a:"first",k:"1"},
        {a:"second",k:"1"},
        {a:"third",k:"1"},
        {a:"four",k:"0"},
        {a:"five",k:"0"},
        {a:"six",k:"0"},
        {a:"seven",k:"0"}],
       
    }

  }
  callme=(ind) =>
  {
      alert("call me" + ind.index);
  }
  render()
  {
      return <AllButton callback={this.callme} types={this.state.types} />
  }

 
}
const styles = StyleSheet.create({
    buttonClose: {
        width:60,
        height:60,
        borderWidth: 1,
        borderRadius: 30,
  
        borderColor:'white',
        backgroundColor: 'coral',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:0,
    },
    buttonClose1: {
      width:60,
      height:60,
      borderWidth: 1,
      borderRadius: 30,
      borderColor:'white',
      backgroundColor: 'darkcyan',
      justifyContent:'center',
      alignItems:'center',
      paddingTop:0,
  },
  textClose:
  {
    color:'black',
    fontWeight:'bold',
    fontSize:12,
    flexWrap: "wrap"
  },
  textClose1:
  {
    flexWrap: "wrap",
    color:'white',
    fontWeight:'bold',
    fontSize:12
  },
    iconb:
    {
        flex:0.1,
        maxWidth:90,
        minWidth:70,
        display:'flex',
        marginTop:3,
        marginRight:13,
    },
    
  container: {
    flex: 1,
    paddingLeft:0,
    paddingRight:0,
    paddingTop:30,
    backgroundColor:'lightblue'
  }
})
module.export = Demo
*/