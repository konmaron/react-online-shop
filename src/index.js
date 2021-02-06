import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

function newFunctio() {
    console.log("HELLO!");
}

function anotherCheck() {
  console.log('HI!');
}