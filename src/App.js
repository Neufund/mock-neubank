import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import Web3 from 'web3'
import contract from 'truffle-contract'
import metacoin_artifacts from '../build/contracts/MetaCoin.json'


//Set up web3 provider
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
//Set Default Account to be the Owner of contracts, in the case of truffle the first account
web3.eth.defaultAccount = web3.eth.accounts[0];

let Balance =0;
var EuroToken = contract(metacoin_artifacts);
EuroToken.setProvider(web3.currentProvider);
//console.log(EuroToken);

let balancePromise = EuroToken.deployed().then(function(instance) {
  let meta = instance;
 // console.log(meta);
  return meta.getBalance.call(web3.eth.accounts[0]);
}).then(function(meta) {
//  console.log(meta);
  Balance = meta.valueOf();
//  console.log(Balance);
   return Balance;
});

let TransPromise = EuroToken.deployed().then(function(instance) {
  let meta = instance;
 // console.log(meta);
  return meta.allEvents({fromBlock: 0, toBlock: 'latest', event: 'Transfer'});
}).then(function(events) {
  return new Promise((resolve, reject)=>{
    const res = events.get(function(error, result){
     if (error)
      reject(error);
      else
      resolve(result);

    });
  })

});

class NameForm extends React.Component {
  constructor(){
    super();
    this.state = {}
  }
  async componentDidMount() {
    const balance = await balancePromise;
    this.setState({balance, account: web3.eth.accounts[0]});
  }

  render(){
    return (<h3>Your account:
      <br></br>&ensp;&ensp;
        {this.state.account} Balance: {this.state.balance}
      </h3>)
  }
}

class Transfer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {User: '', Amount: ''};

    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleAmountChange = this.handleAmountChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleAmountChange(event) {
    this.setState({Amount: event.target.value});
  }
  handleUserChange(event) {
    this.setState({User: event.target.value});
  }

  handleSubmit(event) {
  //  alert(this.state.Amount +'\n'+ this.state.User);
    let amount = this.state.Amount;
    let addrs = this.state.User;
    EuroToken.deployed().then(function(instance) {
      let meta = instance;

      return meta.sendCoin(addrs,amount);
    }).then(function(suc) {
      var test=9;
//      console.log(suc);
    });

  }

  render() {
    return (
      <h3>Make Depositt:
        <form>
        <br></br>
          client:  <input type="text" value={this.state.User} onChange={this.handleUserChange}/>
        <br></br>
          Amount:  <input type="text" value={this.state.Amount} onChange={this.handleAmountChange}/> nEur
            <input type="submit" value="Send" onClick={this.handleSubmit}/>
        </form>
      </h3>
    );
  }
}

class Withdraw extends React.Component {
  constructor(){
    super();
  //  this.state = {Type : '', To: '', Amount: ''}
  this.state = {list: ''};
  }
  async componentDidMount() {
    const Transactions = await TransPromise;
    console.log(Transactions);

    ///let test = this.state.Type.concat(Transactions[1].event);
    var list = Transactions.map((Transactions) => {
      return [<dir>{Transactions.event} to {Transactions.args._to} {Transactions.args._value.c[0]} nEuro</dir>];
    });
    this.setState({list});
    console.log(this.state.list);

  }

  render(){

    return (<h3>Withdraws:<br></br>
        <ul>{this.state.list}</ul></h3>)
  }
}

//const Withdraw =() => (<h3>Withdraws:</h3>);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <h2>Neufund</h2>
        </div>
          <div><NameForm/></div>
          <div><Transfer/></div>
          <Withdraw/>
        </div>
    );
  }
}

export default App;
