import React from 'react';
import { HotTable } from '@handsontable/react';

const licenseKey='non-commercial-and-evaluation';
// A MarketOrder represents a market order in an 
// orderbook. 
// type - The type of order (buy or sell).
// quantity - 
type MarketOrder =  {
    // type: string,
    quantity: number,
    rate: number
}

type OrderBookState = {
    transactionType: string,
    data: Array<String | MarketOrder>,
}

class OrderBook extends React.Component<{}, OrderBookState> {
    constructor(props: OrderBookState | any) {
        super(props);
        this.state = {
            transactionType: props.transactionType,
            data: props.data,
        }
    };
    
    render() {
        const settings = {
            data: this.state.data,
            licenseKey: licenseKey,

        }
        return (
            <div>
                <HotTable settings={settings} width="600" height="300"  />
            </div>
        )
    }
}

export default OrderBook;