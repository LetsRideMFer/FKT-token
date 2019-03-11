/* node.js 8 or later is required */
const EthereumTx = require('ethereumjs-tx');
const FKTToken = artifacts.require('./FKTToken.sol');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://127.0.0.1:7545'));

// Default key pairs made by testrpc when using `truffle develop` CLI tool
// NEVER USE THESE KEYS OUTSIDE OF THE LOCAL TEST ENVIRONMENT
const privateKeys = [
  '311d7ad0a9ac992ff8348601070ca1f509568e9294585facd420a92176f601e4',
  '90f85646b17578282b49df2dc09b1d0104bcf491b20d2419673a864e8c8263f2',
  '0611e6166f1acd549af2fae5c856d720f4f28c58d746aa90fe8c007216a4de52'
];
contract('FKTToken', function(accounts) {
  let contract;
  let owner;
  let web3Contract;
  let truffle
  before(async () => {
    contract = await FKTToken.deployed();
  //   console.log(contract);
    // web3Contract = await web3.eth.contract(contract.abi).at(contract.address);
    owner = accounts[0];
  //   let other = web3.eth.accounts[1];
  });
  it('should pass if contract is deployed', async function() {
    let name = await contract.name.call();
    assert.strictEqual(name, 'Fort Knox Token');
  });
  it('should return inital token wei balance of 3*10^10', async function() {
    let ownerBalance = await contract.balanceOf.call(owner);
    ownerBalance = ownerBalance.toString();
    assert.strictEqual(Number(ownerBalance), 3e+28);
  });
  it('should properly [transfer] token', async function() {
    let recipient = accounts[1];
    console.log(recipient);
    let tokenWei = 1000000;
    await contract.transfer(recipient, tokenWei);
    
    let ownerBalance = await contract.balanceOf.call(owner);
    let recipientBalance = await contract.balanceOf.call(recipient);
    console.log(ownerBalance.toString());
    assert.strictEqual(ownerBalance.toString(), '29999999999999999999999000000');
    assert.strictEqual(recipientBalance.toNumber(), tokenWei);
  });
  it('should properly return the [totalSupply] of tokens', async function() {
    let totalSupply = await contract.totalSupply.call();
    totalSupply = totalSupply.toString();
    assert.strictEqual(Number(totalSupply), 3e+28);
  });
  it('should [approve] token for [transferFrom]', async function() {
    let approver = owner;
    let spender = accounts[2];
    let originalAllowance = await contract.allowance.call(approver, spender);
    let tokenAmount = 5000000;
    await contract.approve(spender, tokenAmount);
    let resultAllowance = await contract.allowance.call(approver, spender);
    assert.strictEqual(originalAllowance.toNumber(), 0);
    assert.strictEqual(resultAllowance.toNumber(), tokenAmount);
  });
});