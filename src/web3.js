import Web3 from 'web3'
import contract from 'truffle-contract'
import metacoin_artifacts from '../build/contracts/EuroToken.json'

const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
web3.eth.defaultAccount = web3.eth.accounts[0];
let EuroToken = contract(metacoin_artifacts);
EuroToken.setProvider(web3.currentProvider);

let exportObject = {
    get EuroToken() {
        return EuroToken;
    },

    get web3() {
        return web3;
    }
};


module.exports = exportObject;
