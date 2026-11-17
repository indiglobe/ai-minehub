
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { serverFn__readAllChats } from "@/integrations/tanstack/server-function/chat.sfn";
import type z from "zod";
import type { read__AllChatsSchema } from "@repo/data/validators/chat";

// =====================================
// =====================================
// ======================================

type TReadAllChats = z.infer<typeof read__AllChatsSchema>;
type TReadAllChatsIdentifier = TReadAllChats["identifier"];

// =====================================
// =====================================
// ======================================

export const chatsQueryKeys = {
  all: () => ["chats", "basic"] as const,

  list: {
    all: () => [...chatsQueryKeys.all(), "list"] as const,

    normal: (options: TReadAllChats) =>
      [...chatsQueryKeys.list.all(), "normal", options] as const,

    infinite: (options: {
      identifier: TReadAllChatsIdentifier;
      limit?: number;
    }) => [...chatsQueryKeys.list.all(), "infinite", options] as const,
  },
} as const;

// =====================================
// NORMAL QUERY
// =====================================

function useReadAllChats(options: TReadAllChats) {
  const readAllChats = useServerFn(serverFn__readAllChats);

  return useQuery({
    queryKey: chatsQueryKeys.list.normal(options),

    queryFn: () =>
      readAllChats({
        data: options,
      }),
  });
}

// =====================================
// INFINITE QUERY
// =====================================

function useInfiniteReadAllChats(options: {
  identifier: TReadAllChatsIdentifier;
  limit?: number;
}) {
  const readAllChats = useServerFn(serverFn__readAllChats);

  const limit = options.limit ?? 20;

  return useInfiniteQuery({
    queryKey: chatsQueryKeys.list.infinite(options),

    initialPageParam: 0,

    queryFn: ({ pageParam }) =>
      readAllChats({
        data: {
          identifier: options.identifier,
          queryOptions: {
            skip: pageParam,
            limit,
          },
        },
      }),

    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < limit) {
        return undefined;
      }

      return allPages.length * limit;
    },
  });
}

// =====================================
// =====================================
// ======================================

export {
  useReadAllChats,
  useInfiniteReadAllChats,
};
