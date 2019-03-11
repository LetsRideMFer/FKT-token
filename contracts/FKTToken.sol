pragma solidity ^0.5.0;

import 'openzeppelin-solidity/contracts/token/ERC20/ERC20.sol';

contract FKTToken is ERC20 {
  string public name = 'Fort Knox Token';
  string public symbol = 'FKT';
  uint8 public decimals = 18;

  uint public INITIAL_SUPPLY = 30000000000 * 10 ** uint(decimals);

  constructor() public {
    _mint(msg.sender, INITIAL_SUPPLY);
  }
}