import { read__AllMiningProfiles, } from "@repo/data/querries/mining-profile";
import { read__AllMiningProfilesSchema } from "@repo/data/validators/mining-profile";
import { createServerFn } from "@tanstack/react-start";

export const serverFn__readAllMiningProfiles = createServerFn()
  .validator(read__AllMiningProfilesSchema)
  .handler(async ({ data }) => {
    return await read__AllMiningProfiles(data);
  });
