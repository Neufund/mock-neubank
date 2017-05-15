import React from 'react';

let contracts = require("./web3.js");
let web3 = contracts.web3;

class NameForm extends React.Component {
  constructor(){
    super();
    this.state = {balance: '', account:web3.eth.accounts[1]}
  }

  render(){
    return (<h4>Your account:
      <br></br>&ensp;&ensp;
        {this.state.account}
      </h4>)
  }
}

module.exports = NameForm;
