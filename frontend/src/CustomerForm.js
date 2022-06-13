import React from 'react';
import Customer from './Customer.js';

class CustomerForm extends React.Component {
    constructor(props) {
        super(props)

        this.state = new Customer()
        this.setName = this.setName.bind(this)
        this.setDemand = this.setDemand.bind(this)
        this.setSellingPrice = this.setSellingPrice.bind(this)
        this.clearState = this.clearState.bind(this)
        this.submit = this.submit.bind(this)
    }

    setName(event) {
        var state = { ...this.state }
        state.name = event.target.value
        this.setState(state)
    }

    setDemand(event) {
        var state = { ...this.state }
        state.demand = event.target.value
        this.setState(state)
    }

    setSellingPrice(event) {
        var state = { ...this.state }
        state.sellingPrice = event.target.value
        this.setState(state)
    }

    clearState(event) {
        this.setState(new Customer())
    }

    submit(event) {
        event.preventDefault()
        let customer = new Customer(
            this.state.name,
            0,
            this.state.demand,
            this.state.demand,
            this.state.sellingPrice
        )
        console.log(customer)
        this.clearState()
        this.props.onCustomersChange(this.state)
    }

    render() {
        return (
            <div class="form-style-5">
                <h1>Customer</h1>
                <label>Name</label><br />
                <input type="text" value={this.state.name}  onChange={this.setName}></input><br />
                <label>Demand</label><br />
                <input type="text" value={this.state.demand} onChange={this.setDemand}></input><br />
                <label>Selling price</label><br />
                <input type="text" value={this.state.sellingPrice} onChange={this.setSellingPrice}></input><br />
                <button class="formButton" onClick={this.submit}>Submit</button><br />
            </div>
        )
    }
}

export default CustomerForm