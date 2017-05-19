import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { MapView, Constants, Location, Permissions } from 'expo';

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
      return (<View style={styles.container}/>);
    }
    else
    {
      return (
        <MapView
        style={{ flex: 1 }}
        provider={'google'}
        region={{
          latitude:  this.state.location.coords.latitude,
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
        </MapView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
