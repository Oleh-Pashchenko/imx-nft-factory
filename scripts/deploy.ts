import { ethers } from 'hardhat';

async function main() {
  const Contract = await ethers.getContractFactory('ImmutableNFTFactory');
  const contract = await Contract.deploy('Hello, Hardhat!');

  await contract.deployed();

  console.log('Contract deployed to:', contract.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
