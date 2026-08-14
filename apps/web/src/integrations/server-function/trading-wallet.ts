import {
  create__TradingWallet,
  read__OneTradingWallet,
} from "@repo/data/querries/trading-wallet";
import {
  create__TradingWalletSchema,
  read__OneTradingWalletSchema,
} from "@repo/data/validators/trading-wallet";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__createTradingWallet = createServerFn()
  .validator(create__TradingWalletSchema)
  .handler(async ({ data }) => {
    return await create__TradingWallet(data);
  });

export const serverFn__readOneTradingWallet = createServerFn()
  .validator(read__OneTradingWalletSchema)
  .handler(async ({ data }) => {
    return await read__OneTradingWallet(data);
  });
