import logo from './logo.svg';
import Graph from "react-graph-vis";
import './App.css';
import React from 'react';
import reportWebVitals from './reportWebVitals';
import TableData from './TableData'

function Face(props) {
  if (props.isEditor) {
    return <TableData />
  } else {
    return <Graph
      graph={props.graph}
      options={props.options}
      events={props.events}
      style={{height: "800px"}}
    />
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editor: true
    }

    this.edit = this.edit.bind(this)
  }

  edit(event) {
    this.setState({editor: !this.state.editor})
  }

  

  render() {
    const graph = {
      nodes: [
        { id: 1, label: "Node 1", title: "node 1 tooltip text" },
        { id: 2, label: "Node 2", title: "node 2 tooltip text" },
        { id: 3, label: "Node 3", title: "node 3 tooltip text" },
        { id: 4, label: "Node 4", title: "node 4 tooltip text" },
        { id: 5, label: "Node 5", title: "node 5 tooltip text" },
      ],
      edges: [
        { from: 1, to: 2 },
        { from: 1, to: 3 },
        { from: 2, to: 4 },
        { from: 2, to: 5 },
      ]
    }

    const options = {
      edges: {
        color: "#000000"
      },
    }

    const events = {
      select: function (event) {
        var { nodes, edges } = event
      }
    }

    return (
      <div>
        <Face isEditor={this.state.editor} graph={graph} options={options} events={events}/>
        <button onClick={this.edit}>Animate</button>
      </div>
    );
  }
}

export default App;
