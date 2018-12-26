import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { ListItem, SearchBar,ButtonGroup } from 'react-native-elements';
import { Actions,ActionConst} from 'react-native-router-flux'
import NavigationBar from 'react-native-navbar'


/*import { List , ListItem } from 'react-native-elements'*/
var filtertemp="";
var indextemp=-1;
export class ListStation  extends React.Component
{
 getdata=() =>
 {
  var url=global.host+"posList?userCode=" + global.usercode+'&periodId='+global.period.periodId;
  fetch(url)
  .then((response) => response.json())
  .then((responseJson) =>
  {
    if ( responseJson.pos ==  undefined)
    {
      Alert.alert("אין תחנות משויכות למשתמש זה");
    }
    global.pos_notstart=0;
    global.pos_process=0;
    global.pos_finish=0;
    global.pos_total=0;
    for(i=0;i<responseJson.pos.length;i++)
    {
      var p=responseJson.pos[i];
      if ( p.posInvStatus == undefined ) global.pos_notstart++;
      if ( p.posInvStatus == "1" ) global.pos_process++;
      if ( p.posInvStatus == "2" ) global.pos_finish++;
    }
    global.pos_total=responseJson.pos.length;
    this.setState({dataall:responseJson.pos,filterall:responseJson.pos})
    
  })
  .catch((error) => {
    Alert.alert("שגיאה בשרת נסה שוב מאוחר יותר"+error);
  });
 } 
 constructor(props)
 {
   
    super(props);
    this.state={dataall:null,selectedIndex:0}
    this.updateIndex = this.updateIndex.bind(this)
  
 }
 updateIndex (selectedIndex) {
  this.setState({selectedIndex})
  setTimeout(this.filter, 300);
  //this.filter()
}

 componentDidMount()
 {
  this.getdata();
 }
clickme(item)
{
  global.posid=item.posId;
  global.pos=item;
  Actions.items({item:item,callback:this.getdata});
  //Actions.refresh();
}
FlatListHeader =() =>
  {
    return (<View style={{flex:1,flexDirection:'row',justifyContent:'flex-end'}}>
    <Text style={{flex:2,color:'green',textAlign:'right',fontSize:24,fontWeight:'bold'}}>כתובת</Text>
    <Text style={{flex:2,color:'blue',textAlign:'right',fontSize:24,fontWeight:'bold'}}>שם</Text>
   <Text style={{flex:1,color:'blue',textAlign:'right',fontSize:24,fontWeight:'bold'}}>מספר</Text>
 
    </View>)
  }
  filter=(text) =>
  {
    if ( text != undefined)
      filtertemp=text;
    else
      text=filtertemp;
    var d=this.state.filterall;
    var ty=this.state.selectedIndex;
    
    var df=[];
    
    for (i=0;i<d.length;i++)
      {
        if ( (d[i].posName.indexOf(text) > -1) || 
            (d[i].posId.indexOf(text) > -1) || 
            text == "" )
          {
            if ( ty == 0 )
                df.push(d[i]);
            if ( ty == 1 && d[i].posInvStatus =="2")
              df.push(d[i]);
            if ( ty == 2 && d[i].posInvStatus =="1")
              df.push(d[i]);
            if ( ty == 3 && d[i].posInvStatus == undefined)
              df.push(d[i]);
            
          }
         
      }
    
    this.setState({dataall:df});
    
  }
  renderHeader = () => {
    return <SearchBar onChangeText={(text) =>this.filter(text)} placeholder="Type Here..." lightTheme round />;
  };
  renderFooter = () => {
    return <View><Text>{global.pos_finish}</Text></View>;
  };
  scrollToLast = () => {
    let randomIndex = global.pos_finish+pos_notstart+pos_process-1;
    this.flatListRef.scrollToIndex({animated: true, index: randomIndex});
  }
  scrollToTop = () => {
    let randomIndex = 0;
    this.flatListRef.scrollToIndex({animated: true, index: randomIndex});
  }
  scrollToIndex = (index) => {
    let randomIndex = index;
    this.flatListRef.scrollToIndex({animated: true, index: randomIndex});
  }
  render()
    
    {
      const buttons = ['הכל', 'סיום', 'התחיל','לא התחיל']
      const { selectedIndex } = this.state
      getstylepos=(status) =>
      {
        var color="black";
        switch ( status )
        {
          case '2':
            color='green';break;
          case '1':
            color='blue';break;
          default:
            color='black';break;
        }
        
        return color;
        
        
      }
      geticon=(status) =>
      {
        if ( status == '2')
          return 'done';
        if ( status == '1')
          return 'autorenew';
        
          return 'highlight-off';
          
      }
      if ( this.state.dataall == null)
      {
        return <ActivityIndicator  size="large"/>
      }
    return (
      
    <View>
       
        <NavigationBar
      title={{ title: 'תחנות', tintColor: 'black', }}
  leftButton={{ title: 'אודות', handler:() => Actions.about()}}
  rightButton={{ title: 'רענון', handler:() => this.getdata() }}
  style={{ backgroundColor: "white", }}
  statusBar={{ tintColor: "white", }}
    />
        <View style={styles.container1}>       
        <ButtonGroup
      onPress={this.updateIndex}
      selectedIndex={selectedIndex}
      buttons={buttons}
      containerStyle={{height: 20}} />
        <FlatList
            ref={(ref) => { this.flatListRef = ref; }}
            data={this.state.dataall}
            ListHeaderComponent={this.renderHeader}
            keyExtractor= {item => item.posId}
            ListFooterComponent={this.renderFooter}
            renderItem={({item}) =>
            (
           
           
           
           
           
           
           
           
           
              <ListItem
              titleStyle ={{textAlign:'right',flex:1,
              color :getstylepos(item.posInvStatus)}}
              title={`${item.posName} ${item.posId}`}
                subtitle={item.posAddress}
                eftIcon={{name: geticon(item.posInvStatus),color:'green'}}
                subtitleStyle={{textAlign:'right',flex:1}}
                onPress={() => this.clickme(item)}
                />
          
            )}
            

        />
        </View>
        </View>
        )
    }
    }
const styles = StyleSheet.create({
title:
{
  flexDirection:'row',
},
inputformlabel:
{
  width:50,
},
inputformline:
{
	flexDirection:'row',
},
addr:
  {
    flexDirection:'row',
    paddingLeft:10,
    justifyContent:'flex-end',   
  },
  addrbutton:
  {
    flex:1,
  },
  name:
  {
    flex:5,
    paddingTop:4,
    textAlign:"right",
    fontSize:24,
    
  },
  cmdForm:
  {
    flexDirection:'row',
    backgroundColor:'lightblue',
  },
  head:
  {
    flexDirection:'row',
    paddingLeft:10,
    backgroundColor:'lightgray'
    
  },
  addritem:
  {
    paddingLeft:10,
    
  },

  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    paddingLeft:10,
    paddingRight:10
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

module.exports= ListStation