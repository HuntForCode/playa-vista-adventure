import React, { Component } from 'react';
import { Text, StyleSheet, Button, View } from 'react-native';

class StartButton extends Component {

  render() {
    return (
      <View style={this.props.style}>
        <Button
          onPress={this.props.startGame}
          title="START"
          color="green"
        />
     </View>
    );
  }
}

export default StartButton;