import React from 'react';
import { HotTable } from '@handsontable/react';

const licenseKey='non-commercial-and-evaluation';

export type MarketOrder =  {
    quantity: number,
    rate: number
}

export type OrderBookState = {
    transactionType: string,
    data: Array<String | MarketOrder>,
}

export function renderOrderBook(props: OrderBookState) : any {
    if (props) {
        return (
            <OrderBook 
                transactionType={props.transactionType} 
                data={props.data}
            />
     )
    }
}

class OrderBook extends React.Component<OrderBookState, OrderBookState> {
    constructor(props: OrderBookState | any) {
        super(props);
        if (props) {
            this.state = {
                transactionType: props.transactionType,
                data: props.data,
            }
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