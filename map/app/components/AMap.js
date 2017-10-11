import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';

import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});


export default class AMap extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [
        {
          latlng: {latitude: 37.793688, longitude: -122.404568},
          title: "first",
          description: "this is a marker",
          image: require('../../assets/images/flavortown.png')
        },
        {
          latlng: {latitude: 37.803413, longitude: -122.408403},
          title: "second",
          description: "another marker",
          image: require('../../assets/images/flavortown.png')
        },
        {
          latlng: {latitude: 37.807124, longitude: -122.417313},
          title: "third",
          description: "third marker",
          image: require('../../assets/images/flavortown.png')
        }
      ],
      polyline: {
        coordinates: [{latitude: 37.793688, longitude: -122.404568}, {latitude: 37.803413, longitude: -122.408403}, {latitude: 37.807124, longitude: -122.417313}],
        strokeWidth: 3,
        strokeColor: '#4286f4',

      }
    };
  }



  render() {
    return(
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,}}
      >
      {this.state.markers.map(marker => {
        return(<MapView.Marker
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
        />);
      })}
      <MapView.Polyline
        coordinates={this.state.polyline.coordinates}
        strokeColor={this.state.polyline.strokeColor}
        strokeWidth={this.state.polyline.strokeWidth}
      />
      </MapView>
    );
  }
}
