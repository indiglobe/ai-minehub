import { read__AllNewsSchema } from "@repo/data/validators/news";
import { read__AllNews } from "@repo/data/querries/news";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__readAllNewsSchema = createServerFn()
  .validator(read__AllNewsSchema)
  .handler(async ({ data }) => {
    return await read__AllNews(data);
  });
