import { useEffect } from "react";
import {
  useAccount,
  useConnect,
  useDisconnect,
  useReadContract,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { GM_ABI, GM_ADDRESS, addQmsTestnet } from "./config";
import {
  AlertIcon,
  CheckIcon,
  ClockIcon,
  ExternalIcon,
  GlobeIcon,
  LogoutIcon,
  ShieldIcon,
  SunIcon,
  TrophyIcon,
  WalletIcon,
  ZapIcon,
} from "./icons";
import "./index.css";

const EXPLORER = "https://testnet.qmsscan.io";
const FAUCET = "https://faucet.testnet.qms.finance";
const CREATOR_URL = "https://x.com/hassan_samimi";
const CREATOR_HANDLE = "@hassan_samimi";
const CHAIN_ID = 19480;
const NOT_DEPLOYED =
  GM_ADDRESS === "0x0000000000000000000000000000000000000000";

function shortAddress(addr?: string): string {
  if (!addr) return "";
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function App() {
  const { address, isConnected, chainId } = useAccount();
  const {
    connect,
    connectors,
    isPending: isConnecting,
    error: connectError,
  } = useConnect();
  const { disconnect } = useDisconnect();

  const { data: total, refetch: refetchTotal } = useReadContract({
    address: GM_ADDRESS,
    abi: GM_ABI,
    functionName: "totalGMs",
    query: { enabled: !NOT_DEPLOYED },
  });

  const { data: myCount, refetch: refetchMine } = useReadContract({
    address: GM_ADDRESS,
    abi: GM_ABI,
    functionName: "gmCount",
    args: address ? [address] : undefined,
    query: { enabled: !NOT_DEPLOYED && !!address },
  });

  const {
    writeContract,
    data: hash,
    isPending: isWriting,
    error: writeError,
    reset,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  const wrongNetwork = isConnected && chainId !== CHAIN_ID;

  const handleGm = () => {
    if (NOT_DEPLOYED) return;
    reset?.();
    writeContract({ address: GM_ADDRESS, abi: GM_ABI, functionName: "gm" });
  };

  useEffect(() => {
    if (!isConfirmed) return;
    const t = setTimeout(() => {
      refetchTotal();
      refetchMine();
    }, 3000);
    return () => clearTimeout(t);
  }, [isConfirmed, refetchTotal, refetchMine]);

  const pendingMsg =
    !!connectError &&
    ((connectError as Error).message?.includes("-32002") ||
      (connectError as Error).message?.includes("already pending"));

  const gmLabel = NOT_DEPLOYED
    ? "Contract not set"
    : isWriting
      ? "Confirm in wallet..."
      : isConfirming
        ? "Confirming..."
        : "GM";

  const statusBadge = !isConnected ? (
    <span className="status idle">
      <span className="dot" /> Not connected
    </span>
  ) : wrongNetwork ? (
    <span className="status bad">
      <span className="dot" /> Wrong network
    </span>
  ) : isConfirmed ? (
    <span className="status good">
      <span className="dot" /> Confirmed
    </span>
  ) : isConfirming || isWriting ? (
    <span className="status idle">
      <span className="dot" /> Pending
    </span>
  ) : (
    <span className="status good">
      <span className="dot" /> Ready
    </span>
  );

  return (
    <div className="app">
      <header className="nav">
        <div className="nav-inner">
          <a className="brand" href="#" aria-label="GM on QMS home">
            <span className="brand-mark">
              <SunIcon />
            </span>
            <span className="brand-text">
              <span className="brand-name">
                GM <span>ON QMS</span>
              </span>
              <span className="brand-sub">Testnet dApp</span>
            </span>
          </a>
          <div className="nav-spacer" />
          <a
            className="chip nav-chip"
            href={FAUCET}
            target="_blank"
            rel="noreferrer"
            title="Get test QMS from the faucet"
          >
            <ZapIcon />
            <span className="chip-text">Faucet</span>
          </a>
          <a
            className="chip nav-chip"
            href={EXPLORER}
            target="_blank"
            rel="noreferrer"
            title="Open QMSScan explorer"
          >
            <ExternalIcon />
            <span className="chip-text">Explorer</span>
          </a>
          {!isConnected ? (
            <button
              className="btn primary nav-cta"
              disabled={isConnecting}
              onClick={() => connect({ connector: connectors[0] })}
            >
              <WalletIcon />
              {isConnecting ? "Check wallet" : "Connect"}
            </button>
          ) : (
            <button
              className="btn ghost nav-cta mono"
              onClick={() => disconnect()}
              title={address}
            >
              <LogoutIcon />
              {shortAddress(address)}
            </button>
          )}
        </div>
      </header>

      <section className="hero">
        <div className="wrap hero-grid">
          <div className="gm-card" aria-label="Say GM">
            <div className="panel-head">
              <h2 className="panel-title">Today&apos;s GM</h2>
              {statusBadge}
            </div>
            {NOT_DEPLOYED && (
              <p className="warn" role="alert">
                <AlertIcon /> Deploy <code>GM.sol</code> to QMS Testnet and set{" "}
                <code>VITE_GM_ADDRESS</code> in <code>frontend/.env</code>.
              </p>
            )}
            {!isConnected ? (
              <>
                <p className="big-num">--</p>
                <p className="panel-desc">
                  Connect your wallet to read your GM count and write your
                  first on-chain GM on QMS Testnet.
                </p>
                <button
                  className="btn primary block"
                  disabled={isConnecting}
                  onClick={() => connect({ connector: connectors[0] })}
                >
                  <WalletIcon />
                  {isConnecting ? "Check your wallet..." : "Connect Wallet"}
                </button>
                {connectError && (
                  <p className="err" role="alert">
                    {pendingMsg ? (
                      <>
                        A connection request is already pending in MetaMask.
                        Open the MetaMask extension popup and approve/reject
                        it, then try again.
                      </>
                    ) : (
                      (connectError as Error).message?.slice(0, 300)
                    )}
                  </p>
                )}
                <p className="hint">
                  No popup? Click the MetaMask extension icon in your
                  toolbar — the pending request is waiting there.
                </p>
              </>
            ) : wrongNetwork ? (
              <>
                <p className="big-num">--</p>
                <p className="panel-desc">
                  You are on chain ID <span className="mono">{chainId}</span>.
                  Switch to QMS Testnet (19480) to continue.
                </p>
                <button className="btn primary block" onClick={() => addQmsTestnet()}>
                  <GlobeIcon />
                  Switch to QMS Testnet
                </button>
              </>
            ) : (
              <>
                <p className="big-num gold mono">
                  {NOT_DEPLOYED ? "--" : (myCount?.toString() ?? "...")}
                </p>
                <p className="panel-desc">
                  Your on-chain GM count. Each press sends one transaction
                  and bumps the global counter.
                </p>
                <button
                  className="btn primary big block"
                  disabled={isWriting || isConfirming || NOT_DEPLOYED}
                  onClick={handleGm}
                >
                  <SunIcon />
                  {gmLabel}
                </button>
                {writeError && (
                  <p className="err" role="alert">
                    {(writeError as Error).message?.slice(0, 300)}
                  </p>
                )}
                {isConfirmed && (
                  <p className="ok" role="status">
                    <CheckIcon /> GM confirmed on-chain.
                  </p>
                )}
                {hash && (
                  <p className="tx-row">
                    <ExternalIcon />
                    <span>TX</span>
                    <code className="mono">{shortAddress(hash)}</code>
                    <a href={`${EXPLORER}/tx/${hash}`} target="_blank" rel="noreferrer">
                      View on QMSScan
                    </a>
                  </p>
                )}
              </>
            )}
          </div>
          <div className="hero-text">
            <p className="eyebrow">
              <span
                className={`dot ${isConnected && !wrongNetwork ? "live" : ""}`}
              />
              QMS Testnet · Chain ID 19480 ·{" "}
              {isConnected && !wrongNetwork ? "Wallet live" : "Connect to begin"}
            </p>
            <h1 className="hero-title">
              Say <em>GM</em>
              <br />
              <span className="gold">On-chain.</span>
            </h1>
            <p className="hero-sub">
              One click writes one real transaction to QMS Testnet. Track the
              global counter, your personal count, and every receipt on QMSScan.
            </p>
            <div className="chips" aria-label="Network facts">
              <span className="chip">
                <ZapIcon /> Chain ID <span className="mono">19480</span>
              </span>
              <span className="chip">
                <ClockIcon /> ~10s blocks
              </span>
              <a
                className="chip"
                href={NOT_DEPLOYED ? EXPLORER : `${EXPLORER}/address/${GM_ADDRESS}`}
                target="_blank"
                rel="noreferrer"
              >
                <ShieldIcon /> Contract on QMSScan
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="trust" aria-label="Proof and status">
        <div className="trust-wrap">
          <div className="trust-grid">
            <div className="trust-item">
              <span className="trust-ic">
                <GlobeIcon />
              </span>
              <span className="trust-meta">
                <span className="t-num">{NOT_DEPLOYED ? "--" : (total?.toString() ?? "...")}</span>
                <span className="t-label">
                  Total GMs <span className="live-tag">LIVE</span>
                </span>
              </span>
            </div>
            <div className="trust-item gold">
              <span className="trust-ic">
                <TrophyIcon />
              </span>
              <span className="trust-meta">
                <span className="t-num">
                  {!isConnected ? "--" : NOT_DEPLOYED ? "--" : (myCount?.toString() ?? "...")}
                </span>
                <span className="t-label">My GMs</span>
              </span>
            </div>
            <div className="trust-item green">
              <span className="trust-ic">
                <ShieldIcon />
              </span>
              <span className="trust-meta">
                <span className="t-num">19480</span>
                <span className="t-label">QMS Chain ID</span>
              </span>
            </div>
            <div className="trust-item">
              <span className="trust-ic">
                <ZapIcon />
              </span>
              <span className="trust-meta">
                <span className="t-num">~10s</span>
                <span className="t-label">Block time</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer slim-footer">
        <div className="footer-inner">
          <span>
            GM ON QMS · Built by{" "}
            <a href={CREATOR_URL} target="_blank" rel="noreferrer">
              {CREATOR_HANDLE}
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
