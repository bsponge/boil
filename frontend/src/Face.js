import React, { useCallback } from 'react';
import Customer from './Customer.js';
import CustomerForm from './CustomerForm.js'
import Provider from './Provider.js';
import Route from './Route'
import ProviderForm from './ProviderForm.js'
import TableRoute from './TableRoute.js'

class Face extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            customers: [new Customer("O1"), new Customer("O2"), new Customer("O3")],
            providers: [new Provider("P1"), new Provider("P2")],
            routes: [[], []],
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                this.state.routes[i][j] = new Route(i, j, 0, 0)
            }
        }

        this.setCustomer = this.setCustomer.bind(this)
        this.setProvider = this.setProvider.bind(this)
    }

    setCustomer(customer) {
        var prev = { ...this.state }
        prev.customers.push(customer)
        this.setState(prev)
    }

    setProvider(provider) {
        var prev = { ...this.state }
        prev.providers.push(provider)
        this.setState(prev)
    }

    submit(state) {
        console.log(state)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ customers: state.customers, providers: state.providers, routes: state.routes })
        }

        console.log(JSON.stringify({ customers: state.customers, providers: state.providers, routes: state.routes }))

        const request = fetch('http://localhost:8080/broker/calc', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data))
    }

    render() {
        return (
            <div>
                <TableRoute submit={this.submit} customers={this.state.customers} providers={this.state.providers} routes={this.state.routes} />
            </div>
        )
        /*return (
            <div>
                <CustomerForm onCustomersChange={this.setCustomer}></CustomerForm>
                <ProviderForm onProvidersChange={this.setProvider}></ProviderForm>

                <TableRoute submit={this.submit} customers={this.state.customers} providers={this.state.providers} routes={this.state.routes} />
            </div>
        )*/
    }
}

export default Face;