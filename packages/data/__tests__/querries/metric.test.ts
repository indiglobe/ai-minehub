import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { MetricsTable } from "@/schema";
import {
  create__Metric,
  read__AllMetrics,
  read__OneMetric,
  update__Metric,
  delete__Metric,
} from "@/querries/metric";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

let metric1Id: number;
let metric2Id: number;

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(MetricsTable);

  const [metric1] = await db
    .insert(MetricsTable)
    .values({
      value: "500",
      label: "Students Trained",
      suffix: "+",
      isVisible: true,
    })
    .$returningId();

  metric1Id = metric1!.id;

  const [metric2] = await db
    .insert(MetricsTable)
    .values({
      value: "95",
      label: "Success Rate",
      suffix: "%",
      isVisible: false,
    })
    .$returningId();

  metric2Id = metric2!.id;
});

afterAll(async () => {
  await db.delete(MetricsTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Metric Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates metric", async () => {
    const created = await create__Metric({
      value: "1000",
      label: "Active Users",
      suffix: "+",
      isVisible: true,
    });

    expect(created).not.toBeNull();

    expect(created?.id).toBeTypeOf("number");

    expect(created?.value).toBe("1000");
    expect(created?.label).toBe("Active Users");

    expect(created?.suffix).toBe("+");
    expect(created?.isVisible).toBe(true);

    expect(created?.tableIdentifierToken).toBe("MTRC");
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all metrics", async () => {
    const metrics = await read__AllMetrics();

    expect(Array.isArray(metrics)).toBe(true);
    expect(metrics.length).toBeGreaterThanOrEqual(2);

    for (const metric of metrics) {
      expect(metric.id).toBeTypeOf("number");

      expect(metric.value).toBeTruthy();
      expect(metric.label).toBeTruthy();

      expect(["+", "%"]).toContain(metric.suffix);

      expect(typeof metric.isVisible).toBe("boolean");

      expect(metric.tableIdentifierToken).toBe("MTRC");
    }
  });

  test("reads visible metrics only", async () => {
    const metrics = await read__AllMetrics({
      identifier: {
        isVisible: true,
      },
    });

    expect(metrics.length).toBeGreaterThan(0);

    for (const metric of metrics) {
      expect(metric.isVisible).toBe(true);
    }
  });

  test("reads hidden metrics only", async () => {
    const metrics = await read__AllMetrics({
      identifier: {
        isVisible: false,
      },
    });

    expect(metrics.length).toBeGreaterThan(0);

    for (const metric of metrics) {
      expect(metric.isVisible).toBe(false);
    }
  });

  test("reads metrics with limit", async () => {
    const metrics = await read__AllMetrics({
      queryOptions: {
        limit: 1,
      },
    });

    expect(metrics).toHaveLength(1);
  });

  test("reads metrics with skip", async () => {
    const all = await read__AllMetrics();

    const skipped = await read__AllMetrics({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads metrics with visibility filter and limit", async () => {
    const metrics = await read__AllMetrics({
      identifier: {
        isVisible: true,
      },
      queryOptions: {
        limit: 1,
      },
    });

    expect(metrics).toHaveLength(1);
    expect(metrics[0]?.isVisible).toBe(true);
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one metric", async () => {
    const metric = await read__OneMetric({
      identifier: {
        id: metric1Id,
      },
    });

    expect(metric).not.toBeNull();

    expect(metric?.id).toBe(metric1Id);

    expect(metric?.value).toBe("500");
    expect(metric?.label).toBe("Students Trained");

    expect(metric?.suffix).toBe("+");
    expect(metric?.isVisible).toBe(true);

    expect(metric?.tableIdentifierToken).toBe("MTRC");
  });

  test("returns null for non-existing metric", async () => {
    const metric = await read__OneMetric({
      identifier: {
        id: -99999,
      },
    });

    expect(metric).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates metric", async () => {
    const updated = await update__Metric({
      identifier: {
        id: metric2Id,
      },
      dataToUpdate: {
        label: "Updated Success Rate",
        isVisible: true,
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.label).toBe("Updated Success Rate");
    expect(updated?.isVisible).toBe(true);
  });

  test("updates metric value and suffix", async () => {
    const updated = await update__Metric({
      identifier: {
        id: metric1Id,
      },
      dataToUpdate: {
        value: "750",
        suffix: "%",
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.value).toBe("750");
    expect(updated?.suffix).toBe("%");
  });

  test("returns null when update contains only undefined fields", async () => {
    const updated = await update__Metric({
      identifier: {
        id: metric1Id,
      },
      dataToUpdate: {
        value: undefined,
        label: undefined,
        suffix: undefined,
        isVisible: undefined,
      },
    });

    expect(updated).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes metric", async () => {
    const created = await create__Metric({
      value: "999",
      label: "Delete Metric",
      suffix: "+",
      isVisible: true,
    });

    const deleted = await delete__Metric({
      identifier: {
        id: created!.id,
      },
    });

    expect(deleted).not.toBeNull();

    const rows = await db
      .select()
      .from(MetricsTable)
      .where(eq(MetricsTable.id, created!.id));

    expect(rows).toHaveLength(0);
  });

  test("returns null when deleting non-existing metric", async () => {
    const deleted = await delete__Metric({
      identifier: {
        id: -99999,
      },
    });

    expect(deleted).toBeNull();
  });
});
