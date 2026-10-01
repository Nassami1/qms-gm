# GM on QMS

Say GM on QMS Testnet. One click writes one on-chain transaction.

<img width="1380" height="867" alt="image" src="https://github.com/user-attachments/assets/c1ae09ea-2699-4214-a293-8e0d5b44821c" />


- Stack: Solidity 0.8.28, Hardhat, Vite, React, TypeScript, wagmi v2, viem v2


## Author

- Built by  https://x.com/hassan_samimi


## Network

| Item | Value |
|---|---|
| Network | QMS Testnet |
| Chain ID | 19480 (0x4C18) |
| RPC | https://rpc.testnet.qms.finance |
| Explorer | https://testnet.qmsscan.io |
| Faucet | https://faucet.testnet.qms.finance |
| Currency | QMS (EIP-1559 fees, about 10s blocks) |

## Contract

| Item | Value |
|---|---|
| Contract | GM |
| Address | 0x0f93Dd96B317c66a9aBA32A82c8618b70c4aceA7 |
| Explorer | https://testnet.qmsscan.io/address/0x0f93Dd96B317c66a9aBA32A82c8618b70c4aceA7 |
| Deployer | 0x1Cf3eEac5A7FD2e927A7b56D92F0F40F245dA321 |
| Source | contracts/GM.sol |
| Status | Verified on QMSScan |

Functions:

- `gm()` - increments global and per-user counters, emits GM(user, count, timestamp)
- `totalGMs()` - global counter
- `gmCount(address)` - per-user counter
- `lastGmAt(address)` - last GM timestamp per user

## Layout

```text
contracts/GM.sol        Smart contract
scripts/deploy.ts       Deploy script
ignition/modules/GM.ts  Hardhat Ignition module
test/GM.test.ts         Tests (5 passing)
hardhat.config.ts       qmsTestnet network plus Blockscout verify
frontend/               English UI (Vite plus wagmi plus viem)
  src/chains.ts         QMS Testnet chain definition
  src/config.ts         wagmi config, GM address and ABI, add-network helper
  src/App.tsx           Connect, GM button, counters, QMSScan links
  src/icons.tsx         SVG icons (no emoji)
  src/index.css         LEXBET design tokens and layout
```

## Prerequisites

- Node 18 or newer
- A test-only wallet with test QMS from the faucet

## Install and test (contract)

```bash
npm install
npx hardhat compile
npx hardhat test
```

## Deploy (contract)

```bash
cp .env.example .env
# Edit .env and set PRIVATE_KEY to a test-only key. Never commit it.

npx hardhat run scripts/deploy.ts --network qmsTestnet
npx hardhat verify --network qmsTestnet <CONTRACT_ADDRESS>
```

Contract explorer page:

```text
https://testnet.qmsscan.io/address/<CONTRACT_ADDRESS>
```

Notes: wait 2-3 blocks (about 20-30 seconds) for counters to update. Do not wait for finalized.

## Run (frontend)

```bash
cd frontend
npm install
cp .env.example .env
# Optional: .env already defaults to the deployed address in src/config.ts.
# Only edit .env if you redeployed and need a different VITE_GM_ADDRESS.

npm run dev
# Open http://localhost:5173
```

Production build and preview:

```bash
npm run build
npm run preview
# Preview serves on http://localhost:4173
```


## Troubleshooting

- `insufficient funds`: get more test QMS from the faucet, confirm chain ID 19480
- `wrong network`: use the Add / Switch to QMS Testnet button
- Counters show placeholder: set `VITE_GM_ADDRESS` in `frontend/.env` and restart dev server
- `wallet_requestPermissions already pending (-32002)`: open the MetaMask popup and approve or reject the pending request, then try once
- RPC is slow: retry, testnet blocks take about 10 seconds
- Verify fails: check compiler 0.8.28, optimizer runs 200, evmVersion cancun
