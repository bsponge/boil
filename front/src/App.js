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

var cpmLabels = []

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

  // convert activities to graph
  convertNodes(activityArray){
  
    // convert undefinded labels to string
    for(var i = 0; i < cpmLabels.length; i++) String(cpmLabels[i])

    this.graph = {
      edges: [],
      nodes:[]
    }

    // add nodes to graph
    var nodeList = []
    for(var i = 0; i < activityArray.length; i++){
      if(!nodeList.includes(activityArray[i].destination)){
        nodeList.push(activityArray[i].destination)
        var node = { id: activityArray[i].destination, label: activityArray[i].destination}
        this.graph.nodes.push(node)
      }
      
      if(!nodeList.includes(activityArray[i].source)){
        nodeList.push(activityArray[i].source)
        var node = { id: activityArray[i].source, label: activityArray[i].source}
        this.graph.nodes.push(node)
      }
    }

    for(var i = 0; i < cpmLabels.length; i++) console.log( cpmLabels[i])
    for(var i = 0; i < activityArray.length; i++){
      var col
      var checker = String(activityArray[i].action)

      if(cpmLabels.includes(checker))
        col = "red"
        else
        col = "black"

      var edge = { from: activityArray[i].source, to: activityArray[i].destination, label: activityArray[i].action+activityArray[i].duration, color: col}
      this.graph.edges.push(edge)
    }

    
    return this.graph
  }
  

  edit(event) {
    
    const data = JSON.stringify(this.state.graph) // save data to post

    JSON.stringify(data)
    console.log("SENDING: "+data)
    // this.state.graph = this.convertNodes(this.state.graph)
    
    // const cpmLabels = [] // labels of CPM edges
    // get CPM from server alghoritm
    fetch('http://localhost:8080/',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: data
    })
    .then((response)=>response.json())
    .then((data)=>{
      // var cpmLabels = [] // labels of CPM edges
      console.log('SUCCES', data)
      JSON.stringify(data)
      for(var i = 0; i < data.length; i++){
          if(data[i].from != data[i].to){
            console.log("dodaje wartosc")
            console.log(data[i].label)
            console.log(typeof(data[i].label))
            cpmLabels.push(String(data[i].label))
            // cpmLabels[i] = String(data[i].label)
            console.log(typeof(cpmLabels[i]))
          }
      }
      console.log('SUCCESS 2')
      console.log(cpmLabels)
      // this.graph = this.state.graph
      // this.state.graph = this.convertNodes(this.state.graph,cpmLabels)
      
    })
    .catch((error) => {
      console.error('Error:', error);
    });

    this.state.graph = this.convertNodes(this.state.graph)
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
