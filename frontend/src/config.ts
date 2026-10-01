import { createConfig, http } from "wagmi";
import { injected } from "wagmi/connectors";
import { qmsTestnet } from "./chains";

export const config = createConfig({
  chains: [qmsTestnet],
  connectors: [injected({ shimDisconnect: true })],
  transports: {
    [qmsTestnet.id]: http("https://rpc.testnet.qms.finance"),
  },
});

// TODO: replace after deploy (Step 4 in README).
// Deployed address goes here, e.g. "0x1234...abcd"
export const GM_ADDRESS = (import.meta.env.VITE_GM_ADDRESS ||
  "0x0000000000000000000000000000000000000000") as `0x${string}`;

export const GM_ABI = [
  {
    type: "function",
    name: "gm",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    type: "function",
    name: "totalGMs",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "gmCount",
    stateMutability: "view",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "function",
    name: "lastGmAt",
    stateMutability: "view",
    inputs: [{ name: "", type: "address" }],
    outputs: [{ type: "uint256" }],
  },
  {
    type: "event",
    name: "GM",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "count", type: "uint256", indexed: true },
      { name: "timestamp", type: "uint256", indexed: false },
    ],
    anonymous: false,
  },
] as const;

/// Prompt wallet to add / switch to QMS Testnet (chainId 0x4C18 = 19480)
export async function addQmsTestnet() {
  const eth = (window as any).ethereum;
  if (!eth?.request) throw new Error("No injected wallet found");
  await eth.request({
    method: "wallet_addEthereumChain",
    params: [
      {
        chainId: "0x4C18",
        chainName: "QMS Testnet",
        nativeCurrency: { name: "QMS", symbol: "QMS", decimals: 18 },
        rpcUrls: ["https://rpc.testnet.qms.finance"],
        blockExplorerUrls: ["https://testnet.qmsscan.io"],
      },
    ],
  });
}
