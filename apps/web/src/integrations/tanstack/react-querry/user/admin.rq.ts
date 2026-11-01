import {
  serverFn__readUserCount,
  serverFn__readUserMonthlyStats,
  serverFn__readAllUsers,
  serverFn__readOneUser,
  serverFn__updateUser,
} from "@/integrations/tanstack/server-function/user.sfn";
import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import type { ROLE } from "@repo/utils/db-enums";

type TROLE = (typeof ROLE)[number];

export const queryKeys = {
  __: () => ["user", "admin"],

  stat: {
    __: () => [...queryKeys.__(), "stat"],
  },

  count: {
    __: () => [...queryKeys.__(), "count"],

    withRole: (role: TROLE | TROLE[]) => [...queryKeys.count.__(), role],
  },

  withRole: (role: TROLE | TROLE[]) => [...queryKeys.__(), role],

  detail: {
    __: () => [...queryKeys.__(), "detail"],

    byId: (userId: string) => [...queryKeys.detail.__(), userId],
  },
} as const;

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadAllUsers() {
  const readAllUsers = useServerFn(serverFn__readAllUsers);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.withRole("BASIC"),

      queryFn: () =>
        readAllUsers({
          data: {
            identifier: {
              role: "BASIC",
            },
          },
        }),
    }),
  );
}
/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadOneUser(userId: string) {
  const readOneUser = useServerFn(serverFn__readOneUser);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.detail.byId(userId),

      queryFn: () =>
        readOneUser({
          data: {
            identifier: {
              id: userId,
            },
          },
        }),

      enabled: !!userId,
    }),
  );
}
/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadUserCount() {
  const readUserCount = useServerFn(serverFn__readUserCount);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.count.withRole("BASIC"),

      queryFn: () =>
        readUserCount({
          data: {
            identifier: {
              role: "BASIC",
            },
          },
        }),
    }),
  );
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadUserMonthlyStats() {
  const readUserMonthlyStats = useServerFn(serverFn__readUserMonthlyStats);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.stat.__(),

      queryFn: () => readUserMonthlyStats(),
    }),
  );
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useUpdateUser() {
  const updateUser = useServerFn(serverFn__updateUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.detail.__(),

    mutationFn: (data: Parameters<typeof updateUser>[0]["data"]) =>
      updateUser({ data }),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: queryKeys.detail.byId(variables.identifier.id),
        }),

        queryClient.invalidateQueries({
          queryKey: queryKeys.withRole("BASIC"),
        }),

        queryClient.invalidateQueries({
          queryKey: queryKeys.count.__(),
        }),

        queryClient.invalidateQueries({
          queryKey: queryKeys.stat.__(),
        }),
      ]);
    },
  });
}

export {
  useReadUserCount,
  useReadUserMonthlyStats,
  useReadAllUsers,
  useReadOneUser,
  useUpdateUser,
};
