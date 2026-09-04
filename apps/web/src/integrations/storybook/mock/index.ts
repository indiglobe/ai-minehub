import { serverFn__readOneMiningWallet } from "@/integrations/server-function/mining-wallet";
import { fetchUserDetailsCookie } from "@/lib/auth/session";
import { mocked } from "storybook/test";
import { mocked__serverFn__readAllMiningOrders } from "./mining-order.mock";
import { serverFn__readAllMiningOrders } from "@/integrations/server-function/mining-order";
import { mocked__serverFn__readAllMiningProfiles } from "./mining-profile.mock";
import { mocked__serverFn__readAllNewsSchema } from "./news.mock";
import { mocked__serverFn__readAllRatings } from "./rating.mock";
import { mocked__serverFn__readAllTradingOrders } from "./trading-order.mock";
import { mocked__serverFn__readOneMiningWallet } from "./mining-wallet.mock";
import { mocked__serverFn__readOneTradingWallet } from "./trading-wallet.mock";
import { mocked__serverFn__readOneUser } from "./users.mock";
import { serverFn__readAllMiningProfiles } from "@/integrations/server-function/mining-profile";
import { serverFn__readAllNewsSchema } from "@/integrations/server-function/news";
import { serverFn__readAllRatings } from "@/integrations/server-function/rating";
import { serverFn__readAllTradingOrders } from "@/integrations/server-function/trading-order";
import { serverFn__readOneTradingWallet } from "@/integrations/server-function/trading-wallet";
import { serverFn__readOneUser } from "@/integrations/server-function/user";
import { QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function beforeEach() {
  queryClient.clear();

  mocked(fetchUserDetailsCookie).mockResolvedValue({} as any);
  mocked(serverFn__readAllMiningOrders).mockResolvedValue(
    mocked__serverFn__readAllMiningOrders as any,
  );
  mocked(serverFn__readAllMiningProfiles).mockResolvedValue(
    mocked__serverFn__readAllMiningProfiles as any,
  );
  mocked(serverFn__readAllNewsSchema).mockResolvedValue(
    mocked__serverFn__readAllNewsSchema as any,
  );
  mocked(serverFn__readAllRatings).mockResolvedValue(
    mocked__serverFn__readAllRatings as any,
  );
  mocked(serverFn__readAllTradingOrders).mockResolvedValue(
    mocked__serverFn__readAllTradingOrders as any,
  );
  mocked(serverFn__readOneMiningWallet).mockResolvedValue(
    mocked__serverFn__readOneMiningWallet as any,
  );
  mocked(serverFn__readOneTradingWallet).mockResolvedValue(
    mocked__serverFn__readOneTradingWallet as any,
  );
  mocked(serverFn__readOneUser).mockResolvedValue(
    mocked__serverFn__readOneUser as any,
  );
}
