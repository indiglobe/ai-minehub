import {
  create__TradingWalletDeposit,
  read__TradingWalletDepositStats,
  read__AllTradingWalletDeposit,
  read__TradingWalletMonthlyDepositStats,
  update__TradingWalletDeposit,
} from "@repo/data/querries/trading-wallet-deposits";
import {
  create__TradingWalletDepositSchema,
  read__TradingWalletDepositStatsSchema,
  read__AllTradingWalletDepositSchema,
  read__TradingWalletMonthlyDepositStatsSchema,
  update__TradingWalletDepositSchema,
} from "@repo/data/validators/trading-wallet-deposits";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__createTradingWalletDeposit = createServerFn({
  method: "POST",
})
  .validator(create__TradingWalletDepositSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      create__TradingWalletDeposit(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__createTradingWalletDeposit`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readTradingWalletDepositStats = createServerFn({
  method: "GET",
})
  .validator(read__TradingWalletDepositStatsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__TradingWalletDepositStats(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readTradingWalletDepositStats`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readAllTradingWalletDeposit = createServerFn({
  method: "GET",
})
  .validator(read__AllTradingWalletDepositSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__AllTradingWalletDeposit(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readAllTradingWalletDeposit`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readTradingWalletMonthlyDepositStats = createServerFn({
  method: "GET",
})
  .validator(read__TradingWalletMonthlyDepositStatsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__TradingWalletMonthlyDepositStats(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readTradingWalletMonthlyDepositStats`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__updateTradingWalletDeposit = createServerFn({
  method: "POST",
})
  .validator(update__TradingWalletDepositSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      update__TradingWalletDeposit(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__updateTradingWalletDeposit`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

export {
  serverFn__createTradingWalletDeposit,
  serverFn__readTradingWalletDepositStats,
  serverFn__readAllTradingWalletDeposit,
  serverFn__readTradingWalletMonthlyDepositStats,
  serverFn__updateTradingWalletDeposit,
};
