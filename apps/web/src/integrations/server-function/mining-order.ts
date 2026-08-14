import { read__AllMiningOrders } from "@repo/data/querries/mining-order";
import { read__AllMiningOrdersSchema } from "@repo/data/validators/mining-order";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__readAllMiningOrders = createServerFn()
  .validator(read__AllMiningOrdersSchema)
  .handler(async ({ data }) => {
    return await read__AllMiningOrders(data);
  });
