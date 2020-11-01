import React from 'react';
import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {renderOrderBook, MarketOrder, OrderBookState} from './Orderbook/Orderbook';
import CombinedOrderBook from './Orderbook/CombinedOrderBook'; 
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
        if (responseData && responseData.success) {
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
        else {
          console.log("Failed.")
          if (!responseData) {
            console.log("No response data.")
          } else {
            console.log("Response data.success: ",responseData.success)
            console.log("Response data.message: ",responseData.message)
          }
          console.log(responseData)
        }
        // console.log("this.state: ", this.state);
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
      if (this.state.books && this.state.books.length > 0) {
        display = <CombinedOrderBook 
                    buy={this.state.books[0]} 
                    sell={this.state.books[1]} 
                    exchange={"Bittrex"} 
                  />;
      } 
      return (
        <div className="App">
          <header className="App-header">
            <div> 
              <h1>Market: BTC-ETH</h1>
              <button onClick={this.getOrderBooks}>Get Bittrex order book</button>
              {display}
            </div>
          </header>
        </div>
      );
  }
}

export default App;
