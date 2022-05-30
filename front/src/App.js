import './App.css';
import Table from './Table.js'
import ConsumerForm from './ConsumerForm.js'
import Face from './Face.js'
import ProviderForm from './ProviderForm.js'
import React, { useCallback } from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTable } from "react-table";

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
