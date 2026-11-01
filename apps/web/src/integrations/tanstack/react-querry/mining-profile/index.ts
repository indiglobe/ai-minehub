import {
  queryOptions,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  serverFn__createMiningProfile,
  serverFn__readAllMiningProfiles,
  serverFn__updateMiningProfile,
  serverFn__deleteMiningProfile,
} from "@/integrations/tanstack/server-function/mining-profile.sfn";

export const queryKeys = {
  __: () => ["mining-profiles"],
};

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useReadAllMiningProfiles() {
  const readAllMiningProfiles = useServerFn(serverFn__readAllMiningProfiles);

  return useQuery(
    queryOptions({
      queryKey: queryKeys.__(),

      queryFn: () => readAllMiningProfiles(),
    }),
  );
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useCreateMiningProfile() {
  const queryClient = useQueryClient();

  const createMiningProfile = useServerFn(serverFn__createMiningProfile);

  return useMutation({
    mutationFn: createMiningProfile,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.__(),
      });
    },
  });
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useUpdateMiningProfile() {
  const queryClient = useQueryClient();

  const updateMiningProfile = useServerFn(serverFn__updateMiningProfile);

  return useMutation({
    mutationFn: updateMiningProfile,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.__(),
      });
    },
  });
}

/**
 * ==========================================
 * ==========================================
 * ==========================================
 * ==========================================
 */

function useDeleteMiningProfile() {
  const queryClient = useQueryClient();

  const deleteMiningProfile = useServerFn(serverFn__deleteMiningProfile);

  return useMutation({
    mutationFn: deleteMiningProfile,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: queryKeys.__(),
      });
    },
  });
}

export {
  useReadAllMiningProfiles,
  useCreateMiningProfile,
  useUpdateMiningProfile,
  useDeleteMiningProfile,
};
