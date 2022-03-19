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
                precedingActions: [],
                duration: 0
            })
        }

        for (const edge of props.graph.edges) {
            for (var i = 0; i < this.state.nodes.length; i++) {
                if (edge.to === this.state.nodes[i].action) {
                    this.state.nodes[i].precedingActions.push(edge.from)
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
                    <td>{node.precedingActions}</td>
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
                            <th>Preceding actions</th>
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