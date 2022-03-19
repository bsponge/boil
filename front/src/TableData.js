import React from 'react';
import NodeForm from './NodeForm'

class TableData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            nodes: []
        }

        this.getNodes = this.getNodes.bind(this)
        this.addNode = this.addNode.bind(this)
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
        this.setState({nodes: nodes})
    }

    render() {
        return (
            <div>
                <NodeForm func={this.addNode}/>
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