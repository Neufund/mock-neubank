import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
//import './MetaCoin.json'
import Web3 from 'web3'
import contract from 'truffle-contract'
import metacoin_artifacts from './MetaCoin.json'

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];
console.log(web3.eth.getBalance(web3.eth.accounts[0]));
//var json = require('./MetaCoin.json');
//var MetaCoin = web3.eth.contract(json.abi);
var MetaCoin = contract(metacoin_artifacts);
//MetaCoin.setProvider(web3.currentProvider);

var contractAddress = "0xbacbf7e3ee2dbfb591133f077d65e6dca8dae289";
//var MetaCoin = web3.eth.contract(ABI);
//var Meta = MetaCoin.at([contractAddress]);

var meta = MetaCoin.at(contractAddress);
console.log(meta);
MetaCoin.setProvider(web3.currentProvider);
/*var test = meta.getBalanceInEth(web3.eth.accounts[1]);
test = web3.toBigNumber(test);
console.log(web3.fromWei(web3.eth.getBalance(web3.eth.accounts[1])));
console.log(test.toNumber());*/

var accounts;
var account;

web3.eth.getAccounts(function(err, accs) {
     if (err != null) {
       alert("There was an error fetching your accounts.");
       return;
     }

     if (accs.length == 0) {
       alert("Couldn't get any accounts! Make sure your Ethereum client is configured correctly.");
       return;
     }

     accounts = accs;
     account = accounts[0];
     console.log(account);

});
console.log(account);
const NameForm = () => (
      <h3>Your account:
        <br></br>&ensp;&ensp;
          {web3.eth.accounts[0]}
        </h3>
    );

const Deposit = () => (
      <h3>Make Depositt:
        <form>
        <br></br>
          client:  <input type="text"/>
        <br></br>
          Amount:  <input type="text"/> nEur <input type="submit" value="Send"/>
        </form>
      </h3>
);

const Withdraw =() => (<h3>Withdraws:</h3>);

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
            <h2>Neufund</h2>
        </div>
          <div><NameForm/></div>
          <div><Deposit/></div>
          <Withdraw/>
        </div>
    );
  }
}

export default App;
