import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { CourseAssetTable, CourseModuleTable, CourseTable } from "@/schema";
import {
  create__CourseAsset,
  read__AllCourseAssets,
  read__OneCourseAsset,
  update__CourseAsset,
  delete__CourseAsset,
} from "@/querries/course-asset";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

let courseId: string;
let moduleId: string;

let asset1Id: string;
let asset2Id: string;

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(CourseAssetTable);
  await db.delete(CourseModuleTable);
  await db.delete(CourseTable);

  await db.insert(CourseTable).values({
    topic: "Programming",
    title: "Full Stack Development",
    brochureUrl: "https://example.com/brochure.pdf",
    originalPrice: 10000,
    discountedPrice: 5000,
    thumbnailUrl: "https://example.com/course-thumbnail.jpg",
  });

  const [course] = await db.select().from(CourseTable).limit(1);

  courseId = course!.id;

  await db.insert(CourseModuleTable).values({
    title: "Introduction",
    description: "Introduction module",
    displayOrder: 1,
    courseId,
  });

  const [module] = await db.select().from(CourseModuleTable).limit(1);

  moduleId = module!.id;

  await db.insert(CourseAssetTable).values({
    assetUrl: "https://example.com/video-1.mp4",
    thumbnailUrl: "https://example.com/thumb-1.jpg",
    title: "Getting Started",
    description: "Introduction video",
    moduleId,
    accessLevel: "free",
    assetType: "video",
  });

  const [asset1] = await db
    .select()
    .from(CourseAssetTable)
    .where(eq(CourseAssetTable.assetUrl, "https://example.com/video-1.mp4"));

  asset1Id = asset1!.id;

  await db.insert(CourseAssetTable).values({
    assetUrl: "https://example.com/doc-1.pdf",
    thumbnailUrl: "https://example.com/thumb-2.jpg",
    title: "Course Notes",
    description: "Module notes",
    moduleId,
    accessLevel: "paid",
    assetType: "document",
  });

  const [asset2] = await db
    .select()
    .from(CourseAssetTable)
    .where(eq(CourseAssetTable.assetUrl, "https://example.com/doc-1.pdf"));

  asset2Id = asset2!.id;
});

afterAll(async () => {
  await db.delete(CourseAssetTable);
  await db.delete(CourseModuleTable);
  await db.delete(CourseTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Course Asset Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates course asset", async () => {
    const result = await create__CourseAsset({
      assetUrl: "https://example.com/new-video.mp4",
      thumbnailUrl: "https://example.com/new-thumb.jpg",
      title: "New Asset",
      description: "New asset description",
      moduleId,
      accessLevel: "paid",
      assetType: "video",
    });

    expect(result).not.toBeNull();

    expect(result?.id).toBeTruthy();

    expect(result?.assetUrl).toBe("https://example.com/new-video.mp4");

    expect(result?.thumbnailUrl).toBe("https://example.com/new-thumb.jpg");

    expect(result?.title).toBe("New Asset");

    expect(result?.description).toBe("New asset description");

    expect(result?.moduleId).toBe(moduleId);

    expect(result?.accessLevel).toBe("paid");

    expect(result?.assetType).toBe("video");

    expect(result?.tableIdentifierToken).toBe("CAST");

    const row = await read__OneCourseAsset({
      identifier: {
        id: result!.id,
      },
    });

    expect(row).not.toBeNull();
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all course assets", async () => {
    const records = await read__AllCourseAssets();

    expect(Array.isArray(records)).toBe(true);
    expect(records.length).toBeGreaterThanOrEqual(2);

    for (const record of records) {
      expect(record.id).toBeTruthy();

      expect(record.assetUrl).toContain("https://");

      expect(record.thumbnailUrl).toContain("https://");

      expect(record.title).toBeTruthy();

      expect(record.moduleId).toBe(moduleId);

      expect(["free", "paid"]).toContain(record.accessLevel);

      expect(["video", "document"]).toContain(record.assetType);

      expect(record.tableIdentifierToken).toBe("CAST");
    }
  });

  test("reads course assets with limit", async () => {
    const records = await read__AllCourseAssets({
      queryOptions: {
        limit: 1,
      },
    });

    expect(records.length).toBe(1);
  });

  test("reads course assets with skip", async () => {
    const all = await read__AllCourseAssets();

    const skipped = await read__AllCourseAssets({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads assets filtered by moduleId", async () => {
    const records = await read__AllCourseAssets({
      identifier: {
        moduleId,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.moduleId).toBe(moduleId);
    }
  });

  test("reads assets filtered by accessLevel", async () => {
    const records = await read__AllCourseAssets({
      identifier: {
        accessLevel: "free",
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.accessLevel).toBe("free");
    }
  });

  test("reads assets filtered by assetType", async () => {
    const records = await read__AllCourseAssets({
      identifier: {
        assetType: "video",
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.assetType).toBe("video");
    }
  });

  test("reads assets filtered by multiple conditions", async () => {
    const records = await read__AllCourseAssets({
      identifier: {
        accessLevel: "free",
        assetType: "video",
        moduleId,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.accessLevel).toBe("free");
      expect(record.assetType).toBe("video");
      expect(record.moduleId).toBe(moduleId);
    }
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one existing course asset", async () => {
    const record = await read__OneCourseAsset({
      identifier: {
        id: asset1Id,
      },
    });

    expect(record).not.toBeNull();

    expect(record?.id).toBe(asset1Id);

    expect(record?.title).toBe("Getting Started");

    expect(record?.accessLevel).toBe("free");

    expect(record?.assetType).toBe("video");

    expect(record?.tableIdentifierToken).toBe("CAST");
  });

  test("returns null for non-existing course asset", async () => {
    const record = await read__OneCourseAsset({
      identifier: {
        id: "INVALID123",
      },
    });

    expect(record).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates course asset", async () => {
    const result = await update__CourseAsset({
      identifier: {
        id: asset2Id,
      },
      dataToUpdate: {
        title: "Updated Asset",
        accessLevel: "free",
      },
    });

    expect(result).not.toBeNull();

    expect(result?.title).toBe("Updated Asset");

    expect(result?.accessLevel).toBe("free");

    const row = await read__OneCourseAsset({
      identifier: {
        id: asset2Id,
      },
    });

    expect(row?.title).toBe("Updated Asset");

    expect(row?.accessLevel).toBe("free");
  });

  test("returns null when update contains only undefined fields", async () => {
    const result = await update__CourseAsset({
      identifier: {
        id: asset1Id,
      },
      dataToUpdate: {
        title: undefined,
        description: undefined,
      },
    });

    expect(result).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes course asset", async () => {
    const created = await create__CourseAsset({
      assetUrl: "https://example.com/delete.mp4",
      thumbnailUrl: "https://example.com/delete.jpg",
      title: "Delete Me",
      description: "Delete asset",
      moduleId,
      accessLevel: "paid",
      assetType: "video",
    });

    const deleted = await delete__CourseAsset({
      identifier: {
        id: created!.id,
      },
    });

    expect(deleted).not.toBeNull();

    const row = await db
      .select()
      .from(CourseAssetTable)
      .where(eq(CourseAssetTable.id, created!.id));

    expect(row).toHaveLength(0);
  });

  test("returns null when deleting non-existing course asset", async () => {
    const result = await delete__CourseAsset({
      identifier: {
        id: "INVALID999",
      },
    });

    expect(result).toBeNull();
  });
});
