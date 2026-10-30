import {
  create__MiningWalletDeposite,
  read__AllMiningWalletDeposite,
  read__MiningWalletDepositStats,
  update__MiningWalletDeposite,
} from "@repo/data/querries/mining-wallet-deposits";
import {
  create__MiningWalletDepositeSchema,
  read__AllMiningWalletDepositeSchema,
  read__MiningWalletDepositStatsSchema,
  update__MiningWalletDepositeSchema,
} from "@repo/data/validators/mining-wallet-deposits";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__createMiningWalletDeposite = createServerFn({
  method: "POST",
})
  .validator(create__MiningWalletDepositeSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      create__MiningWalletDeposite(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__createMiningWalletDeposite`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readAllMiningWalletDeposite = createServerFn({
  method: "GET",
})
  .validator(read__AllMiningWalletDepositeSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__AllMiningWalletDeposite(data),
    );

    if (serverFnError) {
      console.error(
        `Error in serverFnError in serverFn__readAllMiningWalletDeposite`,
      );
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readMiningWalletDepositStats = createServerFn({
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

export const serverFn__updateMiningWalletDeposit = createServerFn({
  method: "POST",
})
  .validator(update__MiningWalletDepositeSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      update__MiningWalletDeposite(data),
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
