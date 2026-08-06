import { create__TradingWallet } from "@repo/data/querries/trading-wallet";
import { create__TradingWalletSchema } from "@repo/data/validators/trading-wallet";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__createTradingWallet = createServerFn()
  .validator(create__TradingWalletSchema)
  .handler(async ({ data }) => {
    return await create__TradingWallet(data);
  });
