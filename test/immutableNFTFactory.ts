import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { expect } from 'chai';
import { ethers } from 'hardhat';
import { ImmutableNFTFactory, ImmutableNFTFactory__factory } from '../typechain';

describe('ImmutableNFTFactory', function () {
  let Factory: ImmutableNFTFactory__factory;
  let factory: ImmutableNFTFactory;
  let owner: SignerWithAddress;
  let letItBeIMX: SignerWithAddress;
  let user: SignerWithAddress;

  beforeEach(async function () {
    Factory = await ethers.getContractFactory('ImmutableNFTFactory');
    [owner, letItBeIMX, user] = await ethers.getSigners();
    factory = await Factory.deploy(letItBeIMX.address);
  });

  it('Should deploy one NFT contract', async function () {
    await factory.createNFT('IMXNFT', 'IMXNFT');

    const count = await factory.getCount();

    expect(count.toString()).to.equal('1');
  });

  it('Should set the contract as paused', async function () {
    await factory.pause();

    expect(factory.createNFT('IMXNFT', 'IMXNFT')).to.be.revertedWith('Pausable: paused');
  });

  it('Shouldn\'t allow user use onlyOwner methods', async function () {
    expect(factory.connect(user).pause()).to.be.revertedWith('Ownable: caller is not the owner');
  });
});
