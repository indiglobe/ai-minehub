import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { db } from "@/index";
import { CourseTable, CourseModuleTable } from "@/schema";
import {
  create__CourseModule,
  read__AllCourseModules,
  read__OneCourseModule,
  update__CourseModule,
  delete__CourseModule,
} from "@/querries/course-module";
import { eq, sql } from "drizzle-orm";

let courseId: string;

let module1Id: string;
let module2Id: string;

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(CourseModuleTable);
  await db.delete(CourseTable);

  await db.insert(CourseTable).values({
    id: "COURSE001",
    topic: "Web Development",
    title: "Complete React Course",
    brochureUrl: "https://example.com/react-brochure.pdf",
    originalPrice: 10000,
    discountedPrice: 5000,
    thumbnailUrl: "https://example.com/react-thumbnail.jpg",
  });

  courseId = "COURSE001";

  await db.insert(CourseModuleTable).values({
    id: "MOD0000001",
    title: "Introduction",
    description: "Introduction to the course",
    displayOrder: 1,
    courseId,
  });

  module1Id = "MOD0000001";

  await db.insert(CourseModuleTable).values({
    id: "MOD0000002",
    title: "Advanced Concepts",
    description: "Deep dive into advanced topics",
    displayOrder: 2,
    courseId,
  });

  module2Id = "MOD0000002";
});

afterAll(async () => {
  await db.delete(CourseModuleTable);
  await db.delete(CourseTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Course Module Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates course module", async () => {
    const result = await create__CourseModule({
      title: "Testing Module",
      description: "Module created during test",
      displayOrder: 3,
      courseId,
    });

    expect(result).not.toBeNull();

    expect(result?.id).toBeTruthy();

    expect(result?.title).toBe("Testing Module");
    expect(result?.description).toBe("Module created during test");

    expect(result?.displayOrder).toBe(3);

    expect(result?.courseId).toBe(courseId);

    expect(result?.tableIdentifierToken).toBe("CMOD");

    const row = await read__OneCourseModule({
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

  test("reads all course modules", async () => {
    const records = await read__AllCourseModules();

    expect(Array.isArray(records)).toBe(true);

    expect(records.length).toBeGreaterThanOrEqual(2);

    for (const record of records) {
      expect(typeof record.id).toBe("string");

      expect(record.title).toBeTruthy();
      expect(record.description).toBeTruthy();

      expect(typeof record.displayOrder).toBe("number");

      expect(record.courseId).toBe(courseId);

      expect(record.tableIdentifierToken).toBe("CMOD");
    }
  });

  test("reads course modules with limit", async () => {
    const records = await read__AllCourseModules({
      queryOptions: {
        limit: 1,
      },
    });

    expect(records).toHaveLength(1);
  });

  test("reads course modules with skip", async () => {
    const all = await read__AllCourseModules();

    const skipped = await read__AllCourseModules({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads course modules filtered by courseId", async () => {
    const records = await read__AllCourseModules({
      identifier: {
        courseId,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.courseId).toBe(courseId);
    }
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one existing course module", async () => {
    const record = await read__OneCourseModule({
      identifier: {
        id: module1Id,
      },
    });

    expect(record).not.toBeNull();

    expect(record?.id).toBe(module1Id);

    expect(record?.title).toBe("Introduction");

    expect(record?.description).toBe("Introduction to the course");

    expect(record?.displayOrder).toBe(1);

    expect(record?.courseId).toBe(courseId);

    expect(record?.tableIdentifierToken).toBe("CMOD");
  });

  test("returns null for non-existing course module", async () => {
    const record = await read__OneCourseModule({
      identifier: {
        id: "INVALIDID",
      },
    });

    expect(record).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates course module", async () => {
    const result = await update__CourseModule({
      identifier: {
        id: module2Id,
      },
      dataToUpdate: {
        title: "Updated Module",
        displayOrder: 10,
      },
    });

    expect(result).not.toBeNull();

    expect(result?.title).toBe("Updated Module");
    expect(result?.displayOrder).toBe(10);

    const row = await read__OneCourseModule({
      identifier: {
        id: module2Id,
      },
    });

    expect(row?.title).toBe("Updated Module");
    expect(row?.displayOrder).toBe(10);
  });

  test("returns null when update contains only undefined fields", async () => {
    const result = await update__CourseModule({
      identifier: {
        id: module1Id,
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

  test("deletes course module", async () => {
    const created = await create__CourseModule({
      title: "Delete Module",
      description: "Delete this module",
      displayOrder: 999,
      courseId,
    });

    const deleted = await delete__CourseModule({
      identifier: {
        id: created!.id,
      },
    });

    expect(deleted).not.toBeNull();

    const row = await db
      .select()
      .from(CourseModuleTable)
      .where(eq(CourseModuleTable.id, created!.id));

    expect(row).toHaveLength(0);
  });

  test("returns null when deleting non-existing course module", async () => {
    const result = await delete__CourseModule({
      identifier: {
        id: "INVALIDID",
      },
    });

    expect(result).toBeNull();
  });
});
