import { OrderBookState, renderOrderBook } from './Orderbook'
import './CombinedOrderBook.css';
import React from 'react';

export type CombinedOrderBookState = {
    buy: OrderBookState,
    sell: OrderBookState,
    exchange: string
}
class CombinedOrderBook extends React.Component<CombinedOrderBookState, CombinedOrderBookState> {
    constructor(props:CombinedOrderBookState) {
        super(props);
        if (props) {
            this.state = {
                buy: props.buy,
                sell: props.sell, 
                exchange: props.exchange
            }
        }
    }

    render() {
        return (
            <ul className="combined">
                <h2>{this.state.exchange}</h2>
                <li className="combined"><h3>BUY</h3>{renderOrderBook(this.state.buy)}</li>
                <li className="combined"><h3>SELL</h3>{renderOrderBook(this.state.sell)}</li>
            </ul>
        )
    }
}

export default CombinedOrderBook;