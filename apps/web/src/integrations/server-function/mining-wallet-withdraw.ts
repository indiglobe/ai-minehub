import { create__MiningWalletWithdraw } from "@repo/data/querries/mining-wallet-withdraw";
import { create__MiningWalletWithdrawSchema } from "@repo/data/validators/mining-wallet-withdraw";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__createMiningWalletWithdraw = createServerFn()
  .validator(create__MiningWalletWithdrawSchema)
  .handler(async ({ data }) => {
    return await create__MiningWalletWithdraw(data);
  });
