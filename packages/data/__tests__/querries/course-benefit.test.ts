import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { CourseBenefitTable, CourseTable } from "@/schema";
import {
  create__CourseBenefit,
  read__AllCourseBenefits,
  read__OneCourseBenefit,
  update__CourseBenefit,
  delete__CourseBenefit,
} from "@/querries/course-benefit";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";

let courseId: string;

let benefit1Id: number;
let benefit2Id: number;

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(CourseBenefitTable);
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

  const [{ insertId: id1 }] = await db.insert(CourseBenefitTable).values({
    description: "Lifetime access to course materials",
    isVisible: true,
    courseId,
  });

  benefit1Id = id1;

  const [{ insertId: id2 }] = await db.insert(CourseBenefitTable).values({
    description: "Certificate of completion",
    isVisible: false,
    courseId,
  });

  benefit2Id = id2;
});

afterAll(async () => {
  await db.delete(CourseBenefitTable);
  await db.delete(CourseTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Course Benefit Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates course benefit", async () => {
    const result = await create__CourseBenefit({
      description: "Access to private community",
      courseId,
    });

    expect(result).not.toBeNull();

    expect(result?.id).toBeTypeOf("number");

    expect(result?.description).toBe("Access to private community");

    expect(result?.isVisible).toBe(true);

    expect(result?.courseId).toBe(courseId);

    expect(result?.tableIdentifierToken).toBe("CADV");

    const row = await read__OneCourseBenefit({
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

  test("reads all course benefits", async () => {
    const records = await read__AllCourseBenefits();

    expect(Array.isArray(records)).toBe(true);
    expect(records.length).toBeGreaterThanOrEqual(2);

    for (const record of records) {
      expect(record.id).toBeTypeOf("number");

      expect(record.description).toBeTruthy();

      expect(typeof record.isVisible).toBe("boolean");

      expect(record.courseId).toBe(courseId);

      expect(record.tableIdentifierToken).toBe("CADV");
    }
  });

  test("reads course benefits with limit", async () => {
    const records = await read__AllCourseBenefits({
      queryOptions: {
        limit: 1,
      },
    });

    expect(records).toHaveLength(1);
  });

  test("reads course benefits with skip", async () => {
    const all = await read__AllCourseBenefits();

    const skipped = await read__AllCourseBenefits({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  test("reads course benefits filtered by courseId", async () => {
    const records = await read__AllCourseBenefits({
      identifier: {
        courseId,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.courseId).toBe(courseId);
    }
  });

  test("reads course benefits filtered by isVisible=true", async () => {
    const records = await read__AllCourseBenefits({
      identifier: {
        isVisible: true,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.isVisible).toBe(true);
    }
  });

  test("reads course benefits filtered by isVisible=false", async () => {
    const records = await read__AllCourseBenefits({
      identifier: {
        isVisible: false,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.isVisible).toBe(false);
    }
  });

  test("reads course benefits filtered by courseId and isVisible", async () => {
    const records = await read__AllCourseBenefits({
      identifier: {
        courseId,
        isVisible: true,
      },
    });

    expect(records.length).toBeGreaterThan(0);

    for (const record of records) {
      expect(record.courseId).toBe(courseId);
      expect(record.isVisible).toBe(true);
    }
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one existing course benefit", async () => {
    const record = await read__OneCourseBenefit({
      identifier: {
        id: benefit1Id,
      },
    });

    expect(record).not.toBeNull();

    expect(record?.id).toBe(benefit1Id);

    expect(record?.description).toBe("Lifetime access to course materials");

    expect(record?.isVisible).toBe(true);

    expect(record?.courseId).toBe(courseId);

    expect(record?.tableIdentifierToken).toBe("CADV");
  });

  test("returns null for non-existing course benefit", async () => {
    const record = await read__OneCourseBenefit({
      identifier: {
        id: -1,
      },
    });

    expect(record).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates course benefit", async () => {
    const result = await update__CourseBenefit({
      identifier: {
        id: benefit2Id,
      },
      dataToUpdate: {
        description: "Updated benefit description",
        isVisible: true,
      },
    });

    expect(result).not.toBeNull();

    expect(result?.description).toBe("Updated benefit description");

    expect(result?.isVisible).toBe(true);

    const row = await read__OneCourseBenefit({
      identifier: {
        id: benefit2Id,
      },
    });

    expect(row?.description).toBe("Updated benefit description");

    expect(row?.isVisible).toBe(true);
  });

  test("returns null when update contains only undefined fields", async () => {
    const result = await update__CourseBenefit({
      identifier: {
        id: benefit1Id,
      },
      dataToUpdate: {
        description: undefined,
        isVisible: undefined,
      },
    });

    expect(result).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes course benefit", async () => {
    const created = await create__CourseBenefit({
      description: "Delete me",
      courseId,
    });

    const deleted = await delete__CourseBenefit({
      identifier: {
        id: created!.id,
      },
    });

    expect(deleted).not.toBeNull();

    const row = await db
      .select()
      .from(CourseBenefitTable)
      .where(eq(CourseBenefitTable.id, created!.id));

    expect(row).toHaveLength(0);
  });

  test("returns null when deleting non-existing course benefit", async () => {
    const result = await delete__CourseBenefit({
      identifier: {
        id: -99999,
      },
    });

    expect(result).toBeNull();
  });
});
