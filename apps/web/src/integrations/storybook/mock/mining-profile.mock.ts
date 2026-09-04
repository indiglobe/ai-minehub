import type { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import type { DeepPartial } from "@/utils/types/storybook";

export function mocked__serverFn__readAllMiningProfiles() {
  return [
    {
      id: "1c57c33e6c",
      maximumAllowedAmount: 399,
      minimumAllowedAmount: 299,
      lockinPeriod: 60,
      category: "Eos aspicio bardus.",
      dailyReturn: 0.22,
      isPopular: false,
      createdAt: "2026-08-20 21:25:52.595000",
      updatedAt: "2026-08-20 21:25:52.595000",
      tableIdentifierToken: "MPRO",
      orders: [],
    },
  ] satisfies DeepPartial<
    Awaited<ReturnType<typeof serverFn__readAllMiningProfiles>>
  >;
}
