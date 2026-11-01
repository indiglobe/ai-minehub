import {
  read__OneUser,
  read__AllUsers,
  create__User,
  read__Referrals,
  read__UserCount,
  update__User,
  read__UserMonthlyStats,
} from "@repo/data/querries/user";
import {
  read__OneUserSchema,
  create__UserSchema,
  read__AllUsersSchema,
  read__ReferralsSchema,
  read__UserCountSchema,
  update__UserSchema,
  read__UserMonthlyStatsSchema,
} from "@repo/data/validators/user";
import { createServerFn } from "@tanstack/react-start";
import { tryCatch } from "@repo/utils/try-catch";

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readUserCount = createServerFn({
  method: "GET",
})
  .validator(read__UserCountSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__UserCount(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readUserCount`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readOneUser = createServerFn({
  method: "GET",
})
  .validator(read__OneUserSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(read__OneUser(data));

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readOneUser`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__createUser = createServerFn({
  method: "POST",
})
  .validator(create__UserSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(create__User(data));

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__createUser`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readAllUsers = createServerFn({
  method: "GET",
})
  .validator(read__AllUsersSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__AllUsers(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readAllUsers`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readReferrals = createServerFn({
  method: "GET",
})
  .validator(read__ReferralsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__Referrals(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readReferrals`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__updateUser = createServerFn({
  method: "POST",
})
  .validator(update__UserSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(update__User(data));

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__updateUser`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

// +++++++++++++++++++++++++++++++++++++++++++
// ===========================================
// +++++++++++++++++++++++++++++++++++++++++++

const serverFn__readUserMonthlyStats = createServerFn({
  method: "GET",
})
  .validator(read__UserMonthlyStatsSchema)
  .handler(async ({ data }) => {
    const [serverFnError, serverFnResult] = await tryCatch(
      read__UserMonthlyStats(data),
    );

    if (serverFnError) {
      console.error(`Error in serverFnError in serverFn__readUserMonthlyStats`);
      console.error(serverFnError);
      throw serverFnError;
    }

    return serverFnResult;
  });

export {
  serverFn__readUserCount,
  serverFn__readOneUser,
  serverFn__createUser,
  serverFn__readAllUsers,
  serverFn__readReferrals,
  serverFn__updateUser,
  serverFn__readUserMonthlyStats,
};
