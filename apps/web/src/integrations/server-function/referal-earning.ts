import { read__AllReferalEarningSchema ,create__ReferalEarningSchema} from "@repo/data/validators/referal-earning";
import { read__AllReferalEarning ,create__ReferalEarning} from "@repo/data/querries/referal-earning";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__createReferalEarning = createServerFn()
  .validator(create__ReferalEarningSchema)
  .handler(async ({ data }) => {
    return await create__ReferalEarning(data);
  });

export const serverFn__readAllReferalEarning = createServerFn()
  .validator(read__AllReferalEarningSchema)
  .handler(async ({ data }) => {
    return await read__AllReferalEarning(data);
  });
