import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

class CheckInButton extends Component {
  _onPressButton() {
    console.log('tap!');
  }

  render() {
    return (
      <TouchableHighlight onPress={this._onPressButton} style={this.props.style}>
        {/*<Text>CHECK</Text>*/}
        <Image source={{uri: 'https://d30y9cdsu7xlg0.cloudfront.net/png/21729-200.png'}}
       style={{width: 80, height: 80}} />
      </TouchableHighlight>
    );
  }
}

export default CheckInButton;