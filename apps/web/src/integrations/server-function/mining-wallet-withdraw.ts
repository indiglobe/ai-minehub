import { create__MiningWalletWithdraw } from "@repo/data/querries/mining-wallet-withdraw";
import { create__MiningWalletWithdrawSchema } from "@repo/data/validators/mining-wallet-withdraw";
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
