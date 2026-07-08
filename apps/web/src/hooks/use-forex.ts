import { useEffect } from "react";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

/**
 * Supported forex currency pairs.
 */
export type CurrencyPair =
  | "EUR/USD"
  | "GBP/USD"
  | "USD/JPY"
  | "USD/CHF"
  | "AUD/USD"
  | "USD/CAD";

/**
 * Represents a forex market quote.
 */
export interface ForexPair {
  /**
   * Currency pair identifier.
   */
  pair: CurrencyPair;

  /**
   * Current bid price.
   */
  bid: number;

  /**
   * Current ask price.
   */
  ask: number;

  /**
   * Percentage or point change from the previous value.
   */
  change: number;
}

/**
 * Forex store state and actions.
 *
 * This store maintains the current list of forex pairs
 * and exposes actions for initialization and updates.
 *
 * State is kept in memory only and is intended to be
 * initialized once during the application's lifecycle.
 */
type ForexStore = {
  /**
   * Current forex market data.
   */
  pairs: ForexPair[];

  /**
   * Initializes the store with the initial market data.
   *
   * @param pairs Initial forex pairs.
   */
  initialize: (pairs: ForexPair[]) => void;

  /**
   * Updates an existing currency pair.
   *
   * Only the provided fields are updated while preserving
   * the remaining values.
   *
   * @param pair Currency pair to update.
   * @param data Partial quote values.
   */
  updatePair: (
    pair: CurrencyPair,
    data: Partial<Omit<ForexPair, "pair">>,
  ) => void;
};

/**
 * useForexStore (Zustand store hook)
 *
 * Provides an in-memory store for forex market data.
 *
 * Responsibilities:
 * - Store the current list of forex pairs
 * - Initialize market data once
 * - Update individual currency pairs efficiently
 *
 * Note:
 * Data is not persisted and resets on page refresh.
 */
export const useForexStore = create<ForexStore>()(
  devtools(
    (set) => ({
      pairs: [],

      initialize: (pairs) => set({ pairs }, false, "forex/initialize"),

      updatePair: (pair, data) =>
        set(
          (state) => ({
            pairs: state.pairs.map((p) =>
              p.pair === pair ? { ...p, ...data } : p,
            ),
          }),
          false,
          "forex/updatePair",
        ),
    }),
    {
      name: "forex-store",
    },
  ),
);

/**
 * Initializes the forex store with the provided data
 * on first use and returns the complete store.
 *
 * Initialization only occurs if the store has not
 * already been populated.
 *
 * @param initialData Initial forex market data.
 * @returns Zustand forex store.
 */
export function useForex(initialData: ForexPair[]) {
  const pairs = useForexStore((state) => state.pairs);
  const initialize = useForexStore((state) => state.initialize);
  const updatePair = useForexStore((state) => state.updatePair);

  useEffect(() => {
    if (pairs.length === 0) {
      initialize(initialData);
    }
  }, [pairs.length, initialData, initialize]);

  return { pairs, updatePair };
}
