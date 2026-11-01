import {
  create__MiningWalletDeposit,
  read__AllMiningWalletDeposit,
  read__MiningWalletDepositStats,
  update__MiningWalletDeposit,
  read__MiningWalletMonthlyDepositStats,
} from "@repo/data/querries/mining-wallet-deposits";
import {
  create__MiningWalletDepositSchema,
  read__AllMiningWalletDepositSchema,
  read__MiningWalletDepositStatsSchema,
  update__MiningWalletDepositSchema,
  read__MiningWalletMonthlyDepositStatsSchema,
} from "@repo/data/validators/mining-wallet-deposits";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__createMiningWalletDeposit = createServerFn({
  method: "POST",
})
  .validator(create__MiningWalletDepositSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      create__MiningWalletDeposit(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__createMiningWalletDeposit`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readAllMiningWalletDeposit = createServerFn({
  method: "GET",
})
  .validator(read__AllMiningWalletDepositSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__AllMiningWalletDeposit(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readAllMiningWalletDeposit`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readMiningWalletDepositStats = createServerFn({
  method: "GET",
})
  .validator(read__MiningWalletDepositStatsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__MiningWalletDepositStats(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readMiningWalletDepositStats`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__updateMiningWalletDeposit = createServerFn({
  method: "POST",
})
  .validator(update__MiningWalletDepositSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      update__MiningWalletDeposit(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__updateMiningWalletDeposit`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readMiningWalletMonthlyDepositStats = createServerFn({
  method: "GET",
})
  .validator(read__MiningWalletMonthlyDepositStatsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__MiningWalletMonthlyDepositStats(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readMiningWalletMonthlyDepositStats`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

export {
  serverFn__createMiningWalletDeposit,
  serverFn__readAllMiningWalletDeposit,
  serverFn__readMiningWalletDepositStats,
  serverFn__updateMiningWalletDeposit,
  serverFn__readMiningWalletMonthlyDepositStats,
};
