import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import WarehouseBrowser from './WarehouseBrowser';
import * as serviceWorker from './serviceWorker';
import client from './client';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter as Router } from "react-router-dom";

const App = () => (
  <Router>
    <ApolloProvider client={client}>
      <WarehouseBrowser/>
    </ApolloProvider>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
