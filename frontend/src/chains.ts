import { defineChain } from "viem";

// Exact QMS Testnet params from docs.qms.finance/for-developers
export const qmsTestnet = defineChain({
  id: 19480,
  name: "QMS Testnet",
  nativeCurrency: { name: "QMS", symbol: "QMS", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.testnet.qms.finance"] },
    public: { http: ["https://rpc.testnet.qms.finance"] },
  },
  blockExplorers: {
    default: { name: "QMSScan", url: "https://testnet.qmsscan.io" },
  },
  testnet: true,
});
