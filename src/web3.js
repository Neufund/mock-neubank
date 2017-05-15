/*Setup and initialize web3 and contract instance*/

import Web3 from 'web3'
import contract from 'truffle-contract'
import metacoin_artifacts from '../build/contracts/EuroToken.json'

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
let EuroToken = contract(metacoin_artifacts);
EuroToken.setProvider(window.web3.currentProvider);
let exportObject = {
    get EuroToken() {
        return EuroToken;
    },

    get web3() {
        return window.web3;
    }
};


module.exports = exportObject;
