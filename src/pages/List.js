import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from 'react-native';

import Note from './Note';
import {Actions} from 'react-native-router-flux';
import { greaterThan } from 'react-native-reanimated';

export default class List extends Component<{}> {


constructor (props){
    super(props);
this.state={
  noteArray:[],
  noteText:'', 
}

}
	render() {
let notes= this.state.noteArray.map((val, key)=>{
   return <Note key={key} keyval={key} val={val} 
   deletemethod={()=> this.deleteNote(key)}
   ></Note>
});
      
		return(
			<View style={styles.container}>
        
				<View style={styles.Header}>
                    <Text style={styles.HeaderText}>- List View -</Text>

           </View>
           

                <ScrollView style={styles.scrollvw}>
                    {notes}
                </ScrollView>

                <View style={styles.footervw}>
                <TextInput style={styles.textinput} 
                onChangeText={(noteText)=>this.setState({noteText})}
                value={this.state.noteText}
                placeholder='Enter text here'
                 placeholderTextColor='white'
                  underlineColorAndroid='transparent'>
                </TextInput>
                </View>

                <TouchableOpacity onPress={this.addNote.bind(this)} style={styles.addButton}>
                    <Text style={styles.addbuttontext}> + </Text>
                </TouchableOpacity>

			</View>	
			);
    }

  addNote(){
      if (this.state.noteText){
var d=new Date();
this.state.noteArray.push({
  'date':d.getFullYear()+
  "/"+(d.getMonth()+1)+
  "/"+d.getDate(),
  'note':this.state.noteText
});
this.setState({noteArray:this.state.noteArray})
this.setState({noteText:''});
      }
    }

    deleteNote(key){
      this.state.noteArray.splice(key, 1);
      this.setState({noteArray: this.state.noteArray})
      }

  }

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
   },

  Header:{
    backgroundColor:'#1c313a',
    alignItems:'center',
    justifyContent:'center',
    borderBottomWidth:10,
    borderBottomColor:'#ddd',
    },

    HeaderText:{
    color:'white',
    fontSize:18,
    padding:26,
      },

      HeaderText1:{
        fontSize:14, 
        color:'white',
      borderWidth:1,
      backgroundColor:'green',
      borderStyle:'solid',
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        marginBottom:3,
      },

    scrollvw:{
    flex:1,
    marginBottom:100,
    },

    footervw:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0,
    zIndex:10,
    },

    textinput:{
    alignSelf:'stretch',
    color:'#fff',
    padding:20,
    backgroundColor:'#252525',
    borderTopWidth:2,
    borderTopColor:'#ededed',
    },

    addButton:{
      position: 'absolute',
zIndex:11,
right:20,
bottom:90,
backgroundColor:'#1c313a',
width:60,
height:60,
borderRadius:50,
alignItems:'center',
justifyContent:'center',
elevation:8,
},

addbuttontext:{
color:'#fff',
fontSize:24,
},

});
