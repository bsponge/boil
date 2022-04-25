import Graph from 'react-graph-vis';
import './App.css';
import React, { useCallback } from 'react';
import TableData from './TableData'
import { Text, StyleSheet } from 'react-native';

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

var cpmLabels = []

var time = 0

function Face(props) {
	if (props.isEditor) {
		return <TableData
		graph={props.graph}
    text={props.text}
		updateCallback={props.updateCallback}
			/>
	} else {
		//const response = fetchGraph(props.graph)
		return [<Graph
		graph={props.graph}
		options={props.options}
		events={props.events}
		style={{ height: "800px" }}
			/>,

      <Text style={styles.baseText}>
      Legenda
      <br></br>
      <Text style={styles.innerText}> Nazwa przy czynności: "A5" oznacza czynność oraz czas trwania</Text>
      <br></br>
      <Text style={styles.innerText}> Pierwszy nawias: "[0 ; 5]" oznacza najwcześniejszy start oraz koniec czynności</Text>
      <br></br>
      <Text style={styles.innerText}> Drugi nawias : "[5 ; 12]" oznacza najpóźniejszy start oraz koniec czynności</Text>
      <br></br>
      <Text style={styles.baseText}>ŚCIEŻKA KRYTYCZNA: </Text>
      <Text style={styles.CPM}>  {cpmLabels}</Text>
      <br></br>
      <Text style={styles.baseText}>CZAS REALIZACJI: </Text>
      <Text style={styles.CPM}>  {time}</Text>
    </Text>
    ]
      
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

	// convert activities to graph
	convertNodes(activityArray){

		// convert undefinded labels to string
		for(var i = 0; i < cpmLabels.length; i++) String(cpmLabels[i])

		let graph = {
			edges: [],
			nodes:[]
		}

		// add nodes to graph
		var nodeList = []
		for(var i = 0; i < activityArray.length; i++){
			if(!nodeList.includes(activityArray[i].destination)){
				nodeList.push(activityArray[i].destination)
				var node = { id: activityArray[i].destination, label: activityArray[i].destination}
				graph.nodes.push(node)
			}

			if(!nodeList.includes(activityArray[i].source)){
				nodeList.push(activityArray[i].source)
				var node = { id: activityArray[i].source, label: activityArray[i].source}
				graph.nodes.push(node)
			}
		}

		for(var i = 0; i < cpmLabels.length; i++) console.log( cpmLabels[i])
		for(var i = 0; i < activityArray.length; i++){

			var edge = { from: activityArray[i].source, to: activityArray[i].destination, label: activityArray[i].action, color: activityArray[i].color}
			graph.edges.push(edge)
		}


		return graph
	}


	edit(event) {

		const data = JSON.stringify(this.state.graph) // save data to post
		console.log("PRINT GRAPH BEFORE POST")
		console.log(this.state.graph)

		JSON.stringify(data)
		console.log("SENDING: "+data)

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
						for (var j = 0; j < this.state.graph.length; j++) {
							if (this.state.graph[j].action == data[i].label) {
                var lab = data[i].label
                this.state.graph[j].action = lab.concat(data[i].duration,"\n", "[", data[i].es, " ; ",  data[i].ef,"]",
                "\n", "[", data[i].ls, " ; ",  data[i].lf, "]")
                if(data[i].reserve == 0){
								  this.state.graph[j].color = "red"
                  cpmLabels.push(data[i].label)
                  cpmLabels.push(" -> ")
                  time += parseInt(data[i].duration)
                }
								console.log("JEST")
							}
						}
					}
				}

        cpmLabels.pop() // delete last arrow
				this.state.graph = this.convertNodes(this.state.graph)
        
				this.setState({editor: !this.state.editor})
				console.log("RECEIVED CPM DATA")
			})
			.catch((error) => {
				console.error('Error:', error);
			});

		console.log("PRINT GRAPH =========")
		console.log(this.state.graph)




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
