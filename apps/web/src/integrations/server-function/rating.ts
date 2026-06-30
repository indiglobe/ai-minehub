import { read__AllRatingsSchema } from "@repo/data/validators/rating";
import { read__AllRatings } from "@repo/data/querries/rating";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__readAllRatings = createServerFn()
  .validator(read__AllRatingsSchema)
  .handler(async ({ data }) => {
    return await read__AllRatings(data);
  });
