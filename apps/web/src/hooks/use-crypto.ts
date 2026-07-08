import { useEffect } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Supported crypto assets.
 */
export type CryptoAsset =
  | "BTC/USD"
  | "ETH/USD"
  | "XRP/USD"
  | "SOL/USD"
  | "BNB/USD"
  | "ADA/USD";

/**
 * Represents a cryptocurrency market quote.
 */
export interface CryptoPair {
  /**
   * Trading asset.
   */
  asset: CryptoAsset;

  /**
   * Current market price.
   */
  price: number;

  /**
   * Highest price in the last 24 hours.
   */
  high24h: number;

  /**
   * 24-hour percentage change.
   */
  change: number;
}

/**
 * Crypto store state and actions.
 */
type CryptoStore = {
  /**
   * Current crypto market data.
   */
  assets: CryptoPair[];

  /**
   * Initializes the crypto market.
   */
  initialize: (assets: CryptoPair[]) => void;

  /**
   * Updates an existing crypto asset.
   */
  updateAsset: (
    asset: CryptoAsset,
    data: Partial<Omit<CryptoPair, "asset">>,
  ) => void;
};

/**
 * Zustand crypto store.
 */
export const useCryptoStore = create<CryptoStore>()(
  devtools(
    (set) => ({
      assets: [],

      initialize: (assets) => set({ assets }, false, "crypto/initialize"),

      updateAsset: (asset, data) =>
        set(
          (state) => ({
            assets: state.assets.map((item) =>
              item.asset === asset
                ? {
                    ...item,
                    ...data,
                  }
                : item,
            ),
          }),
          false,
          "crypto/updateAsset",
        ),
    }),
    {
      name: "crypto-store",
    },
  ),
);

/**
 * Initializes the crypto store on first use
 * and exposes the crypto market data.
 */
export function useCrypto(initialData: CryptoPair[]) {
  const assets = useCryptoStore((state) => state.assets);
  const initialize = useCryptoStore((state) => state.initialize);
  const updateAsset = useCryptoStore((state) => state.updateAsset);

  useEffect(() => {
    if (assets.length === 0) {
      initialize(initialData);
    }
  }, [assets.length, initialData, initialize]);

  return {
    assets,
    updateAsset,
  };
}
