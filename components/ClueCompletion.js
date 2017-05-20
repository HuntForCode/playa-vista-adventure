import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';

class ClueCompletion extends Component {
  render() {
    return (
      <Text style={this.props.style}>
        {this.props.cluesCompleted} / 7
      </Text>
    );
  }
}

export default ClueCompletion;
