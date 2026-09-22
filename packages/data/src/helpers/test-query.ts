import { eq, getTableColumns, isNotNull, not, sql } from "drizzle-orm";
import { db } from "..";
import { MiningOrderTable, UserTable } from "@/schema";

(async () => {
  const userTableColumn = getTableColumns(UserTable);
  const miningOrderTableColumn = getTableColumns(MiningOrderTable);

  const res = await db
    .select
    //   {
    //   ...userTableColumn,
    //   miningOrders: sql`
    //   JSON_ARRAYAGG(
    //     JSON_OBJECT(
    //       'id', ${miningOrderTableColumn.id}
    //     )
    //   )
    //   `,
    // }
    ()
    .from(UserTable)
    .leftJoin(MiningOrderTable, eq(MiningOrderTable.orderedBy, UserTable.id))
    .where(isNotNull(MiningOrderTable.id))
    // .groupBy(UserTable.id)
    .limit(10);

  console.log(res);
})();
