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

describe('Lottery Contract', () => {
  it('deploys a contract', () => {
    assert.ok(lottery.options.address);
  })

  it('allows multiple accounts to enter', async () => {
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei('0.002', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[1],
      value: web3.utils.toWei('0.002', 'ether')
    });
    await lottery.methods.enter().send({
      from: accounts[2],
      value: web3.utils.toWei('0.002', 'ether')
    });

    const players = await lottery.methods.getPlayers().call({
      from: accounts[0]
    });

    assert.equal(accounts[0], players[0]);
    assert.equal(accounts[1], players[1]);
    assert.equal(accounts[2], players[2]);

    assert.equal(players.length, 3);
  });

  it('requires a minimum amount of ether to enter', async () => {
    try{
      await lottery.methods.enter().send({
        from: accounts[0],
        value: 200 //arbitrary wei amount under the required amount
      })
      assert(false);
    } catch (err) {
      assert(err);
    }
  });

  it('only manager can call pickWinner', async () => {
    try {
      await lottery.methods.pickWinner().send({
        from:accounts[1]
      });
      assert(false);
    } catch (err){
      assert(err);
    }
  })
})
