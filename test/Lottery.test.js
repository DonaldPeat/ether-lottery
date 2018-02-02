const assert = require('assert');
const ganache = require('ganache-cli'); //local ethereum test network
const Web3 = require('web3'); //web3 is always imported as a constructor
// const web3 = new Web3(ganache.provider());
const provider = ganache.provider();  //provider for test network
const web3 = new Web3(provider);
const { interface, bytecode } = require('../compile');
//
let accounts;
let lottery;

beforeEach(async () => {
  //get list of all generated local test network accounts
  accounts = await web3.eth.getAccounts();

//   //designate account to deploy contract
  lottery = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({ from: accounts[0], gas : '1000000'});
    lottery.setProvider(provider);
});
