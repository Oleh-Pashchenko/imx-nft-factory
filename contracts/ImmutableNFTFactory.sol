// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./ImmutableNFT.sol";

contract ImmutableNFTFactory is Ownable, Pausable {
    // Array or created ImmutableNFT contracts
    ImmutableNFT[] public deployedNFTs;

    // IMX address in current network
    address public imx;

    event CreateNFT(ImmutableNFT to);

    constructor(address _imx) Ownable() {
        imx = _imx;
    }

    function createNFT(string memory _name, string memory _symbol)
        public
        whenNotPaused
    {
        ImmutableNFT newNFT = new ImmutableNFT(msg.sender, _name, _symbol, imx);
        deployedNFTs.push(newNFT);

        emit CreateNFT(newNFT);
    }

    function getDeployedNFTs() public view returns (ImmutableNFT[] memory) {
        return deployedNFTs;
    }

    function getCount() public view returns (uint256) {
        return deployedNFTs.length;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }
}
