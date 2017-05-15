var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
const EuroToken = artifacts.require('./neubank/EuroToken');


module.exports = function(deployer) {
  deployer.deploy(EuroToken);
};
