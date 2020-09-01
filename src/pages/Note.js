import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
 
} from 'react-native';


export default class List extends Component<{}> {


	render() {
		return(
            
            <View key={this.props.keyval} style={styles.note}>
                <Text style={styles.notetext}>{this.props.val.date}</Text>
                <Text style={styles.notetext}>{this.props.val.note}</Text>

                <TouchableOpacity onPress={this.props.deletemethod} style={styles.notedel}>
                    <Text style={styles.notedeletetext}>Del</Text>
                </TouchableOpacity>

            </View>

			)
	}
}

const styles = StyleSheet.create({
    note:{
        position: 'relative',
        padding:20,
        paddingRight:100,
        borderBottomWidth:2,
        borderBottomColor: '#ededed',
        },
        
        notetext:{
        paddingLeft:20,
        borderLeftWidth:10,
        borderLeftColor:'#455a64',
        color:'white'
        },
        
        notedel:{
        position: 'absolute',
        justifyContent:'center',
        alignItems: 'center',
        backgroundColor:'#1c313a',
        padding:10,
        top:10,
        bottom:10,
        right:10,
        },
        
        notedeletetext:{
        color:'white',
        }
});
