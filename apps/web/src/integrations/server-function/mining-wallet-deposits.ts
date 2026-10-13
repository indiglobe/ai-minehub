import { create__MiningWalletDeposite } from "@repo/data/querries/mining-wallet-deposits";
import { create__MiningWalletDepositeSchema } from "@repo/data/validators/mining-wallet-deposits";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__createMiningWalletDeposite = createServerFn()
  .validator(create__MiningWalletDepositeSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      create__MiningWalletDeposite(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__createMiningWalletDeposite`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });
