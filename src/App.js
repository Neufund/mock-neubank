import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import AppBar from 'material-ui/AppBar';

let NameForm = require("./NameForm.js");
let Transfer = require("./Transfer.js");
let Withdraw = require("./Withdraw.js");

class App extends Component {
  render() {
    return (
        <div>
          <AppBar
   title="Neufund"
   iconClassNameRight={logo}
 />
          <div><NameForm/></div>
          <div><Transfer/></div>
          <Withdraw/>
        </div>
    );
  }
}

export default App;

//Todo: maybe a logo to app bar
//  <img src={logo} className="App-logo" alt="logo" />Neufund
