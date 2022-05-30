import React, { useCallback } from 'react';
import ConsumerForm from './ConsumerForm.js'
import ProviderForm from './ProviderForm.js'
import Table from './Table.js'

class Face extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            consumers: [],
            providers: [],
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

    render() {
        return (
            <div>
                <ConsumerForm onConsumersChange={this.setConsumer}></ConsumerForm>
                <ProviderForm onProvidersChange={this.setProvider}></ProviderForm>

                <Table consumers={this.state.consumers} providers={this.state.providers} />
            </div>
        )
    }
}

export default Face;