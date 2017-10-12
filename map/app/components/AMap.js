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
  position: null,
  error: null,
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

      },
      position: null,
      error: null,
      region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    };
    this.onRegionChange = this.onRegionChange.bind(this);
  }

  componentDidMount() {
    console.log("geolocation:", navigator.geolocation);
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        // console.log("position:", position.coords);
        this.setState({
          position: position.coords,
          error: null,
        });
        // console.log("region:", this.state.region);
        this.onRegionChange({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 }
    );
  }

  componentWillUnmount() {
  navigator.geolocation.clearWatch(this.watchId);
  }

  onRegionChange(region) {
    this.refs.map.animateToRegion(region);
  }

  render() {
    // console.log("state:", this.state);
    return(
      <MapView
        ref="map"
        style={styles.map}
        initialRegion={this.state.region}
        // onRegionChange={this.onRegionChange}
      >
      {this.state.markers.map(marker => {
        return(<MapView.Marker
          ref="current-position"
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
      <MapView.Marker
        coordinate={this.state.position}
        image={require('../../assets/images/current_location_marker.png')}
      />
      </MapView>
    );
  }
}
