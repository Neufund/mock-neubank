var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
const EuroToken = artifacts.require('./neubank/EuroToken');
const ClientRegistery = artifacts.require('./neubank/ClientRegistery');
const IClientRegistery = artifacts.require('./neubank/IClientRegistery');


module.exports = function(deployer) {
  deployer.deploy(EuroToken);
  deployer.deploy(ClientRegistery);
  //deployer.link(EuroToken,IClientRegistery);
  //deployer.link(ClientRegistery,IClientRegistery);
};
