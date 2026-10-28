import {
  create__TradingWalletWithdraw,
  read__TradingWalletWithdrawStats,
} from "@repo/data/querries/trading-wallet-withdraw";
import {
  create__TradingWalletWithdrawSchema,
  read__TradingWalletWithdrawStatsSchema,
} from "@repo/data/validators/trading-wallet-withdraw";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__createTradingWalletWithdraw = createServerFn({
  method: "POST",
})
  .validator(create__TradingWalletWithdrawSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      create__TradingWalletWithdraw(data),
    );

    if (serverFnError) {
      console.log(
        `Error in serverFnError in serverFn__createTradingWalletWithdraw`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readTradingWalletWithdrawStats = createServerFn({
  method: "GET",
})
  .validator(read__TradingWalletWithdrawStatsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__TradingWalletWithdrawStats(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readTradingWalletWithdrawStats`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });
