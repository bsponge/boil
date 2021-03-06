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
        var node = {
            action: this.state.action,
            precedingActions: [],
            duration: this.state.duration
        }
        console.log(this.state.precedingActions)
        if (typeof this.state.precedingActions == "string") {
            const precedingActions = this.state.precedingActions.replace(/\s/g, "").split(',')
            node.precedingActions.push(...precedingActions)
        }
        this.props.func(node)
        this.clearState()
    }

    render() {
        return (
            <div class="form-style-5">
                <form>
                    <label>Action:</label>
                    <input type="text" value={this.state.action} onChange={this.setAction} /><br />
                    <label>Preceding actions:</label>
                    <input type="text" value={this.state.precedingActions} onChange={this.setPrecedingActions} /><br />
                    <label>Duration</label>
                    <input type="number" min="0" value={this.state.duration} onChange={this.setDuration} /><br />
                    <button class="formButton" onClick={this.submit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default NodeForm