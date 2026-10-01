import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-verify";
import * as dotenv from "dotenv";

dotenv.config();

const PRIVATE_KEY = process.env.PRIVATE_KEY ?? "";
const accounts = PRIVATE_KEY ? [PRIVATE_KEY] : [];

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.28",
    settings: {
      optimizer: { enabled: true, runs: 200 },
      // QMS hardfork: Osaka. solc default (cancun+) is fine.
      // Explicit evmVersion kept compatible:
      evmVersion: "cancun",
    },
  },
  networks: {
    hardhat: {},
    qmsTestnet: {
      url: "https://rpc.testnet.qms.finance",
      chainId: 19480,
      accounts,
    },
  },
  // Blockscout (QMSScan) verification — no API key needed.
  // Usage:
  //   npx hardhat verify --network qmsTestnet <ADDRESS>
  etherscan: {
    apiKey: {
      qmsTestnet: "empty",
    },
    customChains: [
      {
        network: "qmsTestnet",
        chainId: 19480,
        urls: {
          apiURL: "https://testnet.qmsscan.io/api",
          browserURL: "https://testnet.qmsscan.io",
        },
      },
    ],
  },
  sourcify: { enabled: false },
  gasReporter: { enabled: false },
  paths: {
    sources: "./contracts",
    tests: "./test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
};

export default config;
