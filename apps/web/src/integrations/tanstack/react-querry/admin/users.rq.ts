import { queryOptions, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

import {
  serverFn__readAllUsers,
  serverFn__readUserCount,
} from "@/integrations/server-function/user";
import type { ROLE } from "@repo/utils/db-enums";

type TROLE = (typeof ROLE)[number];

// Query keys
export const adminUserQueryKeys = {
  all: ["admin", "users"] as const,

  lists: () => [...adminUserQueryKeys.all, "list"] as const,

  counts: () => [...adminUserQueryKeys.all, "count"] as const,

  countByRole: (role: TROLE | TROLE[]) =>
    [...adminUserQueryKeys.counts(), role] as const,
};

// Query hooks
export function useReadAllUsers() {
  const readAllUsers = useServerFn(serverFn__readAllUsers);

  return useQuery(
    queryOptions({
      queryKey: adminUserQueryKeys.lists(),
      queryFn: () => readAllUsers(),
    }),
  );
}

export function useReadUserCount(role: TROLE | TROLE[]) {
  const readUserCount = useServerFn(serverFn__readUserCount);

  return useQuery(
    queryOptions({
      queryKey: adminUserQueryKeys.countByRole(role),
      queryFn: () =>
        readUserCount({
          data: {
            identifier: { role },
          },
        }),
    }),
  );
}
