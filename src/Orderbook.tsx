import React from 'react';
import { HotTable } from '@handsontable/react';

// A MarketOrder represents a market order in an 
// orderbook. 
// type - The type of order (buy or sell).
// quantity - 
interface MarketOrder {
    // type: string,
    quantity: number,
    rate: number
}

interface OrderBookProps {
    type: string,
    data: Array<String | MarketOrder>,
}

class OrderBook extends React.Component {
    constructor(props: OrderBookProps) {
        super(props);
        this.state = {
            type: props.type,
            data: props.data,
        }
    };

    
    render() {
        let booger = [
          ["", "Ford", "Volvo", "Toyota", "Honda"],
          ["2016", 10, 11, 12, 13],
          ["2017", 20, 11, 14, 13],
          ["2018", 30, 15, 12, 13]
        ];
        return (
            <div>
                <HotTable data={booger} colHeaders={true} rowHeaders={true} width="600" height="300" />
            </div>
        )
    }
}

export default OrderBook;