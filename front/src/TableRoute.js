import React from "react";
import { render } from "react-dom";
import Consumer from './Consumer'
import Provider from './Provider'
import Route from './Route'

class TableRoute extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            consumers: [],
            providers: [],
            routes: [[], []],
            status: false,
            rowKey: null,
        }

        for (const consumer of props.consumers) {
            this.state.consumers.push(consumer)
        }

        for (const provider of props.providers) {
            this.state.providers.push(provider)
        }

        for (let i = 0; i < props.routes.length; i++) {
            for (let j = 0; j < props.routes[i].length; j++) {
                this.state.routes[i].push(props.routes[i][j])
            }
        }

        this.onEdit = this.onEdit.bind(this)
        this.prepare = this.prepare.bind(this)
        this.onCostChange = this.onCostChange.bind(this)
    }

    onEdit(event) {
        let prev = {...this.state}
    }

    onCostChange(event, row, column) {
        let prev = {...this.state}
        try {
            prev.routes[row][column].costOfTransport = parseInt(event.target.value)
            this.setState(prev)
        } catch (error) {}
    }

    prepare() {
        let components = []

        for (let i = 0; i < this.state.routes.length; i++) {
            let tds = [<td>{this.state.providers[i].name}</td>, <td><input value={this.state.providers[i].supply}/></td>]
            for (let j = 0; j < this.state.routes[i].length; j++) {
                tds.push(<td><input row={i} column={j} onChange={event => this.onCostChange(event, i, j)} value={this.state.routes[i][j].costOfTransport}/></td>)
            }
            components.push(<tr>{tds}</tr>)
        }

        return components
    }

    submit(event) {
        this.props.submit(this.state)
    }

    render() {
        return (
            <div>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            {this.props.consumers.map(consumer => {
                                return (
                                    <th>{consumer.name}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td/>
                            <td/>
                            {this.props.consumers.map(consumer => {
                                return (
                                    <td><input value={consumer.demand}/></td>
                                )
                            })}
                        </tr>
                        {this.prepare()}
                    </tbody>
                </table>
                <button class="formButton" onClick={this.submit}>Submit</button><br />
            </div>
        )
    }
}

export default TableRoute;