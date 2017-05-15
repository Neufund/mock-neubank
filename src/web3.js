/*Setup and initialize web3 and contract instance*/

import Web3 from 'web3'
import contract from 'truffle-contract'
import metacoin_artifacts from '../build/contracts/EuroToken.json'
import clientRegistery_artifacts from '../build/contracts/ClientRegistery.json'

let ClientRegistery_addrs;

//check if an instance of web3 is already running
if(typeof window.web3 !== 'undefined') {
  console.info("web3 already exists");
  alert();
} else {
  //currently set to run with testrpc
    window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
    window.web3.eth.defaultAccount = window.web3.eth.accounts[0];
  }

//Using truffle artifacts
//Setting up client registry and adding all testrpc addresses as clients
//An additional feature can be add user or remove user
let ClientRegistery = contract(clientRegistery_artifacts);
ClientRegistery.setProvider(window.web3.currentProvider);

ClientRegistery.deployed().then(function(instance) {
  ClientRegistery_addrs = instance.address;
  for(let i=0; i<9; i++)
    if(instance.isClient.call(window.web3.eth.accounts[i])!=false)
      instance.addClient(window.web3.eth.accounts[i]);
});


let EuroToken = contract(metacoin_artifacts);
EuroToken.setProvider(window.web3.currentProvider);

EuroToken.deployed().then(function(instance) {
  instance.set_clients_manager(ClientRegistery_addrs);
  return instance.set_deposit_manager(window.web3.eth.accounts[0]);
});

let exportObject = {
    get EuroToken() {
        return EuroToken;
    },
    get web3() {
        return window.web3;
    }
};

module.exports = exportObject;
