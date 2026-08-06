import {
  read__OneMiningWallet,
  create__MiningWallet,
} from "@repo/data/querries/mining-wallet";
import {
  read__OneMiningWalletSchema,
  create__MiningWalletSchema,
} from "@repo/data/validators/mining-wallet";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__createMiningWallet = createServerFn()
  .validator(create__MiningWalletSchema)
  .handler(async ({ data }) => {
    return await create__MiningWallet(data);
  });

export const serverFn__readOneMiningWallet = createServerFn()
  .validator(read__OneMiningWalletSchema)
  .handler(async ({ data }) => {
    return await read__OneMiningWallet(data);
  });
