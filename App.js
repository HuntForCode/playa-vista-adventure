import React from 'react';
import { Platform, StyleSheet, Text, View, StatusBar } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';
import ClueDescription from './components/ClueDescription';
import ClueOverlay from './components/ClueOverlay';
import CheckInButton from './components/CheckInButton';

export default class App extends React.Component {
  state = {
    location: null,
    errorMessage: null,
  };

  componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
    }
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  render() {
    if (this.state.location == null) {
      return (<View style={styles.container} />);
    }
    else {
      return (
        
        <View style={styles.container}>
          <StatusBar hidden />
          
          
          <MapView
            style={styles.mapView}
            provider={'google'}
            region={{
              latitude: this.state.location.coords.latitude,
              longitude: this.state.location.coords.longitude,
              latitudeDelta: 0,//0.0922,
              longitudeDelta: 0.01//0.0421,
            }}
          >
            <MapView.Circle
              radius={20}
              fillColor={'#00F'}
              center={{
                latitude: this.state.location.coords.latitude,
                longitude: this.state.location.coords.longitude
              }}
            />
            <CheckInButton style={styles.checkInButton} />
          </MapView>
          <ClueOverlay style={styles.clueOverlay} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#000',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  mapView: {
    flex: 30
  },
  clueOverlay: {
    // flex: 1,
    height: 16,
    backgroundColor: '#01579B'
  },
  checkInButton: {
    // color: 'green',
    // backgroundColor: 'green',
    height: 80,
    width: 80,
    position: 'absolute',
    bottom: 16,
    alignSelf: 'center'
  }
});
