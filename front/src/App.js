import Graph from 'react-graph-vis';
import './App.css';
import React, { useCallback } from 'react';
import TableData from './TableData'

async function fetchGraph(graph) {

  const response = await fetch('http://localhost:8080/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*'
    },
    body: JSON.stringify(graph)
  })
  console.log("send")
  //return await response.json()

  return {
    nodes: [
      // { id: "A", label: "Node 1", title: "node 1 tooltip text" },
      // { id: "B", label: "Node 2", title: "node 2 tooltip text" },
      // { id: "C", label: "Node 3", title: "node 3 tooltip text" },
      // { id: "D", label: "Node 4", title: "node 4 tooltip text" },
      // { id: "E", label: "Node 5", title: "node 5 tooltip text" },
    ],
    edges: [
      { from: "A", to: "B"},
      { from: "A", to: "C" },
      { from: "B", to: "D" },
      { from: "B", to: "E" },
    ]
  }
}

function Face(props) {
  if (props.isEditor) {
    return <TableData
      graph={props.graph}
      updateCallback={props.updateCallback}
    />
  } else {
    //const response = fetchGraph(props.graph)
    return <Graph
      graph={props.graph}
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
          // { id: "A", label: "Node 1", title: "node 1 tooltip text" },
          // { id: "B", label: "Node 2", title: "node 2 tooltip text" },
          // { id: "C", label: "Node 3", title: "node 3 tooltip text" },
          // { id: "D", label: "Node 4", title: "node 4 tooltip text" },
          // { id: "E", label: "Node 5", title: "node 5 tooltip text" },
        ],
        edges: [
          // { from: "A", to: "B", label: "JFKDSLFDS", color: "red" },
          // { from: "A", to: "C" },
          // { from: "B", to: "D" },
          // { from: "B", to: "E" },
        ]
      }
    }

    this.edit = this.edit.bind(this)
    this.updateGraph = this.updateGraph.bind(this)
  }

  // convert nodes to graph
  // convertNodes(nodesArray){
  //   this.graph = {
  //     edges: [],
  //     nodes:[
  //       {id: "a", label:"a"}
  //     ]
  //   }

  //   var nodeList = []
  //   for(var i = 1; i < nodesArray.length; i++){
  //     if(!nodeList.includes(nodesArray[i].destination)){
  //       nodeList.push(nodesArray[i].destination)
  //       var node = { id: nodesArray[i].destination, label: nodesArray[i].destination}
  //       this.graph.nodes.push(node)
  //     }
  //   }

  //   for(var i = 1; i < nodesArray.length; i++){
  //     var edge = { from: nodesArray[i].source, to: nodesArray[i].destination, label: nodesArray[i].action+nodesArray[i].duration}
  //     this.graph.edges.push(edge)
  //   }

  //   console.log("CREATED NEW LIST")
  //   console.log(this.graph)

  //   return this.graph
  // }

  edit(event) {
    // console.log(this.state.graph)
    // this.state.graph = this.convertNodes(this.state.graph)
    this.state.graph = fetchGraph(this.state.graph)
    this.setState({editor: !this.state.editor})
  }


  send(graph){
    // this.setState({editor: !this.state.editor})
    // fetchGraph(graph)
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
