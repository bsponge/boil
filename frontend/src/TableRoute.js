import React from "react";
import { render } from "react-dom";
import Customer from './Customer';
import Provider from './Provider';
import Route from './Route';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';

const paperStyle={padding:'50px 20px', width:'95%',margin:"20px auto"}
const gridCell={padding:'10px', border:'1px solid black', 'background-color':'#666666'}
const gridCell2={padding:'10px', border:'1px solid black', 'background-color':'#888888'}

class TableRoute extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            customers: [],
            providers: [],
            routes: [[], []],
            status: false,
            rowKey: null,
        }


        for (const customer of props.customers) {
            this.state.customers.push(customer)
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
        this.prepareDemands = this.prepareDemands.bind(this)
        this.prepareCosts = this.prepareCosts.bind(this)
        this.onCostChange = this.onCostChange.bind(this)
        this.onDemandChange = this.onDemandChange.bind(this)
        this.onSupplyChange = this.onSupplyChange.bind(this)
        this.submit = this.submit.bind(this)
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

    onDemandChange(event, id) {
        let prev = {...this.state}
        try {
            prev.customers[id].demand = parseInt(event.target.value)
            this.setState(prev)
        } catch (error) {}
    }

    onSupplyChange(event, id) {
        let prev = { ...this.state }
        try {
            prev.providers[id].supply = parseInt(event.target.value)
            this.setState(prev)
        } catch (error) { }
    }

    prepareCosts() {
        let components = []

        for (let i = 0; i < this.state.routes.length; i++) {
            let tds = [<td>{this.state.providers[i].name}</td>, <td><input id={i} onChange={event => this.onSupplyChange(event, i)} value={this.state.providers[i].supply}/></td>]
            for (let j = 0; j < this.state.routes[i].length; j++) {
                tds.push(<td><input row={i} column={j} onChange={event => this.onCostChange(event, i, j)} value={this.state.routes[i][j].costOfTransport}/></td>)
            }
            components.push(<tr>{tds}</tr>)
        }

        return components
    }

    prepareDemands() {
        let components = []

        for (let i = 0; i < this.state.customers.length; i++) {
            components.push(<td><input id={i} onChange={event => this.onDemandChange(event, i)} value={this.state.customers[i].demand}/></td>)
        }

        return components
    }

    submit(event) {
        this.props.submit(this.state)
    }

    render() {
        return (
            <Paper style={paperStyle}>
                <Grid container>
                    <Grid container>
                        <Grid item xs={3} style={gridCell}>
                            Dostawcy i  Odbiorcy
                        </Grid>
                        <Grid item xs={3} style={gridCell}>
                            <TextField label="Odbiorca 1" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.customers[0].name=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                            <TextField label="Cena sprzedaży" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.customers[0].sellingPrice=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                            <TextField label="Popyt" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.customers[0].demand=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                        </Grid>
                        <Grid item xs={3} style={gridCell}>
                            <TextField label="Odbiorca 2" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.customers[1].name=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                            <TextField label="Cena sprzedaży" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.customers[1].sellingPrice=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                            <TextField label="Popyt" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.customers[1].demand=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                        </Grid>

                        <Grid item xs={3} style={gridCell}>
                            <TextField label="Odbiorca 3" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.customers[2].name=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                            <TextField label="Cena sprzedaży" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.customers[2].sellingPrice=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                            <TextField label="Popyt" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.customers[2].demand=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={3} style={gridCell}>
                            <TextField label="Dostawca 1" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.providers[0].name=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                            <TextField label="Cena zakupu" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.providers[0].costOfPurchase=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                            <TextField label="Podaż" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.providers[0].supply=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                        </Grid>
                        <Grid item xs={3}  style={gridCell2}>
                            Trasa 1
                            <TextField label="Koszt transportu" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.routes[0][0].costOfTransport=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                        </Grid>
                        <Grid item xs={3}  style={gridCell2}>
                            Trasa 2
                            <TextField label="Koszt transportu" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.routes[0][1].costOfTransport=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                        </Grid>
                        <Grid item xs={3}  style={gridCell2}>
                            Trasa 3
                            <TextField label="Koszt transportu" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.routes[0][2].costOfTransport=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                        </Grid>
                    </Grid>

                    <Grid container>
                        <Grid item xs={3} style={gridCell}>
                            <TextField label="Dostawca 2" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.providers[1].name=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                            <TextField label="Cena zakupu" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.providers[1].costOfPurchase=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                            <TextField label="Podaż" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.providers[1].supply=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                        </Grid>
                        <Grid item xs={3}  style={gridCell2}>
                            Trasa 4
                            <TextField label="Koszt transportu" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.routes[1][0].costOfTransport=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                        </Grid>
                        <Grid item xs={3}  style={gridCell2}>
                            Trasa 5
                            <TextField label="Koszt transportu" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.routes[1][1].costOfTransport=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                        </Grid>
                        <Grid item xs={3}  style={gridCell2}>
                            Trasa 6
                            <TextField label="Koszt transportu" variant="outlined" 
                                onChange={(e)=>{
                                    let tmp = {...this.state}
                                    try{
                                        tmp.routes[1][2].costOfTransport=e.target.value
                                        this.setState(tmp)
                                    }catch(error) { }
                                }} />
                        </Grid>
                    </Grid>
                    
                </Grid>
                <button class="formButton" onClick={this.submit}>Optymalizuj</button><br />
            </Paper>
        )
        /*return (
            <div class="form-style-5">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            {this.props.customers.map(customer => {
                                return (
                                    <th>{customer.name}</th>
                                )
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td/>
                            <td/>
                            {this.prepareDemands()}
                        </tr>
                        {this.prepareCosts()}
                    </tbody>
                </table>
                <button class="formButton" onClick={this.submit}>Submit</button><br />
            </div>
        )*/
    }
}

export default TableRoute;