import React from 'react';
import Node from './Node'

class NodeForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = new Node()
        this.setAction = this.setAction.bind(this)
        this.setSource = this.setSource.bind(this)
        this.setDestination = this.setDestination.bind(this)
        this.setDuration = this.setDuration.bind(this)
        this.clearState = this.clearState.bind(this)
        this.submit = this.submit.bind(this)

        this.nodes = []
    }

    setAction(event) {
        var state = {...this.state}
        state.action = event.target.value
        this.setState(state)
    }

    setSource(event) {
        var state = { ...this.state }
        state.source = event.target.value
        this.setState(state)
    }

	setDestination(event) {
		var state = { ...this.state }
		state.destination = event.target.value
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
            // precedingActions: [],
            source: this.state.source,
            destination: this.state.destination,
            duration: this.state.duration
        }

        this.props.func(node)
        // this.nodes.push(node)
        // console.log("nodes"+this.nodes)
        this.clearState()
    }

    render() {
        return (
            <div class="form-style-5">
                <form>
                    <label>Action:</label>
                    <input type="text" value={this.state.action} onChange={this.setAction} /><br />
                    <label>Source:</label>
		<input type="text" value={this.state.source} onChange={this.setSource} /><br />
		<label>Destination:</label>
		<input type="text" value={this.state.destination} onChange={this.setDestination} /><br />
		<label>Duration</label>
                    <input type="number" min="0" value={this.state.duration} onChange={this.setDuration} /><br />
                    <button class="formButton" onClick={this.submit}>Submit</button>
                </form>
            </div>
        )
    }
}

export default NodeForm
