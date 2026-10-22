import {
  create__MiningWalletDeposite,
  read__AllMiningWalletDeposite,
} from "@repo/data/querries/mining-wallet-deposits";
import {
  create__MiningWalletDepositeSchema,
  read__AllMiningWalletDepositeSchema,
} from "@repo/data/validators/mining-wallet-deposits";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__createMiningWalletDeposite = createServerFn()
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

export const serverFn__readAllMiningWalletDeposite = createServerFn()
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
