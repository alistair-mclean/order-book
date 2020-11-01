import React from 'react';
// import logo from './logo.svg';
import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import OrderBook  from './Orderbook/Orderbook';
// import OrderBookState from './Orderbook/Orderbook';
import './App.css';

// const ENDPOINT = "https://api.bittrex.com/api/v1.1";

interface ResponseStruct {
  success : boolean,
  result: {
    buy: Array<{quantity: number, rate: number}>,
    sell: Array<{quantity: number, rate: number}>,
  },
  message: string,
}

interface AppState {
  books: Array<OrderBook>
}

class App extends React.Component<{},AppState> {
    constructor(props:AppState){
      super(props)
      this.getOrderBooks = this.getOrderBooks.bind(this);
      this.handleResponse = this.handleResponse.bind(this);
      this.state = {
        books: props.books
      }
    }
    
    handleResponse = (response: AxiosResponse): ResponseStruct => {
        const responseData: ResponseStruct = response.data ;
        let books = new Array<OrderBook>();
        if (responseData.success) {
          let props = {
            transactionType: "buy",
            data: responseData.result.buy,
          }
          const book1 = new OrderBook(props);
          props = {
            transactionType: "sell",
            data: responseData.result.sell,
          }
          const book2 = new OrderBook(props);
          books.push(book1)
          books.push(book2)
          this.setState({
            books: books
          })
        }
        console.log("this.state: ", this.state);
        return responseData
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
    return (
      <div className="App">
        <header className="App-header">
          <p>
            <button onClick={this.getOrderBooks}>Get Bittrex order book</button>
          </p>
          <div> 
            <h1>Market: BTC-ETH</h1>
            {this.state.books}
          </div>
        </header>
      </div>
    );
}
}

export default App;
