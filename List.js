import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  SectionList,
  Button,
  View,

  Alert,
  TouchableOpacity,
  Picker,
  TextInput,
  TouchableHighlight,
  Dimensions,
  Vibration,
  Modal,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Entypo'
import {Badge, ButtonGroup, List, ListItem, SearchBar} from 'react-native-elements';
import OneList from './OneList';
import SelectButton from './SButton';
import {RNCamera, FaceDetector} from 'react-native-camera';
import Sound from 'react-native-sound'


/*import Barcode from 'react-native-smart-barcode'*/
/*import AudioPlayer from 'react-native-audioplayer';*/
import './Group.js'
import ListExcept from './Report.js'
var firstCamera=0;
const {width, height}=Dimensions.get('window');
const emulator=true
const equalWidth=(width/4)



export class Items extends React.Component {
  constructor(props) {
    super(props);
    //this.getData();
    this.state={
      dataall: [],
      start: global.start,
      finish: false,
      opencamera: false,
      barcodeNumber: '',
      typeId: -1,
      typeName: '',
      refresh: 0,
      showreport: false,
      est: [],
      diff: [],
      modalVisible: false,
      barcodeDemo:''
    }


  }
  componentDidMount() {
    this.props.navigation.setOptions({
      headerTitle: 'תחנה',
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        color: '#000000',
        alignSelf: 'center',
        fontWeight: 'bold',
      },
      headerRight: () => (
        <Button
          title={this.addOrDelete()}
          onPress={() => {
            this.endInventor();
          }}
        />
      ),
      headerLeft: () => (
        <Button
          title="חזרה"
          onPress={() => {
            this.props.navigation.navigate('list');

          }}
        />
      ),
    })
  }

  item=() => this.props.route.params.item
  deleteItem() {
    fetch(global.host+"item?tranNumber="+this.item().tranNumber+"&status=3&userCode="+global.usercode,
      {
        method: "DELETE",
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.errorId!=undefined&&responseJson.errorId!='0') {
          Alert.alert("שגיאה במחיקת ציוד", responseJson.errorDescription)

          //return false;
        }
        else {
          this.getData();
          //Actions.refresh();

        }
      })
  }
  doNothing(item) {
    //alert('aaaa');
  }
  deletePress() {
    //alert(JSON.stringify(item));
    var cm="האם בטוח שאתה רוצה למחוק?";
    var ct="אישור";
    Alert.alert(ct, cm, [{text: 'yes', onPress: () => this.deleteItem()},
    {text: 'no', onPress: () => this.doNothing()}])
    //var a=confirm("Are you sure you want to delete?");

  }


  startenvdate=() => {
    fetch(global.host+"stockTakingPeriod4Pos",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          posId: this.item().posId,
          periodId: global.period.periodId,
          action: '1',
          userCode: global.usercode,
          reason: '1'
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.errorId!=undefined&&responseJson.errorId!='0') {
          global.start=true;
          this.setState({start: true})
          //return false;
        }
        else {
          global.start=true;
          this.setState({start: true})

        }
      })
    return true;
  }
  askIfSure=() => {
    var ct="אישור";
    var cm="האם את בטוח שאתה רוצה לסיים";

    Alert.alert(ct, cm, [{text: 'yes', onPress: () => this.closeInventerToPos()},
    {text: 'no', onPress: () => this.doNothing()}])

    return true;
  }
  closeInventerToPos=() => {
    fetch(global.host+"stockTakingPeriod4Pos",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({
          posId: this.item().posId,
          periodId: global.period.periodId,
          action: '2',
          userCode: global.usercode,
          reason: '2'
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.errorId!=undefined&&responseJson.errorId!='0') {
          var ct="שגיאה בשרת";
          Alert.alert(ct, responseJson.errorDescription, [{text: 'OK'}]);

        }
        return false;

      })
  }
  getItemCount=(id) => {
    for(i=0;i<this.state.dataall.length;i++) {
      if(this.state.dataall[i].data[0].productTypeId==id) {
        return this.state.dataall[i].count;
      }
    }
    return 0;
  }
  getEstiCount=(id) => {
    if(this.state.est==undefined) return 0;
    for(i=0;i<this.state.est.length;i++) {
      if(this.state.est[i].productTypeId==id) {
        return this.state.est[i].productCount;
      }
    }
    return 0;
  }
  checkenvend=() => {
    b=[];
    for(i=0;i<this.state.dataall.length;i++) {
      for(j=0;j<this.state.dataall[i].data.length;j++) {
        //alert(JSON.stringify(this.state.dataall[i].data[j]));
        if(this.state.dataall[i].data[j].barcodeStatusId==2) {
          Alert.alert("יש לפחות ברקוד אחד לא תקין נא למחוק לפני שמירה");

          return;
        }
      }
    }
    for(j=0;j<global.types.length;j++) {

      //var items = this.state.dataall.filter(e => e.key  == global.types[j].productName);
      //var es = this.state.est.filter(e => e.productTypeId == global.types[j].productTypeId);

      var it=this.getItemCount(global.types[j].productTypeId);
      //if ( it == 0 && global.types[j].isRequired =="1")
      //{
      //  Alert.alert("חסר רישום של " + global.types[j].productName);
      //  
      //  return false;
      //}

      var es=this.getEstiCount(global.types[j].productTypeId);
      if(it!=es) {
        b.push({key: j, e: es, c: it, n: global.types[j].productName, r: global.types[j].isRequired});
        //alert(JSON.stringify(items[0].key));
        // alert(global.types[j].productName + " " +  it + " " + es);
      }
      //let it = items[0].count ;
      //var e = es[0].productCount * 1;



    }
    if(b.length>0) {
      this.setState({showreport: true, diff: b});
      return false;
    }


    if(this.askIfSure()) {
      global.start=false;
      this.setState({start: false, finish: false})
      this.props.callback;
      Actions.list();
    }
    return true;
  }
  endInventor=() => {



    if(this.state.start) {
      if(this.checkenvend()) {

      }
    }
    else {
      this.startenvdate();


    }
  }
  addOrDelete=() => {
    if(global.pos.posInvStatus===undefined&&!this.state.start) {
      return "התחלה";
    }
    if(global.pos.posInvStatus=="2")
      return "";

    if(this.state.start)
      return "סיום ספירה";
    else
      return "התחלה"
  }
  addenable=() => {
    if(this.state.start)
      return "הוספה";
    else
      return ""
  }
  postitle() {
    try {
      return " רשימת ציוד "+this.item().posId;
    }
    catch(ex) {
      return " רשימת ציוד "

    }
  }
  itemslen=() => {
    var l=0;
    try {
      for(i=0;i<this.state.dataall.length;i++) {
        l+=this.state.dataall[i].count;
      }
      return l;
    }
    catch(ex) {
      return 0;

    }
  }
  additem=() => {
    //Actions.additem_tabs({item:this.item()});
    Actions.edititems({item: this.item()});


  }
  renderCamera=() => {
    if(this.state.opencamera) {
      return (
      emulator ? <View>
      <TouchableOpacity onPress={() => {
        alert(this.state.barcodeDemo)
        this.SaveParam(this.state.barcodeDemo);
        //alert("refresh")
      }}>
        <Text>Demo</Text>
        </TouchableOpacity>
      
      
      
      
      <TextInput autoCorrect={false} placeholderTextColor='black'
            keyboardType='numeric'
            maxLength={9}
            style={{marginBottom: 20, borderColor: 'gray', borderWidth: 1, textAlign: 'right', fontSize: 20}}
            placeholder="barcode"
            value={this.state.barcodeDemo}
            onChangeText={barcode => this.setState({barcodeDemo:barcode})}

          />
          
          </View>
          :
      <RNCamera
        ref="cam"
        captureAudio={false}
        style={styles.cameraTypeOpen}
        onBarCodeRead={this._onBarcodScanner}
        type={this.state.cameraType}>
      </RNCamera>
      
      )
    }
    return <View></View>
  }


  getData() {
    var url=global.host+"itemsList?userCode="+global.usercode+"&posId="+this.item().posId+"&periodId="+global.period.periodId;
    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.errorId!=undefined&&responseJson.errorId!="0") {
          if(item().posInvStatus=="1")
            this.setState({start: true, dataall: []})
          else
            this.setState({dataall: []})
        }
        else {
          if(responseJson.tranList==undefined||responseJson.tranList.length==0) {
            result=[];
            if(item().posInvStatus=="1")
              this.setState({start: true, dataall: result, est: responseJson.estimated})
            else
              this.setState({dataall: result, est: responseJson.estimated})
            return;
          }
          try {
            let result=responseJson.tranList.gt("productTypeName");
            //alert(JSON.)
            if(item().posInvStatus=="1")
              this.setState({start: true, dataall: result, est: responseJson.estimated})
            else
              this.setState({dataall: result, est: responseJson.estimated})
          }
          catch(ex) {
            let result=responseJson.tranList;
            this.setState({dataall: result, est: responseJson.estimated})
          }
        }

      })
  }
  _onBarcodScanner=(data) => {
    console.log("data"+data.data);
    if(firstCamera==1) return;
    firstCamera=1;
    try {
      this.SaveParam(data.data);

      //this.SaveParam(data.data);
    }
    catch(ex) {
      alert(ex.message);
    }

  }
  async changeCamera(status) {
    await this.setState({opencamera: status});

  }
  async savePost(barcode) {
    await fetch(global.host+"item",
      {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          posId: this.item().posId,
          periodId: global.period.periodId,
          tranTypeId: '1',
          productTypeId: this.state.typeId,
          barcode: barcode,
          userCode: global.usercode,
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        if(responseJson.errorId!=undefined&&responseJson.errorId!='0') {
          Alert.alert("שגיאה בשמירת ברקוד", responseJson.errorDescription)
          firstCamera=0;
          this.changeCamera(false);

          return false;
        }
        else {
          //firstCamera=0;
          this.changeCamera(false);
          this.getData();


        }
      })
  }
  SaveParam=(barcode) => {

    var bc="";
    if(barcode.indexOf('-')>0)
      bc=barcode;
    else
      bc='TOTO-'+barcode;

    for(i=0;i<this.state.dataall.length;i++) {
      for(j=0;j<this.state.dataall[i].data.length;j++) {
        //alert(JSON.stringify(this.state.dataall[i].data[j]));
        if("TOTO-"+this.state.dataall[i].data[j].barcode==bc) {
          Alert.alert("מספר ברקוד כבר נמצא יש למחוק  קודם לפני רישום חדש");
          this.changeCamera(false);

          firstCamera=0;
          return;
        }
        if(this.state.dataall[i].data[j]==2) {
          this.changeCamera(false);
          Alert.alert("יש ברקוד כפול נא למחוק לפני שמירה");
          firstCamera=0;
          return;
        }
      }
    }
    // AudioPlayer.play('beep.mp3');



    try {
      this.playSound("beep.mp3");
    }
    catch(ex) {

    }
    this.savePost(bc);


  }
  playSound=(url) => {
    //setTestState(testInfo, component, 'pending');

    const callback=(error, sound) => {
      if(error) {
        Alert.alert('error', error.message);
        //setTestState(testInfo, component, 'fail');
        return;
      }
      //setTestState(testInfo, component, 'playing');
      // Run optional pre-play callback
      //testInfo.onPrepared && testInfo.onPrepared(sound, component);
      sound.play((success) => {
        if(success) {

          console.log("Play Succ");
        }
        else {
          console.log('playback failed due to audio decoding errors');
        }
        // Success counts as getting to the end
        //setTestState(testInfo, component, 'win');
        // Release when it's done so we're not using up resources
        sound.release();
      });
    };

    const sound=new Sound(url, Sound.MAIN_BUNDLE, error => callback(error, sound));
  }

  onLayout(e) {
    console.log("Layout change");
    //this.render();
  }
  renderButtonFlat=(item, width, h) => {
    try {
      if(item.posInvStatus=="1"||this.state.start) {
        return (
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'flex-start'
          }}>
            <SelectButton key={item.posId} onPress={this.openCameraFunc} types={this.state.types} />

          </View>)
      }
    }
    catch(ex) {
      alert("list 472"+ex.message);
    }
    return <View></View>

  }
  renderReport=() => {

    if(this.state.showreport) {
      return <ListExcept data={this.state.diff} save={() => {
        global.start=false;
        this.setState({start: false, finish: false});
        //this.props.callback;
        //Actions.list();
        this.closeInventerToPos();
        this.setState({showreport: false});

      }}
        cancel={() => {
          this.setState({showreport: false});

        }}
        myvisible={true} />;

    }
    return <View></View>;
  }
  openCameraFunc=(id, name) => {
    firstCamera=0;
    this.setState({opencamera: true, typeId: id, barcodeNumber: '', typeName: name})
  }
  tooltip=() => {
    if(this.state.modalVisible) {
      var b=[];
      for(i=0;i<global.types.length;i++) {
        var t=this.getEstiCount(global.types[i].productTypeId);
        //var co=this.getItemCount(global.types[i].productTypeId);
        //{key:j,e:es,c:it,n:global.types[j].productName}

        b.push({key: i, n: global.types[i].productName, e: t, c: 0});
      }
      //alert(JSON.stringify(b))
      return <ListExcept readonly={true} data={b} cancel={() => {
        this.setState({modalVisible: false})
      }} />
    }
    else
      return <View></View>

  }

  render() {

    const item=this.props.route.params.item
    console.log(item);



    var r=Math.ceil(width/60)-1;
    r=7;
    var c=Math.ceil(global.types.length/r)
    var h=(c)*30;
    return (

      <View style={styles.container}
        onLayout={this.onLayout.bind(this)}>
        {this.renderReport()}
        <View style={{
          flexDirection: 'row',
          paddingTop: 0,
          borderWidth: 0,
          backgroundColor: '#808080',
          justifyContent: 'flex-end',

        }}>

          <Text style={{paddingTop: 10}}>
            ציוד מוערך
            &nbsp;
        {item.productCounts}
        &nbsp;
          
            ציוד בפועל
            &nbsp;
        {this.itemslen()}

          </Text>
          <Icon.Button onPress={() => {
            this.getData();
            //alert("refresh")
          }} size={24} name="refresh" backgroundColor="transparent" color="blue">
          </Icon.Button>
          <Icon2.Button onPress={() => {
            this.setState({modalVisible: true})
          }} size={24} name="help-with-circle" backgroundColor="transparent" color="blue">
          </Icon2.Button>
        </View>
        {this.tooltip()}


        {this.renderButtonFlat(item, width, h)}




        <SectionList style={{}} sections={this.state.dataall}
          ItemSeparatorComponent={() =>
            <View style={{height: 1, backgroundColor: 'lightgray', width: '100%'}} />}
          keyExtractor={item => item.key}
          renderSectionHeader={({section}) =>
            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <Badge value={`${section.count}`} />
              <Text style={{
                textAlign: 'right', paddingLeft: 5,
                paddingRight: 5, fontSize: 14, width: 90,
                fontWeight: 'bold'
              }}>{section.key}</Text>
            </View>
          }

          renderItem={({item}) =>
            <View style={{
              borderBottomWidth: 1,
              flexDirection: 'row',
              flex: 1, justifyContent: 'flex-end'
            }}>
              <Icon1 name="delete" color={item.posInvStatus=="1"? "red":"gray"}
                size={32} onPress={() => {item.posInvStatus=="1"? this.deletePress(item):this.doNothing(item)}} />
              <Text style={item.barcodeStatusId=="1"?
                styles.barcodeSingle:styles.barcodeDouble}>
                {item.barcode}</Text>

            </View>

          }
        />
        <View style={this.state.opencamera? styles.cameraTypeOpen:styles.cameraTypeClose}>
          <View style={{flexDirection: 'row'}}>

            <TouchableOpacity onPress={() => {
              this.setState({opencamera: false})
            }}
              style={styles.buttonClose2}>
              <Text style={styles.textClose2}>X</Text>
            </TouchableOpacity>
            <Text style={{
              paddingLeft: 5, fontWeight: 'bold', paddingRight: 0, flex: 0.9,
              textAlign: 'right'
            }}>
              ציוד לסריקה נוכחי {this.state.typeName}
            </Text>

          </View>
          <View>

          </View>
          {this.renderCamera()}
        </View>
      </View>
    )

  }
}
const styles=StyleSheet.create({
  barcodeDouble:
  {
    paddingTop: 15,
    color: 'red'
  },
  barcodeSingle:
  {
    paddingTop: 15,

    color: 'black'
  },
  textClose1:
  {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textClose:
  {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  textClose2:
  {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonClose: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 35,
    borderColor: 'white',
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  buttonClose2: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: 'white',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  buttonClose1: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderRadius: 35,
    borderColor: 'white',
    backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  buttonOpenItem: {
    width: 50,
    height: 50,
    borderWidth: 2,
    borderRadius: 25,
    borderColor: 'white',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  textCircle:
  {
    color: 'white',
    fontSize: 14,
  },
  v:
  {
    borderRadius: 28,
    backgroundColor: '#3498db',
    borderWidth: 1,
    marginLeft: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'

  },
  buttonCloseCamera:
  {
    width: 100,
    height: 100
  },
  buttonOpenCamera:
  {
    width: 0,
    height: 0
  },
  cameraTypeClose: {
    width: 0,
    height: 0
  },
  cameraTypeOpen: {
    width: '100%',
    height: '80%',
  },
  barcode:
  {
    flex: 3,
    textAlign: 'right'
  },
  toolbar: {
    backgroundColor: '#81c04d',
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row'    //Step 1
  },
  toolbarButton: {
    width: 50,            //Step 2
    color: '#fff',
    textAlign: 'center'
  },
  toolbarTitle: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    flex: 1                //Step 3
  },

  TouchableOpacityStyle:
  {
    paddingTop: 3,
    marginTop: 4,
    backgroundColor: '#2980b9',
    flex: 1,

  },
  TouchableOpacityText:
  {
    textAlign: 'center',
    color: '#ffffff',
    marginTop: 6
  },
  title:
  {
    flexDirection: 'row',
  },
  inputformlabel:
  {
    width: 50,
  },
  name:
  {
    textAlign: 'right',
    flex: 3,
  },
  number:
  {
    textAlign: 'right',
    flex: 1,
  },
  inputformline:
  {
    flexDirection: 'row',
  },
  addr:
  {
    flexDirection: 'row',
    paddingLeft: 10,
    justifyContent: 'flex-end',
  },
  addrbutton:
  {
    flex: 1,
  },
  name:
  {
    flex: 5,
    textAlign: 'right',


  },
  cmdForm:
  {
    flexDirection: 'row',
    backgroundColor: 'lightblue',
  },
  head:
  {
    flexDirection: 'row',
    paddingLeft: 10,
    backgroundColor: 'lightgray'

  },
  addritem:
  {
    paddingLeft: 10,

  },

  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10
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
  button:
  {
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginLeft: 4,
    height: 30,
    backgroundColor: '#317af7',
    width: 100,
    borderRadius: 4,
    borderColor: 'lightgray',
    borderWidth: 2,
  },
  text: {
    color: 'white',
    textAlign: 'center'
  }
});
module.exports=Items