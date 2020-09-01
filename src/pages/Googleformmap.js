import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions
 } from 'react-native';
 import MapView from 'react-native-maps';

 const width = Dimensions.get('window').width
 const  height =  Dimensions.get('window').height
const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width/height
const LATITUDE_DELTA = 0.922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO



export default class Googleformmap extends Component{

    
constructor(props){
    super(props);
    this.state = {
        initialPosition :{
            latitude:26.850000,
            longitude:80.949997,
            latitudeDelta:0,
            longitudeDelta:0
        },
        markerPosition :{
            latitude:26.850000,
            longitude:80.949997
        }
    }
}

watchId : ?number = null
componentDidMount(){
    navigator.geolocation.getCurrentPosition((position)=>{
var lat = parseFloat(position.coords.latitude)
var long = parseFloat(position.coords.longitude)
var initialRegion = {
    latitude : lat,
    longitude: long,
    latitudeDelta:LATITUDE_DELTA,
    longitudeDelta:LONGITUDE_DELTA
}
    this.setState({initialPosition : initialPosition})
    this.setState({markerPosition : markerPosition})
    },
    (error)=>alert(JSON.stringify(error)),
    {enableHighAccuracy :true, timeout:20000, maximumAge:1000})
      this.watchId = navigator.geolocation.watchPosition((position)=>{
        var lat = parseFloat(position.coords.latitude)
        var long = parseFloat(position.coords.longitude)
        var lastRegion = {
            latitude : lat,
            longitude: long,
            latitudeDelta:LATITUDE_DELTA,
            longitudeDelta:LONGITUDE_DELTA
        }
        this.setState({initialPosition : initialPosition})
        this.setState({markerPosition : markerPosition})
      })  
}

componentWillUpdate(){
    navigator.geolocation.clearWatch(this.watchId)
}

	render() {
		return(
			<View style={styles.container}>
                <MapView
                  initialRegion={this.state.initialPosition}
                   style={{ flex:1,}} >

                        <MapView.Marker
                        coordinate={this.state.markerPosition}>
                            <View style={styles.radius}>
                                <View style={styles.marker}>

                                </View>
                            </View>
                        </MapView.Marker>

                    </MapView>
			</View>	
			)
	}
}

const styles = StyleSheet.create({
  container : {
    backgroundColor:'#fff',
    flex: 1,
   
  }
});
