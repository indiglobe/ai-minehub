import { read__AllMiningProfiles } from "@repo/data/querries/mining-profile";
import { read__AllMiningProfilesSchema } from "@repo/data/validators/mining-profile";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

export const serverFn__readAllMiningProfiles = createServerFn({ method: "GET" })
  .validator(read__AllMiningProfilesSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      read__AllMiningProfiles(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__readAllMiningProfiles`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });
