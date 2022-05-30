import React, { useCallback } from 'react';
import Consumer from './Consumer.js'
import ReactDOM from "react-dom";
import ReactDataGrid from "react-data-grid";

class Table extends React.Component {
    constructor(props) {
        super(props)


    }

    render() {
        state = { rows };

        onGridRowsUpdated = ({ fromRow, toRow, updated }) => {
            this.setState(state => {
                const rows = state.rows.slice();
                for (let i = fromRow; i <= toRow; i++) {
                    rows[i] = { ...rows[i], ...updated };
                }
                return { rows };
            });
        };
        return (
            <ReactDataGrid
                columns={columns}
                rowGetter={i => this.state.rows[i]}
                rowsCount={3}
                onGridRowsUpdated={this.onGridRowsUpdated}
                enableCellSelect={true}
                cellRangeSelection={{
                    onStart: args => console.log(rows),
                    onUpdate: args => console.log(rows),
                    onComplete: args => console.log(rows)
                }}
            />
        )
    }
}

export default Table;