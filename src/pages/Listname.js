import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text
} from 'react-native';





export default class Listname extends Component<{}>{

  constructor(props){
super(props);
this.state = {
 isLoading : true,
 dataSource : null,
} }

componentDidMount() {
  const url = 'https://facebook.github.io/react-native/movies.json';
  fetch(url)
  .then((response)=>response.json())
  .then((responseJson)=>{
  
    this.setState({
    isLoading:false,
    dataSource:responseJson.movies,
  })
  })
    .catch((error)=>{
     console.log(error)
  });
  
   }

  

   render() {
     return(
      <View style={styles.container}>
{ this.state.isLoading && (<ActivityIndicator />)}

{ this.state.dataSource && this.state.dataSource.length >0 && this.state.dataSource.map(obj =>(
  <Text style={styles.items}>{obj.title}</Text>
 ))
}
</View>
     );
    

  

  }}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#455a64',
    flex: 1,
    alignItems:'center',
    justifyContent :'center'
  },
  items:{    
      flex:1,
      alignSelf:'stretch',
      margin:10,
      alignItems:'center',
      justifyContent:'center',
      borderBottomWidth:1,
      borderBottomColor:'#fff',
      color:'white'
      }
});
