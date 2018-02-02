const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

//mnemonic associated with ether account for test network &
//api key to connect to infura node  https://infura.io/
const provider = new HDWalletProvider(
  'shock gloom rifle boil pole record mule stone same pigeon patrol cheese',
  'https://rinkeby.infura.io/7ditWm4ERZ7g8lV6fTxr'
);

const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode })
    .send({gas:'1000000', from: accounts[0] });

    console.log('Contract deployed to ', result.options.address);

};

deploy();
