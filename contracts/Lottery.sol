pragma solidity ^0.4.17;

contract Lottery {

    address public manager;
    address[] public players;
    address public winner;

    function Lottery() public {
        //assign manager contract sender's address
        manager = msg.sender;
        }

    function enter() public payable {
        //ether sent validation wei default
        require(msg.value > .001 ether);
        players.push(msg.sender);
    }

    function random() private view returns (uint) {
        //sha3()
        return uint(keccak256(block.difficulty, now, players));
    }

    function pickWinner() public restricted {
        uint index = random() % players.length;
        players[index].transfer(this.balance);
        winner = players[index];
        players = new address[](0);
    }

    modifier restricted() {
        require(msg.sender == manager);
        _;
    }

    function getPlayers() public view returns (address[]) {
        return players;

    }
}
