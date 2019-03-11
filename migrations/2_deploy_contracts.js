const FKTToken = artifacts.require('FKTToken');
module.exports = (deployer) => {
  deployer.deploy(FKTToken);
};