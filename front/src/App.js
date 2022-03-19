import Graph from 'react-graph-vis';
import './App.css';
import React, { useCallback } from 'react';
import TableData from './TableData'

async function fetchGraph(graph) {
  const response = await fetch('http://localhost:8080/', {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify(graph)
  })
  return await response.json()
}

function Face(props) {
  if (props.isEditor) {
    return <TableData
      graph={props.graph}
      updateCallback={props.updateCallback}
    />
  } else {
    const response = fetchGraph(props.graph)
    return < Graph
      graph={response}
      options={props.options}
      events={props.events}
      style={{ height: "800px" }}
    />
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      editor: true,
      graph: {
        nodes: [
          { id: "A", label: "Node 1", title: "node 1 tooltip text" },
          { id: "B", label: "Node 2", title: "node 2 tooltip text" },
          { id: "C", label: "Node 3", title: "node 3 tooltip text" },
          { id: "D", label: "Node 4", title: "node 4 tooltip text" },
          { id: "E", label: "Node 5", title: "node 5 tooltip text" },
        ],
        edges: [
          { from: "A", to: "B" },
          { from: "A", to: "C" },
          { from: "B", to: "D" },
          { from: "B", to: "E" },
        ]
      }
    }

    this.edit = this.edit.bind(this)
    this.updateGraph = this.updateGraph.bind(this)
  }

  edit(event) {
    this.setState({editor: !this.state.editor})
  }

  updateGraph(graph) {
    console.log("UPDATING GRAPH")
    console.log(graph)
    var prev = {...this.state}
    prev.graph = graph
    this.setState(prev)
  }

  render() {
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
        <div class="btn btn-three" onClick={this.edit}>
          <span>Animate</span>
        </div>
        <Face
          isEditor={this.state.editor}
          graph={this.state.graph}
          options={options}
          events={events}
          updateCallback={this.updateGraph}
        />
      </div>
    );
  }
}

export default App;
