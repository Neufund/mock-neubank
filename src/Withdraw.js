import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

let contracts = require("./web3.js");
let EuroToken = contracts.EuroToken;


let TransPromise = EuroToken.deployed().then(function(instance) {
  let meta = instance;
  console.log(meta);
  //Issue with filtering

  //https://github.com/ethereum/web3.js/issues/452
  return meta.allEvents({fromBlock: 0, toBlock: 'latest', topics: ["Withdraw"]});
}).then(function(events) {
  return new Promise((resolve, reject)=>{
    events.get(function(error, result){
     if (error)
     {
      reject(error);
      console.log(error);
    }
      else
      {
      resolve(result);
      console.log(result);
    }
    });
  })

});


class Withdraw extends React.Component {
  constructor(){
    super();
    this.state = {list: ''};
  }

  async componentDidMount() {
    const Transactions = await TransPromise;
    console.log(Transactions);

    let list ='';
    list = await Transactions.map((Transactions) => {
      if(Transactions.event==="Withdraw")
      return ([<TableRow>
                <TableRowColumn>{Transactions.event}</TableRowColumn>
                <TableRowColumn>{Transactions.args.client}</TableRowColumn>
                <TableRowColumn>{Transactions.args.amount.c[0]}</TableRowColumn>
              </TableRow>]);
    });
    this.setState({list});
    console.log(this.state.list);
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
