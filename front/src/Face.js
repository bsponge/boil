import React, { useCallback } from 'react';
import Consumer from './Consumer.js';
import ConsumerForm from './ConsumerForm.js'
import Provider from './Provider.js';
import Route from './Route'
import ProviderForm from './ProviderForm.js'
import TableRoute from './TableRoute.js'

class Face extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            consumers: [new Consumer("O1"), new Consumer("O2"), new Consumer("O3")],
            providers: [new Provider("P1"), new Provider("P2")],
            routes: [[], []],
        }

        for (let i = 0; i < 2; i++) {
            for (let j = 0; j < 3; j++) {
                this.state.routes[i][j] = new Route(i, j, 0, 0)
            }
        }

        this.setConsumer = this.setConsumer.bind(this)
        this.setProvider = this.setProvider.bind(this)
    }

    setConsumer(consumer) {
        var prev = {...this.state}
        prev.consumers.push(consumer)
        this.setState(prev)
    }

    setProvider(provider) {
        var prev = {...this.state}
        prev.providers.push(provider)
        this.setState(prev)
    }

    submit(state) {

    }

    render() {
        return (
            <div>
                <ConsumerForm onConsumersChange={this.setConsumer}></ConsumerForm>
                <ProviderForm onProvidersChange={this.setProvider}></ProviderForm>

                <TableRoute submit={this.submit} consumers={this.state.consumers} providers={this.state.providers} routes={this.state.routes} />
            </div>
        )
    }
}

export default Face;