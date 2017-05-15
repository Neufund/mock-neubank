import React, { Component } from 'react';
import {indigoA100, blue500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

let contracts = require("./web3.js");
let web3 = contracts.web3;
let EuroToken = contracts.EuroToken;
const styles = {
  errorStyle: {
    color: blue500,
  },
  underlineStyle: {
    borderColor: blue500,
  },
  floatingLabelStyle: {
    color: blue500,
  },
  floatingLabelFocusStyle: {
    color: indigoA100,
  },
};

const style = {
  backgroundColor: indigoA100,
  margin: 12,
};

class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {User: '', Amount: ''};

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);
  }
  handleAmountChange(event) {
    this.setState({Amount: event.target.value});
  }
  handleUserChange(event) {
    this.setState({User: event.target.value});
  }

  handleSubmit(event) {
    alert(this.state.Amount +'\n'+ this.state.User);
    let amount = this.state.Amount;
    let addrs = this.state.User;
    EuroToken.deployed().then(function(instance) {
      let meta = instance;

      return meta.deposit(addrs,amount);
    }).then(function(suc) {
      return ;
    });
  }
    handleWithdraw(event) {
      alert(this.state.Amount +'\n'+ this.state.User);
      let amount = this.state.Amount;
      let addrs = this.state.User;
      EuroToken.deployed().then(function(instance) {
        let meta = instance;
        console.log(meta);
        return meta.withdraw(amount, {from: addrs});
      }).then(function(suc) {
  return;
    });
  }



  render() {
    return (
      <h4>
        <form>
          <TextField
         floatingLabelText="Account address"
     floatingLabelStyle={styles.floatingLabelStyle}
     floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
      value={this.state.User} onChange={this.handleUserChange}/>
        <br></br>
           <TextField
          floatingLabelText="Amount"
      floatingLabelStyle={styles.floatingLabelStyle}
      floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
       value={this.state.Amount} onChange={this.handleAmountChange}
          /> nEur
          </form>
            <RaisedButton label="Deposit" primary={true} style={style} backgroundColor= {blue500} onClick={this.handleSubmit} />
            &ensp;<RaisedButton label="Withdraw" primary={true} onClick={this.handleWithdraw} />

        </h4>
    );
  }
}

module.exports = Transfer;
