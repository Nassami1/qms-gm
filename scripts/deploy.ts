import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log(`Deployer: ${deployer.address}`);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log(`Balance: ${ethers.formatEther(balance)} QMS`);

  const GM = await ethers.getContractFactory("GM");
  const gm = await GM.deploy();
  await gm.waitForDeployment();

  const address = await gm.getAddress();
  console.log(`GM deployed to: ${address}`);
  console.log(`Verify with:`);
  console.log(`  npx hardhat verify --network qmsTestnet ${address}`);
  console.log(`Explorer: https://testnet.qmsscan.io/address/${address}`);
}

main().catch((err) => {
  console.error(err);
  process.exitCode = 1;
});
