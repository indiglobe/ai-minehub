import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { WebinarTable } from "@/schema";
import {
  create__Webinar,
  read__AllWebinars,
  read__OneWebinar,
  update__Webinar,
  delete__Webinar,
  read__MostUpcomingWebinar,
  read__MostRecentWebinar,
  read__AllUpcomingWebinars,
  read__AllPastWebinars,
  read__TodaysWebinars,
} from "@/querries/webinar-offered";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";
import { id } from "@repo/utils/id";

const pastWebinarId = id();
const futureWebinarId = id();
const todayWebinarId = id();

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(WebinarTable);

  const now = new Date();

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);

  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const today = new Date(now);
  today.setHours(12, 0, 0, 0);

  await db.insert(WebinarTable).values([
    {
      id: pastWebinarId,
      topic: "Past Webinar",
      scheduledAt: yesterday,
      durationInMinutes: 60,
      originalPrice: 1000,
      discountedPrice: 500,
      joiningUrl: "https://example.com/past",
    },
    {
      id: futureWebinarId,
      topic: "Future Webinar",
      scheduledAt: tomorrow,
      durationInMinutes: 90,
      originalPrice: 2000,
      discountedPrice: 1000,
      joiningUrl: "https://example.com/future",
    },
    {
      id: todayWebinarId,
      topic: "Today Webinar",
      scheduledAt: today,
      durationInMinutes: 120,
      originalPrice: 3000,
      discountedPrice: 1500,
      joiningUrl: "https://example.com/today",
    },
  ]);
});

