import './App.css';
import Face from './Face.js'
import React, { useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold'
  },
  innerText: {
    color: 'black'
  },
  CPM: {
    fontWeight: 'bold',
    color: 'red'
  }
});

class App extends React.Component {


  constructor(props) {
    super(props)
  }

  render() {
    return <div>
      <Face/>
    </div>
  }
}

export default App;
