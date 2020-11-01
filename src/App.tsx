import React from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {renderOrderBook, MarketOrder, OrderBookState} from './Orderbook/Orderbook';
import './App.css';


interface ResponseStruct {
  success : boolean,
  result: {
    buy: Array<MarketOrder>,
    sell: Array<MarketOrder>,
  },
  message: string,
}

interface AppState {
  books: Array<OrderBookState>
}

class App extends React.Component<AppState,AppState> {
    constructor(props:AppState){
      super(props)
      this.getOrderBooks = this.getOrderBooks.bind(this);
      this.handleResponse = this.handleResponse.bind(this);
      this.state = {
        books: props.books
      }
    }
    handleResponse = (response: AxiosResponse) => {
        const responseData: ResponseStruct = response.data ;
        let books = new Array<OrderBookState>();
        if (responseData.success) {
          let props1 = {
            transactionType: "buy",
            data: responseData.result.buy,
          }
          books.push(props1);
          
          const props2 = {
            transactionType: "sell",
            data: responseData.result.sell,
          }
          books.push(props2);
          
          this.setState({
            books: books,
          });
        }
        console.log("this.state: ", this.state);
    };
    
    getOrderBooks() : void {
      const url = "/public/getorderbook"
      let params : AxiosRequestConfig = {
        headers: {
          crossdomain: true,
        },
        params:  {
          market: "BTC-ETH",
          type: "both"
        }
      };
      axios.get(url, params)
      .then(data => this.handleResponse(data))
      .catch(err => console.error(err));
    }

    render() {
      
      let display = <p>Orderbooks have not yet been retrieved.</p>;
      if (this.state.books) {
        const props = this.state.books[0];
        display = renderOrderBook(props)
      } 
      return (
        <div className="App">
          <header className="App-header">
            <p>
              <button onClick={this.getOrderBooks}>Get Bittrex order book</button>
            </p>
            <div> 
              <h1>Market: BTC-ETH</h1>
              {display}
            </div>
          </header>
        </div>
      );
  }
}

export default App;
