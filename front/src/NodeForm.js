import React from 'react';
import Node from './Node'

class NodeForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = new Node()
        this.setAction = this.setAction.bind(this)
        this.setPrecedingActions = this.setPrecedingActions.bind(this)
        this.setDuration = this.setDuration.bind(this)
        this.clearState = this.clearState.bind(this)
        this.submit = this.submit.bind(this)
    }

    setAction(event) {
        var state = {...this.state}
        state.action = event.target.value
        this.setState(state)
    }

    setPrecedingActions(event) {
        var state = { ...this.state }
        state.precedingActions = event.target.value
        this.setState(state)
    }

    setDuration(event) {
        var state = { ...this.state }
        state.duration = event.target.value
        this.setState(state)
    }

    clearState() {
        this.setState(new Node())
    }

    submit(event) {
        event.preventDefault()
        const node = {...this.state}
        this.props.func(node)
        this.clearState()
    }

    render() {
        return (
            <div>
                <label>Action:</label>
                <input type="text" value={this.state.action} onChange={this.setAction}/><br/>
                <label>Preceding actions:</label>
                <input type="text" value={this.state.precedingActions} onChange={this.setPrecedingActions}/><br />
                <label>Duration</label>
                <input type="text" value={this.state.duration} onChange={this.setDuration}/><br />
                <button onClick={this.submit}>Submit</button>
            </div>
        )
    }
}

export default NodeForm