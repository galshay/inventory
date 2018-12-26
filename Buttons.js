import React from 'react';
import {
  Text,
  StatusBar,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  PropTypes,
  View,
} from 'react-native';
export class  ButtonSelect extends React.Component
{
  render()
  {  
  return(
  <View style={styles.v}>
  <TouchableHighlight
  underlayColor="red"
  onPress={onPress}
  >
    <Text style={styles.textCircle}>{text}</Text>
    </TouchableHighlight>
    </View>
  )
}
}
ButtonSelect.propTypes = {
    buttonStyle: PropTypes.any,
    title: PropTypes.string,
    onPress: PropTypes.any,
    icon: PropTypes.object,
    secondary: PropTypes.bool,
    secondary2: PropTypes.bool,
    secondary3: PropTypes.bool,
    primary1: PropTypes.bool,
    primary2: PropTypes.bool,
    primary3: PropTypes.bool,
    backgroundColor: PropTypes.string,
    color: PropTypes.string,
    fontSize: PropTypes.number,
    underlayColor: PropTypes.string,
    raised: PropTypes.bool,
    textStyle: PropTypes.any
  }
const styles = StyleSheet.create({
    
textCircle:
{
    color:'white',
},
v:
  {borderRadius: 28,
    backgroundColor: '#3498db',
    paddingTop: 10,
    paddingBottom: 10,
    borderWidth: 1,
    width:80,
    marginLeft:5,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
    
}})