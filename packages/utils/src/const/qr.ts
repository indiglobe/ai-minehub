import { TRANSACTION_METHOD } from "@/db-enums";

export const QR_CODE = [
  {
    walletId: "0x498B3e02EBdF93A263bD2731dA2c8A6C263d86ED",
    walletImageSource: "/wallet/qr-code/bep20.jpeg",
    walletType: "BSC",
    name: "BSC (BEP20)",
    icon: "🟡",
  },
  {
    walletId: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh",
    walletImageSource: "/wallet/qr-code/bitcoin.jpeg",
    walletType: "Bitcoin",
    name: "Bitcoin",
    icon: "₿",
  },
  {
    walletId: "0x498B3e02EBdF93A263bD2731dA2c8A6C263d86ED",
    walletImageSource: "/wallet/qr-code/erc20.jpeg",
    walletType: "ETH",
    name: "Ethereum (ERC20)",
    icon: "🔷",
  },
  {
    walletId: "TY8dhEyWwkykzXrF93iwLkJGHGXDJN7iah",
    walletImageSource: "/wallet/qr-code/trc20.jpeg",
    walletType: "TRX",
    name: "TRON (TRC20)",
    icon: "🔴",
  },
] as const satisfies {
  walletImageSource: string;
  walletId: string;
  walletType: (typeof TRANSACTION_METHOD)[number];
  name: string;
  icon: string;
}[];
