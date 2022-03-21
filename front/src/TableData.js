import React from 'react';
import NodeForm from './NodeForm'

class TableData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nodes: []
        }
        for (const node of props.graph.nodes) {
            this.state.nodes.push({
                action: node.id,
		source: node.source,
		destination: node.destination,
                duration: 0
            })
        }

        for (const edge of props.graph.edges) {
            for (var i = 0; i < this.state.nodes.length; i++) {
                if (edge.to === this.state.nodes[i].action) {
                    this.state.nodes[i].source = edge.from
                    this.state.nodes[i].destination = edge.to
                }
            }
        }

        this.getNodes = this.getNodes.bind(this)
        this.addNode = this.addNode.bind(this)
        this.callback = this.callback.bind(this)
    }

    callback() {
        this.props.updateCallback(this.state.nodes)
    }

    getNodes() {
        return this.state.nodes.map(node => {
            return (
                <tr key={node.action}>
                    <td>{node.action}</td>
                    <td>{node.source}</td>
                    <td>{node.destination}</td>
                    <td>{node.duration}</td>
                </tr>
            )
        })
    }

    addNode(node) {
        var nodes = this.state.nodes
        nodes.push(node)
        this.callback()
        this.setState({nodes: nodes})
    }

    render() {
        return (
            <div>
                <NodeForm func={this.addNode} updateCallback={this.callback}/>
                <table className="table table-stripped">
                    <thead>
                        <tr>
                            <th>Action</th>
                            <th>Source</th>
                            <th>Destination</th>
                            <th>Duration</th>
                        </tr>
                    </thead>
                    <tbody>{this.getNodes()}</tbody>
                </table>
            </div>
        )
    }
}

export default TableData
