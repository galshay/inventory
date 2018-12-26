
import React, { Component } from 'react';
import { TouchableOpacity,Dimensions, View, Text,Button,StyleSheet,TouchableHighlight,To } from 'react-native';

export default class SelectButton extends Component {
  
  constructor(props) {
    super(props);
    this.state = { selectedIndex:-1}
   // alert(props.Estimate);
    
  }
  
  render() {
    return (
      <View>
          <View>
            {this.selectList()}
          </View>
      </View>
    )
  }
  
  selectList() {
    var { width,height} = Dimensions.get('window');
    var minWidth=50;
    var cl=Math.floor( width / minWidth );
    /*if ( global.types.length * minWidth < 0.8 * width )
    {
      minWidth=Math.floor(width / global.types.length )
    }*/ 
    return(
     
      global.types.map((data,index) => {
        

        var l=(index % cl) *minWidth;
      
        var t=10+Math.floor(index/cl)*(minWidth+10);
       
        return (
            <TouchableOpacity onPress={() =>
              {
                  try
                  {
                   // alert(" line 48 " + this.props.Estimate[0].productTypeId+" "+this.props.Estimate[0].productCount);
                    this.setState({selectedIndex:index})
                  this.props.onPress(data.productTypeId,data.productName);
                  }
                  catch(ex)
                  {
                    alert("button 51"+ ex.message);
                  }

              }} 
              style={data.isRequired =="0" ? styles.buttonClose : styles.buttonClose1}>
         <Text style={this.state.selectedIndex ==index ? styles.textClose : styles.textClose1}>
           {data.productName}</Text>
       </TouchableOpacity>
        
        )
      })
    )
  }
  
  _handlePressLap() {
  
    console.log("press lap");
  
  
    console.log(laps);
  
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
    textClose1:
    {
      flexWrap: "wrap",
      color:'white',
      fontWeight:'bold',
      fontSize:12
    },
  
    buttonClose: {
      width:50,
      height:50,
      borderWidth: 1,
      borderRadius: 25,

      borderColor:'white',
      backgroundColor: 'coral',
      justifyContent:'center',
      alignItems:'center',
      paddingTop:0,
  },
  buttonClose1: {
    width:50,
    height:50,
    borderWidth: 1,
    borderRadius: 25,
    borderColor:'white',
    backgroundColor: 'darkcyan',
    justifyContent:'center',
    alignItems:'center',
    paddingTop:0,
}
});