/*Bank owner Component*/
import React from 'react';

let contracts = require("./web3.js");
let web3 = contracts.web3;

class NameForm extends React.Component {
  constructor() {
    super();
    //the first acount is the owner and the default deployer with truffle
    if(web3 === undefined) {
      console.info("Web3 was not defined");
    } else {
      this.state = {account:web3.eth.accounts[0]}
    }
  }

  render() {
    return (<h4>Bank owner:
              <br></br>&ensp;&ensp;
                {this.state.account}
            </h4>)
    }
}

module.exports = NameForm;
