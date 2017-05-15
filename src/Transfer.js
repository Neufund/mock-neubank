/*Withdraw and deposit Component using name forms more reading to be
done on java script security practices and how to write failsafe code*/

import React, { Component } from 'react';
import {indigoA100, blue500} from 'material-ui/styles/colors';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

let contracts = require("./web3.js");
let EuroToken = contracts.EuroToken;

//styles for nameforms
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
//Styles for buttons
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
    this.handleDeposit = this.handleDeposit.bind(this);
    this.handleWithdraw = this.handleWithdraw.bind(this);

  }
  //amount form
  handleAmountChange(event) {
    this.setState({Amount: event.target.value});
  }
  //addrs form
  handleUserChange(event) {
    this.setState({User: event.target.value});
  }
  //Deposit button
  handleDeposit(event) {

    let amount = this.state.Amount;
    let addrs = this.state.User;
    //Input checks (More research regarding javascripts security methods to be doen)
    if(amount.match(/^[0-9A-Fa-fxX]+$/) == null
       || addrs.match(/^[0-9A-Fa-fxX]+$/) == null
        || amount === ''
         || addrs === '') {

       alert("Wrong input");
       //Only amount is emptied because its annoying to rewrite the full adress again
       this.setState({Amount: ''});
       return;
     }
    if(typeof EuroToken != undefined) {
      EuroToken.deployed().then(function(instance) {
        return instance.deposit(addrs,amount);
      }).then(function(suc) {
        //to be removed after hot reloading is enabled
        window.location.reload();
      });

    }
    else {
      console.info("Contract is not deployed");
    }
  }
  //Withdraw button
    handleWithdraw(event) {

      let amount = this.state.Amount;
      let addrs = this.state.User;

      if(amount.match(/^[0-9A-Fa-fxX]+$/) == null
         || addrs.match(/^[0-9A-Fa-fxX]+$/) == null
          || amount === ''
           || addrs === '')
      {
         alert("Wrong input");
         //Only amount is emptied because its annoying to rewrite the full adress again
         this.setState({Amount: ''});
         return;
       }

      EuroToken.deployed().then(function(instance) {
        return instance.withdraw(amount, {from: addrs})
      }).then(function(suc) {
        //to be removed after hot reloading is enabled
        window.location.reload();
}).catch(function(error){
  //Maybe more reporting in the case of false withdraw
   console.info(error);
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
            value={this.state.Amount} onChange={this.handleAmountChange}/> nEur
        </form>
          <RaisedButton label="Deposit" primary={true} style={style} backgroundColor= {blue500} onClick={this.handleDeposit} />
          &ensp;<RaisedButton label="Withdraw" primary={true} onClick={this.handleWithdraw} />

      </h4>
    );
  }
}

module.exports = Transfer;
