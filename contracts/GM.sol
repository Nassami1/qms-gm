// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

/// @title GM on QMS Testnet
/// @notice One click = one on-chain transaction. Tracks global + per-user GM counts.
/// @dev QMS is fully EVM-compatible (Chain ID 19480). No special opcodes used.
///      Avoid relying on block.timestamp as precise wall-clock (PoUW ~10s blocks).
contract GM {
    uint256 public totalGMs;
    mapping(address => uint256) public gmCount;
    mapping(address => uint256) public lastGmAt;

    event GM(address indexed user, uint256 indexed count, uint256 timestamp);

    /// @notice Say GM. Emits an event and bumps counters.
    function gm() external {
        gmCount[msg.sender] += 1;
        totalGMs += 1;
        lastGmAt[msg.sender] = block.timestamp;
        emit GM(msg.sender, gmCount[msg.sender], block.timestamp);
    }
}
