//crossplatform-friendly paths for compiling
const path = require('path');
const fs = require('fs');
const solc = require('solc');

const lotteryPath = path.resolve(__dirname, 'contracts', 'Lottery.sol');
const source = fs.readFileSync(lotteryPath, 'utf8');

//solc.compile(source,#) returns entire contracts object with # of compiled contracts
module.exports = solc.compile(source,1).contracts[':Lottery'];
