import { useEffect } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Supported crypto asset symbols.
 */
export type CryptoIndeciesAsset =
  | "SyntX BTC"
  | "SyntX ETH"
  | "SyntX BNB"
  | "SyntX SOL";

/**
 * Represents a crypto market asset.
 */
export interface CryptoIndeciesMarket {
  /**
   * Asset name.
   */
  asset: CryptoIndeciesAsset;

  /**
   * Current market price.
   */
  price: number;

  /**
   * 24-hour percentage change.
   */
  change24h: number;

  /**
   * Trading hours.
   */
  hours: string;
}

/**
 * SyntX market store state and actions.
 */
type CryptoIndeciesMarketStore = {
  /**
   * Current crypto market data.
   */
  assets: CryptoIndeciesMarket[];

  /**
   * Initializes the store.
   */
  initialize: (assets: CryptoIndeciesMarket[]) => void;

  /**
   * Updates a single asset.
   */
  updateAsset: (
    asset: CryptoIndeciesAsset,
    data: Partial<Omit<CryptoIndeciesMarket, "asset">>,
  ) => void;
};

/**
 * Zustand store for crypto market data.
 */
export const useCryptoIndeciesMarketStore = create<CryptoIndeciesMarketStore>()(
  devtools(
    (set) => ({
      assets: [],

      initialize: (assets) => set({ assets }, false, "crypto/initialize"),

      updateAsset: (asset, data) =>
        set(
          (state) => ({
            assets: state.assets.map((item) =>
              item.asset === asset ? { ...item, ...data } : item,
            ),
          }),
          false,
          "crypto/updateAsset",
        ),
    }),
    {
      name: "crypto-market-store",
    },
  ),
);

/**
 * Initializes the crypto market store once
 * and exposes the market state.
 */
export function useCryptoIndeciesMarket(initialData: CryptoIndeciesMarket[]) {
  const assets = useCryptoIndeciesMarketStore((state) => state.assets);
  const initialize = useCryptoIndeciesMarketStore((state) => state.initialize);
  const updateAsset = useCryptoIndeciesMarketStore(
    (state) => state.updateAsset,
  );

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

/**
 * Supported forex asset symbols.
 */
export type ForexIndeciesAsset =
  | "SyntX USD"
  | "SyntX EUR"
  | "SyntX GBP"
  | "SyntX JPY";

/**
 * Represents a forex market asset.
 */
export interface ForexIndeciesMarket {
  /**
   * Asset name.
   */
  asset: ForexIndeciesAsset;

  /**
   * Current market price.
   */
  price: number;

  /**
   * 24-hour percentage change.
   */
  change24h: number;

  /**
   * Trading hours.
   */
  hours: string;
}

/**
 * SyntX market store state and actions.
 */
type ForexIndeciesMarketStore = {
  /**
   * Current forex market data.
   */
  assets: ForexIndeciesMarket[];

  /**
   * Initializes the store.
   */
  initialize: (assets: ForexIndeciesMarket[]) => void;

  /**
   * Updates a single asset.
   */
  updateAsset: (
    asset: ForexIndeciesAsset,
    data: Partial<Omit<ForexIndeciesMarket, "asset">>,
  ) => void;
};

/**
 * Zustand store for forex market data.
 */
export const useForexIndeciesMarketStore = create<ForexIndeciesMarketStore>()(
  devtools(
    (set) => ({
      assets: [],

      initialize: (assets) => set({ assets }, false, "forex/initialize"),

      updateAsset: (asset, data) =>
        set(
          (state) => ({
            assets: state.assets.map((item) =>
              item.asset === asset ? { ...item, ...data } : item,
            ),
          }),
          false,
          "forex/updateAsset",
        ),
    }),
    {
      name: "forex-market-store",
    },
  ),
);

/**
 * Initializes the forex market store once
 * and exposes the market state.
 */
export function useForexIndeciesMarket(initialData: ForexIndeciesMarket[]) {
  const assets = useForexIndeciesMarketStore((state) => state.assets);
  const initialize = useForexIndeciesMarketStore((state) => state.initialize);
  const updateAsset = useForexIndeciesMarketStore((state) => state.updateAsset);

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

/**
 * Supported stock asset symbols.
 */
export type StockIndeciesAsset =
  | "SyntX US500"
  | "SyntX NAS100"
  | "SyntX DOW30"
  | "SyntX GER40";

/**
 * Represents a stock market asset.
 */
export interface StockIndeciesMarket {
  /**
   * Asset name.
   */
  asset: StockIndeciesAsset;

  /**
   * Current market price.
   */
  price: number;

  /**
   * 24-hour percentage change.
   */
  change24h: number;

  /**
   * Trading hours.
   */
  hours: string;
}

/**
 * SyntX market store state and actions.
 */
type StockIndeciesMarketStore = {
  /**
   * Current stock market data.
   */
  assets: StockIndeciesMarket[];

  /**
   * Initializes the store.
   */
  initialize: (assets: StockIndeciesMarket[]) => void;

  /**
   * Updates a single asset.
   */
  updateAsset: (
    asset: StockIndeciesAsset,
    data: Partial<Omit<StockIndeciesMarket, "asset">>,
  ) => void;
};

/**
 * Zustand store for stock market data.
 */
export const useStockIndeciesMarketStore = create<StockIndeciesMarketStore>()(
  devtools(
    (set) => ({
      assets: [],

      initialize: (assets) => set({ assets }, false, "stock/initialize"),

      updateAsset: (asset, data) =>
        set(
          (state) => ({
            assets: state.assets.map((item) =>
              item.asset === asset ? { ...item, ...data } : item,
            ),
          }),
          false,
          "stock/updateAsset",
        ),
    }),
    {
      name: "stock-market-store",
    },
  ),
);

/**
 * Initializes the stock market store once
 * and exposes the market state.
 */
export function useStockIndeciesMarket(initialData: StockIndeciesMarket[]) {
  const assets = useStockIndeciesMarketStore((state) => state.assets);
  const initialize = useStockIndeciesMarketStore((state) => state.initialize);
  const updateAsset = useStockIndeciesMarketStore((state) => state.updateAsset);

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

/**
 * Supported commodity asset symbols.
 */
export type CommodityIndeciesAsset =
  | "SyntX GOLD"
  | "SyntX SILVER"
  | "SyntX OIL"
  | "SyntX NATGAS";

/**
 * Represents a commodity market asset.
 */
export interface CommodityIndeciesMarket {
  /**
   * Asset name.
   */
  asset: CommodityIndeciesAsset;

  /**
   * Current market price.
   */
  price: number;

  /**
   * 24-hour percentage change.
   */
  change24h: number;

  /**
   * Trading hours.
   */
  hours: string;
}

/**
 * SyntX market store state and actions.
 */
type CommodityIndeciesMarketStore = {
  /**
   * Current commodity market data.
   */
  assets: CommodityIndeciesMarket[];

  /**
   * Initializes the store.
   */
  initialize: (assets: CommodityIndeciesMarket[]) => void;

  /**
   * Updates a single asset.
   */
  updateAsset: (
    asset: CommodityIndeciesAsset,
    data: Partial<Omit<CommodityIndeciesMarket, "asset">>,
  ) => void;
};

/**
 * Zustand store for commodity market data.
 */
export const useCommodityIndeciesMarketStore =
  create<CommodityIndeciesMarketStore>()(
    devtools(
      (set) => ({
        assets: [],

        initialize: (assets) => set({ assets }, false, "commodity/initialize"),

        updateAsset: (asset, data) =>
          set(
            (state) => ({
              assets: state.assets.map((item) =>
                item.asset === asset ? { ...item, ...data } : item,
              ),
            }),
            false,
            "commodity/updateAsset",
          ),
      }),
      {
        name: "commodity-market-store",
      },
    ),
  );

/**
 * Initializes the commodity market store once
 * and exposes the market state.
 */
export function useCommodityIndeciesMarket(
  initialData: CommodityIndeciesMarket[],
) {
  const assets = useCommodityIndeciesMarketStore((state) => state.assets);
  const initialize = useCommodityIndeciesMarketStore(
    (state) => state.initialize,
  );
  const updateAsset = useCommodityIndeciesMarketStore(
    (state) => state.updateAsset,
  );

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
