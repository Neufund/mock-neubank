/* global artifacts contract it assert web3*/

const EuroToken = artifacts.require('../../contracts/neubank/EuroToken.sol');
const ClientRegistery = artifacts.require('../../contracts/neubank/ClientRegistery.sol');
const EuroHelper = artifacts.require('./helpers/EuroHelper.sol');

import expectThrow from './helpers/expectThrow.js';

contract('EuroToken', (accounts) => {

  //EuroToken conrtact
  let eurotoken;
  let deposit_manager;
  //Genral Users
  let owner;
  let someone1;
  let someone2;
  let someone3;
  //ClientRegistery contract
  let clientreg;
  let dumContract;
  let Dummy;
  const toPromise = f => ((...args) => (new Promise((resolve, reject) => (f(...args, (error, data) => (error ? reject(error) : resolve(data)))))));

  beforeEach(async() => {

    //Setup new token
    eurotoken = await EuroToken.new();
    owner = await eurotoken.owner();
    assert.equal(owner, accounts[0]);

    someone1  = accounts[1];
    someone2  = accounts[2];
    someone3  = accounts[3];

    dumContract = await EuroHelper.new();
    Dummy = await dumContract.address;
    //Setup clientRegistery contract with clients
    clientreg = await ClientRegistery.new();
    await clientreg.addClient(someone1);
    await clientreg.addClient(someone3);
    await clientreg.addClient(Dummy);
    assert(await clientreg.isClient(someone1));
    //someone2 is not a client
    assert(!await clientreg.isClient(someone2));
    assert(await clientreg.isClient(someone3));
    await eurotoken.set_clients_manager(clientreg.address);



  });

     it('should set user someone1 as deposit_manager then change to owner', async () =>  {
      assert(await eurotoken.set_deposit_manager(owner));
      assert(await eurotoken.deposit(someone1,1));
      assert(await eurotoken.set_deposit_manager(someone1));
      assert(await eurotoken.deposit(someone1,1, {from: someone1}));
      await expectThrow(eurotoken.deposit(someone1,1));
      assert(await eurotoken.set_deposit_manager(owner));
      assert(await eurotoken.deposit(someone1,1));
    });

     it('should deposit 10 nEuro to clients only', async () => {
      assert(await eurotoken.set_deposit_manager(owner));
      assert(await eurotoken.deposit(someone1,10,{from: owner}));
      await expectThrow(eurotoken.deposit(someone2,10,{from: owner}));
      assert(await eurotoken.deposit(someone3,10,{from: owner}));
      let balance = await eurotoken.balanceOf(someone3);
      assert.equal(balance.c,10);
   });

     it('should withdraw if its a client with sufficiant funds', async () => {
     assert(await eurotoken.set_deposit_manager(owner));
     assert(await eurotoken.deposit(someone3,10,{from: owner}));
     await expectThrow(eurotoken.withdraw(15,{from: someone3}));
     assert(await eurotoken.withdraw(10,{from: someone3}));
  });

    it('should deposit money to a client contract and contract receives a fallback', async () => {
    assert(await eurotoken.set_deposit_manager(owner));
    let test = await eurotoken.deposit(Dummy,10,{from: owner});
    let moneyFilter = dumContract.Money();
    await new Promise(resolve => {
      moneyFilter.watch((err, data)=>{
        assert.equal(data.event,'Money');
        assert(!err);
        moneyFilter.stopWatching(resolve);
      });
  });

});
});
