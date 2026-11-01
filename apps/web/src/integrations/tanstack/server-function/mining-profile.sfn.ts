import {
  read__AllMiningProfiles,
  update__MiningProfile,
  delete__MiningProfile,
  create__MiningProfile,
} from "@repo/data/querries/mining-profile";
import {
  read__AllMiningProfilesSchema,
  update__MiningProfileSchema,
  delete__MiningProfileSchema,
  create__MiningProfileSchema,
} from "@repo/data/validators/mining-profile";
import { tryCatch } from "@repo/utils/try-catch";
import { createServerFn } from "@tanstack/react-start";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__createMiningProfile = createServerFn({ method: "POST" })
  .validator(create__MiningProfileSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      create__MiningProfile(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__createMiningProfile`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readAllMiningProfiles = createServerFn({ method: "GET" })
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

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__updateMiningProfile = createServerFn({ method: "GET" })
  .validator(update__MiningProfileSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      update__MiningProfile(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__updateMiningProfile`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__deleteMiningProfile = createServerFn({ method: "GET" })
  .validator(delete__MiningProfileSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResponse] = await tryCatch(
      delete__MiningProfile(data),
    );

    if (serverFnError) {
      console.log(`Error in serverFnError in serverFn__deleteMiningProfile`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResponse;
  });

export {
  serverFn__createMiningProfile,
  serverFn__readAllMiningProfiles,
  serverFn__updateMiningProfile,
  serverFn__deleteMiningProfile,
};
