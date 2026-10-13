import {
  serverFn__readAllUsers,
  serverFn__readUserCount,
} from "@/integrations/server-function/user";
import { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import { queryOptions, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";

export const querryKeys = {
  all: () => ["dashboard", "admin"],
  allUsers: () => [...querryKeys.all(), "all-users"],
  allMiningProfiles: () => [...querryKeys.all(), "all-mining-profiles"],
};

export function useFetchUserCount() {
  const readUserCount = useServerFn(serverFn__readUserCount);

  return useQuery(
    queryOptions({
      queryKey: querryKeys.all(),

      queryFn: () => readUserCount({ data: { identifier: { role: "BASIC" } } }),
    }),
  );
}

export function useFetchAllusers() {
  const readAllUsers = useServerFn(serverFn__readAllUsers);

  return useQuery(
    queryOptions({
      queryKey: querryKeys.allUsers(),

      queryFn: () => readAllUsers(),
    }),
  );
}

export function useFetchAllMiningPlans() {
  const readAllMiningProfiles = useServerFn(serverFn__readAllMiningProfiles);

  return useQuery(
    queryOptions({
      queryKey: querryKeys.allMiningProfiles(),

      queryFn: () => readAllMiningProfiles(),
    }),
  );
}
