import { read__AllReferalEarningSchema } from "@repo/data/validators/referal-earning";
import { read__AllReferalEarning } from "@repo/data/querries/referal-earning";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__readAllReferalEarning = createServerFn()
  .validator(read__AllReferalEarningSchema)
  .handler(async ({ data }) => {
    return await read__AllReferalEarning(data);
  });
