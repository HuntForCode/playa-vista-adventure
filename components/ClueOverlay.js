import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ClueDescription from './ClueDescription'
import ClueCompletion from './ClueCompletion'

class ClueOverlay extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.container}>
          <ClueDescription style={styles.clueDescription} />
          <ClueCompletion style={styles.clueCompletion} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#01579B'
  },
  clueDescription: {
    flex: 3,
    fontWeight: 'bold',
    color: 'white'
    // fontFamily: 'Helvetica',
  },
  clueCompletion: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right'
  }
})

export default ClueOverlay;
