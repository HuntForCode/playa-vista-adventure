import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { MapView, Constants, Location, Permissions, SQLite } from 'expo';

export default class App extends React.Component {
  state = {
    isGameStarted: false,
    clue: '',
    clueId: null,
    clueLocation: null,
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
      this._watchPositionAsync();
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

  _watchPositionAsync = async () => {
    await Location.watchPositionAsync( {enableHighAccuracy: true, distanceInterval: 4},
                                       (location) => {
                                         this.setState( {location} );
                                       });
  };

  _degreesToRadians = (degrees) => { return degrees * Math.PI / 180; }

  _distanceInMilesBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
    let earthRadiusMiles = 3958.756;

    let dLat = this._degreesToRadians(lat2-lat1);
    let dLon = this._degreesToRadians(lon2-lon1);

    lat1 = this._degreesToRadians(lat1);
    lat2 = this._degreesToRadians(lat2);

    let a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      return earthRadiusMiles * c;
  }

  _getSavedClue = () => {
    let clueId = null;

    // If user played before, continue where the user left off.
    db.transaction(tx => {
      tx.executeSql('select curr_clue from user;', 
                    [], 
                    (_, result) => {
                      if ( result.rows.length ) {
                        clueId = result.rows.item(0);
                        db.transaction(getClueDescription => {
                          getClueDescription.executeSql('select description, latitude, longitude, place_name, radius from clue inner join on location where clue.id = location.clue_id and clue.id = ?;',
                                             [clueId],
                                             (_, description_Result) => {
                                               if (description_Result.rows.length) {
                                                 let record = description_Result.rows.item(0);
                                                 this.setState( { start: true,
                                                                 clue: record.description,
                                                                 clueId: clueId,
                                                                 clueLocation: {
                                                                   latitude: record.latitude,
                                                                   longitude: record.longitude,
                                                                   placname: record.place_name,
                                                                   radius: record.radius }});}
                                                 return true;});});                                  
                      }
                      else 
                      {
                        return false;
                      }});});
  };

  _getNewClue = () => {
    db.transaction(tx => {
                          tx.executeSql('select id, description, latitude, longitude, place_name, radius from clue inner join on location where clue.id = location.clue_id and completed = 0;',
                                     [],
                                     (_, result) => {
                                       if ( result.rows.length ) {
                                         let record = result.rows.item(0);
                                         this.setState( { start: true,
                                                          clue: record.description,
                                                          clueId: record.id,
                                                          clueLocation: {
                                                                   latitude: record.latitude,
                                                                   longitude: record.longitude,
                                                                   placename: record.place_name,
                                                                   radius: record.radius }});}});});
  };

  _startPressed = () => {
    if (!this._getSavedClue) {
      this._getNewClue();
    }
    this.setState( {isGameStarted: true } );
  };

  _checkInPressed = () => {
    this._getLocationAsync();
    if (_distanceInMilesBetweenEarthCoordinates(this.state.location.coords.latitude, 
                                               this.state.location.coords.longitude, 
                                               this.state.clueLocation.latitude, 
                                               this.state.clueLocation.longitude) <= this.state.clueLocation.radius) 
    {
      this._getNewClue();
      return true;
    }
    else {
      return false;
    }
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
