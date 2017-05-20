import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

class ClueDescription extends Component {
  render() {
    return (
      <Text style={this.props.style}>
        Popular choice for for lunch...
        {/*{this.props.clueDescription}*/}
      </Text>
    );
  }
}

export default ClueDescription;
