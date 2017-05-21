import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ClueDescription from './ClueDescription'
import ClueCompletion from './ClueCompletion'

class ClueOverlay extends Component {
  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.container}>
          <ClueDescription style={styles.clueDescription} clue={this.props.clue} />
          <ClueCompletion style={styles.clueCompletion} cluesCompleted={this.props.cluesCompleted} />
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
    color: 'white',
    fontSize: 20
    // fontFamily: 'Helvetica',
  },
  clueCompletion: {
    flex: 1,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'right',
    fontSize: 20
  }
})

export default ClueOverlay;
