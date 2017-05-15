pragma solidity ^0.4.8;

 /*
 * Contract that is working with ERC23 tokens
 * it will take only specified tokents and prevent accident token transfers from another ERC23 contracts
 * like every contract is throwing accident ether transactions
 */

 contract EuroHelper {
    function tokenFallback(address _from, uint _value, bytes _data){
      Money(_from,_value,_data);
      //Incoming transaction code here
    }

    event Money(address _from, uint _value, bytes _data);
}
