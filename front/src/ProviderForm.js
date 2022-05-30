import React from 'react';
import Provider from './Provider';

class ProviderForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = new Provider()
        this.setName = this.setName.bind(this)
        this.setSupply = this.setSupply.bind(this)
        this.setCostOfPurchase = this.setCostOfPurchase.bind(this)
        this.clearState = this.clearState.bind(this)
        this.submit = this.submit.bind(this)
    }

    setName(event) {
        var state = { ...this.state }
        state.name = event.target.value
        this.setState(state)
    }

    setSupply(event) {
        var state = { ...this.state }
        state.supply = event.target.value
        this.setState(state)
    }

    setCostOfPurchase(event) {
        var state = { ...this.state }
        state.costOfPurchase = event.target.value
        this.setState(state)
    }

    clearState(event) {
        this.setState(new Provider())
    }

    submit(event) {
        event.preventDefault()
        let provider = new Provider(
            this.state.name,
            0,
            this.state.supply,
            this.state.supply,
            this.state.costOfPurchase
        )
        console.log(provider)
        this.clearState()
        this.props.onProvidersChange(this.state)
    }

    render() {
        return (
            <div class="form-style-5">
                <h1>Provider</h1>
                <label>Name</label><br />
                <input type="text" value={this.state.name}  onChange={this.setName}></input><br />
                <label>Supply</label><br />
                <input type="text" value={this.state.supply} onChange={this.setSupply}></input><br />
                <label>Cost of purchase</label><br />
                <input type="text" value={this.state.costOfPurchase} onChange={this.setCostOfPurchase}></input><br />
                <button class="formButton" onClick={this.submit}>Submit</button><br />
            </div>
        )
    }
}

export default ProviderForm