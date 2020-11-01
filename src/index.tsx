import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {OrderBookState} from './Orderbook/Orderbook';

ReactDOM.render(<App books={new Array<OrderBookState>()} />,document.getElementById('root'));

reportWebVitals();
