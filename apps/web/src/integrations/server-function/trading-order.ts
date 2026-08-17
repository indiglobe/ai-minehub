import { read__AllTradingOrders } from "@repo/data/querries/trading-order";
import { read__AllTradingOrdersSchema } from "@repo/data/validators/trading-order";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__readAllTradingOrders = createServerFn()
  .validator(read__AllTradingOrdersSchema)
  .handler(async ({ data }) => {
    return await read__AllTradingOrders(data);
  });
