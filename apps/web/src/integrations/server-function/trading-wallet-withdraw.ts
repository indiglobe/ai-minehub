import { create__TradingWalletWithdraw } from "@repo/data/querries/trading-wallet-withdraw";
import { create__TradingWalletWithdrawSchema } from "@repo/data/validators/trading-wallet-withdraw";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__createTradingWalletWithdraw = createServerFn()
  .validator(create__TradingWalletWithdrawSchema)
  .handler(async ({ data }) => {
    return await create__TradingWalletWithdraw(data);
  });