afterAll(async () => {
  await db.delete(WebinarTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Webinar Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates webinar", async () => {
    const webinarId = id();

    const created = await create__Webinar({
      id: webinarId,
      topic: "Created Webinar",
      scheduledAt: new Date("2030-01-01"),
      durationInMinutes: 180,
      originalPrice: 5000,
      discountedPrice: 2500,
      joiningUrl: "https://example.com/create",
    });

    expect(created).not.toBeNull();

    expect(created?.id).toBe(webinarId);

    expect(created?.topic).toBe("Created Webinar");

    expect(created?.durationInMinutes).toBe(180);

    expect(created?.originalPrice).toBe(5000);

    expect(created?.discountedPrice).toBe(2500);

    expect(created?.joiningUrl).toBe("https://example.com/create");

    expect(created?.tableIdentifierToken).toBe("WBNR");
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all webinars", async () => {
    const webinars = await read__AllWebinars();

    expect(Array.isArray(webinars)).toBe(true);

    expect(webinars.length).toBeGreaterThanOrEqual(3);

    for (const webinar of webinars) {
      expect(webinar.id).toHaveLength(10);

      expect(webinar.topic).toBeTruthy();

      expect(webinar.scheduledAt).toBeInstanceOf(Date);

      expect(webinar.originalPrice).toBeTypeOf("number");

      expect(webinar.joiningUrl).toContain("https://");

      expect(webinar.tableIdentifierToken).toBe("WBNR");
    }
  });

  test("reads webinars with limit", async () => {
    const webinars = await read__AllWebinars({
      queryOptions: {
        limit: 1,
      },
    });

    expect(webinars).toHaveLength(1);
  });

  test("reads webinars with skip", async () => {
    const all = await read__AllWebinars();

    const skipped = await read__AllWebinars({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads webinars filtered by topic", async () => {
    const webinars = await read__AllWebinars({
      identifier: {
        topic: "Future Webinar",
      },
    });

    expect(webinars).toHaveLength(1);

    expect(webinars[0]?.topic).toBe("Future Webinar");
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one webinar", async () => {
    const webinar = await read__OneWebinar({
      identifier: {
        id: futureWebinarId,
      },
    });

    expect(webinar).not.toBeNull();

    expect(webinar?.id).toBe(futureWebinarId);

    expect(webinar?.topic).toBe("Future Webinar");

    expect(webinar?.tableIdentifierToken).toBe("WBNR");
  });

  test("returns null for non-existing webinar", async () => {
    const webinar = await read__OneWebinar({
      identifier: {
        id: "INVALID123",
      },
    });

    expect(webinar).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates webinar", async () => {
    const updated = await update__Webinar({
      identifier: {
        id: futureWebinarId,
      },
      dataToUpdate: {
        topic: "Updated Webinar",
        durationInMinutes: 150,
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.topic).toBe("Updated Webinar");

    expect(updated?.durationInMinutes).toBe(150);
  });

  test("returns null when update contains only undefined fields", async () => {
    const updated = await update__Webinar({
      identifier: {
        id: futureWebinarId,
      },
      dataToUpdate: {
        topic: undefined,
        joiningUrl: undefined,
      },
    });

    expect(updated).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes webinar", async () => {
    const created = await create__Webinar({
      topic: "Delete Webinar",
      scheduledAt: new Date("2035-01-01"),
      durationInMinutes: 45,
      originalPrice: 100,
      discountedPrice: 50,
      joiningUrl: "https://example.com/delete",
    });

    const deleted = await delete__Webinar({
      identifier: {
        id: created!.id,
      },
    });

    expect(deleted).not.toBeNull();

    const rows = await db
      .select()
      .from(WebinarTable)
      .where(eq(WebinarTable.id, created!.id));

    expect(rows).toHaveLength(0);
  });

  test("returns null when deleting non-existing webinar", async () => {
    const deleted = await delete__Webinar({
      identifier: {
        id: "INVALID123",
      },
    });

    expect(deleted).toBeNull();
  });

  /**
   * --------------------------------------------------
   * MOST UPCOMING
   * --------------------------------------------------
   */

  test("reads most upcoming webinar", async () => {
    const webinar = await read__MostUpcomingWebinar();

    expect(webinar).not.toBeNull();

    expect(webinar!.scheduledAt.getTime()).toBeGreaterThan(Date.now());
  });

  /**
   * --------------------------------------------------
   * MOST RECENT
   * --------------------------------------------------
   */

  test("reads most recent webinar", async () => {
    const webinar = await read__MostRecentWebinar();

    expect(webinar).not.toBeNull();

    expect(webinar!.scheduledAt.getTime()).toBeLessThan(Date.now());
  });

  /**
   * --------------------------------------------------
   * ALL UPCOMING
   * --------------------------------------------------
   */

  test("reads all upcoming webinars", async () => {
    const webinars = await read__AllUpcomingWebinars();

    expect(webinars.length).toBeGreaterThan(0);

    for (const webinar of webinars) {
      expect(webinar.scheduledAt.getTime()).toBeGreaterThan(Date.now());
    }
  });

  test("reads upcoming webinars with limit", async () => {
    const webinars = await read__AllUpcomingWebinars({
      queryOptions: {
        limit: 1,
      },
    });

    expect(webinars).toHaveLength(1);
  });

  /**
   * --------------------------------------------------
   * ALL PAST
   * --------------------------------------------------
   */

  test("reads all past webinars", async () => {
    const webinars = await read__AllPastWebinars();

    expect(webinars.length).toBeGreaterThan(0);

    for (const webinar of webinars) {
      expect(webinar.scheduledAt.getTime()).toBeLessThan(Date.now());
    }
  });

  test("reads past webinars with limit", async () => {
    const webinars = await read__AllPastWebinars({
      queryOptions: {
        limit: 1,
      },
    });

    expect(webinars).toHaveLength(1);
  });

  /**
   * --------------------------------------------------
   * TODAY'S WEBINARS
   * --------------------------------------------------
   */

  test("reads today's webinars", async () => {
    const webinars = await read__TodaysWebinars();

    expect(webinars.length).toBeGreaterThan(0);

    expect(webinars.some((w) => w.id === todayWebinarId)).toBe(true);
  });

  test("reads today's webinars with limit", async () => {
    const webinars = await read__TodaysWebinars({
      queryOptions: {
        limit: 1,
      },
    });

    expect(webinars).toHaveLength(1);
  });
});
