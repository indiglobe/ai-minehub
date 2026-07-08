import { useEffect } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Supported stock symbols.
 */
export type StockCompany = "AAPL" | "GOOGL" | "MSFT" | "AMZN" | "TSLA" | "NVDA";

/**
 * Represents a stock market quote.
 */
export interface Stock {
  /**
   * Stock ticker.
   */
  company: StockCompany;

  /**
   * Current market price.
   */
  price: number;

  /**
   * Highest price reached today.
   */
  dayHigh: number;

  /**
   * Daily percentage change.
   */
  change: number;
}

/**
 * Stock store state.
 */
type StockStore = {
  /**
   * Current stock data.
   */
  stocks: Stock[];

  /**
   * Initializes the store.
   */
  initialize: (stocks: Stock[]) => void;

  /**
   * Updates an existing stock.
   */
  updateStock: (
    company: StockCompany,
    data: Partial<Omit<Stock, "company">>,
  ) => void;
};

/**
 * Zustand stock store.
 */
export const useStockStore = create<StockStore>()(
  devtools(
    (set) => ({
      stocks: [],

      initialize: (stocks) =>
        set(
          {
            stocks,
          },
          false,
          "stock/initialize",
        ),

      updateStock: (company, data) =>
        set(
          (state) => ({
            stocks: state.stocks.map((stock) =>
              stock.company === company
                ? {
                    ...stock,
                    ...data,
                  }
                : stock,
            ),
          }),
          false,
          "stock/updateStock",
        ),
    }),
    {
      name: "stock-store",
    },
  ),
);

/**
 * Initializes the stock store once and
 * exposes the current market data.
 */
export function useStock(initialData: Stock[]) {
  const stocks = useStockStore((state) => state.stocks);
  const initialize = useStockStore((state) => state.initialize);
  const updateStock = useStockStore((state) => state.updateStock);

  useEffect(() => {
    if (stocks.length === 0) {
      initialize(initialData);
    }
  }, [stocks.length, initialData, initialize]);

  return {
    stocks,
    updateStock,
  };
}
