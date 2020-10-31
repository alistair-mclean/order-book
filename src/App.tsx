import React from 'react';
import logo from './logo.svg';
import axios from 'axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import './App.css';

// const ENDPOINT = "https://api.bittrex.com/api/v1.1";

const handleResponse = (response: AxiosResponse) => {
  console.log(response.data);
  console.log(response.status);
  console.log(response.statusText);
  console.log(response.headers);
  console.log(response.config);
};

function getTest() : void {
  console.log("Get test fired!!");
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
  .then(data => handleResponse(data))
  .catch(err => console.error(err));
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          <button onClick={getTest}>Get order book</button>
        </p>
      </header>
    </div>
  );
}

export default App;
