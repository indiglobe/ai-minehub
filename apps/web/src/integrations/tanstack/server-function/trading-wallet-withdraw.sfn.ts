import {
  create__TradingWalletWithdraw,
  read__TradingWalletWithdrawStats,
  read__TradingWalletMonthlyWithdrawStats,
  read__AllTradingWalletWithdraw,
  update__TradingWalletWithdraw,
} from "@repo/data/querries/trading-wallet-withdraw";
import {
  create__TradingWalletWithdrawSchema,
  read__TradingWalletWithdrawStatsSchema,
  read__TradingWalletMonthlyWithdrawStatsSchema,
  read__AllTradingWalletWithdrawSchema,
  update__TradingWalletWithdrawSchema,
} from "@repo/data/validators/trading-wallet-withdraw";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__createTradingWalletWithdraw = createServerFn({
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

const serverFn__readTradingWalletWithdrawStats = createServerFn({
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

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readTradingWalletMonthlyWithdrawStats = createServerFn({
  method: "GET",
})
  .validator(read__TradingWalletMonthlyWithdrawStatsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__TradingWalletMonthlyWithdrawStats(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readTradingWalletMonthlyWithdrawStats`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readAllTradingWalletWithdraw = createServerFn({
  method: "GET",
})
  .validator(read__AllTradingWalletWithdrawSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__AllTradingWalletWithdraw(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readAllTradingWalletWithdraw`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__updateTradingWalletWithdraw = createServerFn({
  method: "POST",
})
  .validator(update__TradingWalletWithdrawSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      update__TradingWalletWithdraw(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__updateTradingWalletWithdraw`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

export {
  serverFn__createTradingWalletWithdraw,
  serverFn__readTradingWalletWithdrawStats,
  serverFn__readTradingWalletMonthlyWithdrawStats,
  serverFn__readAllTradingWalletWithdraw,
  serverFn__updateTradingWalletWithdraw,
};
