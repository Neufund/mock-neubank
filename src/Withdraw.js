import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

let contracts = require("./web3.js");
let EuroToken = contracts.EuroToken;


let TransPromise = EuroToken.deployed().then(function(instance) {
  //Issue with filtering
  //https://github.com/ethereum/web3.js/issues/452
  return instance.allEvents({fromBlock: 0, toBlock: 'latest', topics: ["Withdraw"]});
}).then(function(events) {
  return new Promise((resolve, reject)=>{
    events.get(function(error, result){
     if (error) {
        console.info("Error getting events from contract")
        reject(error);
    } else {
        resolve(result);
    }});
  })
});

class Withdraw extends React.Component {
  constructor(){
    super();
    this.state = {list: ''};
  }

  //Wait for component to mount
  async componentDidMount() {
    //wait for transactions from web3
    let Transactions = await TransPromise;
    Transactions = Transactions.filter(function(Transactions){
        if(Transactions.event==="Withdraw")
        return Transactions;
    });

    let list = await Transactions.map((Transactions) => {
      return ([<TableRow>
                <TableRowColumn>{Transactions.event}</TableRowColumn>
                <TableRowColumn>{Transactions.args.client}</TableRowColumn>
                <TableRowColumn>{Transactions.args.amount.c[0]}</TableRowColumn>
              </TableRow>]);
    });

    this.setState({list});
};

  render(){
    return (
      <Table>
         <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow >
            <TableHeaderColumn>Action</TableHeaderColumn>
            <TableHeaderColumn>Addrs</TableHeaderColumn>
            <TableHeaderColumn>Amount</TableHeaderColumn>
          </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {this.state.list}
          </TableBody>
        </Table>
      );
  }
}

module.exports = Withdraw;
