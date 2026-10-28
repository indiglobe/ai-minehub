import {
  create__MiningWalletWithdraw,
  read__MiningWalletWithdrawStats,read__AllMiningWalletWithdraw
} from "@repo/data/querries/mining-wallet-withdraw";
import {
  create__MiningWalletWithdrawSchema,
  read__MiningWalletWithdrawStatsSchema,read__AllMiningWalletWithdrawSchema
} from "@repo/data/validators/mining-wallet-withdraw";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__createMiningWalletWithdraw = createServerFn({
  method: "POST",
})
  .validator(create__MiningWalletWithdrawSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      create__MiningWalletWithdraw(data),
    );

    if (serverFnError) {
      console.log(
        `Error in serverFnError in serverFn__createMiningWalletWithdraw`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readMiningWalletWithdrawStats = createServerFn({
  method: "GET",
})
  .validator(read__MiningWalletWithdrawStatsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__MiningWalletWithdrawStats(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readMiningWalletWithdrawStats`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readAllMiningWalletWithdraw = createServerFn({
  method: "GET",
})
  .validator(read__AllMiningWalletWithdrawSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__AllMiningWalletWithdraw(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readAllMiningWalletWithdraw`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });
