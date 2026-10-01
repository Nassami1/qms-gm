import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

function attrs(p: P): P {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    ...p,
    className: p.className ?? "ic",
  };
}

export const SunIcon = (p: P) => (
  <svg {...attrs(p)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
  </svg>
);

export const WalletIcon = (p: P) => (
  <svg {...attrs(p)}>
    <path d="M20 7H5a2 2 0 0 1 0-4h13v4" />
    <path d="M20 7a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5" />
    <circle cx="17" cy="14" r="1" />
  </svg>
);

export const ZapIcon = (p: P) => (
  <svg {...attrs(p)}>
    <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8z" />
  </svg>
);

export const ShieldIcon = (p: P) => (
  <svg {...attrs(p)}>
    <path d="M12 2 4 5v6c0 5 3.4 8.4 8 11 4.6-2.6 8-6 8-11V5l-8-3z" />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

export const GlobeIcon = (p: P) => (
  <svg {...attrs(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18M12 3c2.5 2.6 3.9 5.7 3.9 9s-1.4 6.4-3.9 9c-2.5-2.6-3.9-5.7-3.9-9S9.5 5.6 12 3z" />
  </svg>
);

export const TrophyIcon = (p: P) => (
  <svg {...attrs(p)}>
    <path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0V4z" />
    <path d="M7 6H4a1 1 0 0 0-1 1c0 2.5 2 4 4 4M17 6h3a1 1 0 0 1 1 1c0 2.5-2 4-4 4" />
  </svg>
);

export const ClockIcon = (p: P) => (
  <svg {...attrs(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

export const UserIcon = (p: P) => (
  <svg {...attrs(p)}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.6-6.5 8-6.5s8 2.5 8 6.5" />
  </svg>
);

export const ExternalIcon = (p: P) => (
  <svg {...attrs(p)}>
    <path d="M14 4h6v6M20 4 10 14" />
    <path d="M20 14v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h5" />
  </svg>
);

export const CheckIcon = (p: P) => (
  <svg {...attrs(p)}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.5 2.5 2.5 4.5-5.5" />
  </svg>
);

export const AlertIcon = (p: P) => (
  <svg {...attrs(p)}>
    <path d="M12 3 2 20h20L12 3z" />
    <path d="M12 10v4M12 17.5v.5" />
  </svg>
);

export const LogoutIcon = (p: P) => (
  <svg {...attrs(p)}>
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <path d="m16 17 5-5-5-5M21 12H9" />
  </svg>
);
