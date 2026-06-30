import { afterAll, beforeAll, describe, expect, test } from "vitest";
import { CourseTable, CourseModuleTable, CourseAssetTable } from "@/schema";
import {
  create__Course,
  read__AllCourses,
  read__OneCourse,
  update__Course,
  delete__Course,
} from "@/querries/courses-offered";
import { db } from "@/index";
import { eq, sql } from "drizzle-orm";
import { id } from "@repo/utils/id";

const courseId1 = id();
const courseId2 = id();

const moduleId1 = id();
const moduleId2 = id();

beforeAll(async () => {
  await db.execute(sql`START TRANSACTION`);

  await db.delete(CourseAssetTable);
  await db.delete(CourseModuleTable);
  await db.delete(CourseTable);

  await db.insert(CourseTable).values([
    {
      id: courseId1,
      topic: "React",
      title: "React Masterclass",
      brochureUrl: "https://example.com/react.pdf",
      originalPrice: 10000,
      discountedPrice: 5000,
      thumbnailUrl: "https://example.com/react.jpg",
      isActive: true,
    },
    {
      id: courseId2,
      topic: "Node.js",
      title: "Node.js Masterclass",
      brochureUrl: "https://example.com/node.pdf",
      originalPrice: 12000,
      discountedPrice: 6000,
      thumbnailUrl: "https://example.com/node.jpg",
      isActive: false,
    },
  ]);

  await db.insert(CourseModuleTable).values([
    {
      id: moduleId1,
      title: "Introduction",
      description: "Getting Started",
      displayOrder: 1,
      courseId: courseId1,
    },
    {
      id: moduleId2,
      title: "Advanced Concepts",
      description: "Deep Dive",
      displayOrder: 2,
      courseId: courseId1,
    },
  ]);

  await db.insert(CourseAssetTable).values([
    {
      title: "Intro Video",
      assetUrl: "https://example.com/video-1.mp4",
      thumbnailUrl: "https://example.com/thumb-1.jpg",
      moduleId: moduleId1,
      assetType: "video",
    },
    {
      title: "Notes PDF",
      assetUrl: "https://example.com/doc-1.pdf",
      thumbnailUrl: "https://example.com/thumb-2.jpg",
      moduleId: moduleId1,
      assetType: "document",
    },
  ]);
});

afterAll(async () => {
  await db.delete(CourseAssetTable);
  await db.delete(CourseModuleTable);
  await db.delete(CourseTable);

  await db.execute(sql`ROLLBACK`);
});

describe("Course Queries", () => {
  /**
   * --------------------------------------------------
   * CREATE
   * --------------------------------------------------
   */

  test("creates course", async () => {
    const created = await create__Course({
      topic: "TypeScript",
      title: "TypeScript Masterclass",
      brochureUrl: "https://example.com/ts.pdf",
      originalPrice: 15000,
      discountedPrice: 7500,
      thumbnailUrl: "https://example.com/ts.jpg",
    });

    expect(created).not.toBeNull();

    expect(created?.topic).toBe("TypeScript");
    expect(created?.title).toBe("TypeScript Masterclass");

    expect(created?.originalPrice).toBe(15000);
    expect(created?.discountedPrice).toBe(7500);

    expect(created?.tableIdentifierToken).toBe("COFF");

    expect(Array.isArray(created?.modules)).toBe(true);
  });

  /**
   * --------------------------------------------------
   * READ ALL
   * --------------------------------------------------
   */

  test("reads all courses", async () => {
    const courses = await read__AllCourses();

    expect(Array.isArray(courses)).toBe(true);
    expect(courses.length).toBeGreaterThanOrEqual(2);

    for (const course of courses) {
      expect(course.id).toHaveLength(10);

      expect(course.topic).toBeTruthy();
      expect(course.title).toBeTruthy();

      expect(course.originalPrice).toBeTypeOf("number");

      expect(course.tableIdentifierToken).toBe("COFF");

      expect(Array.isArray(course.modules)).toBe(true);
    }
  });

  test("reads active courses only", async () => {
    const courses = await read__AllCourses({
      identifier: {
        isActive: true,
      },
    });

    expect(courses.length).toBeGreaterThan(0);

    for (const course of courses) {
      expect(course.isActive).toBe(true);
    }
  });

  test("reads inactive courses only", async () => {
    const courses = await read__AllCourses({
      identifier: {
        isActive: false,
      },
    });

    expect(courses.length).toBe(1);

    for (const course of courses) {
      expect(course.isActive).toBe(false);
    }
  });

  test("reads inactive courses only", async () => {
    const courses = await read__AllCourses({
      identifier: {
        isActive: false,
      },
    });

    expect(courses.length).toBeGreaterThan(0);

    for (const course of courses) {
      expect(course.isActive).toBe(false);
    }
  });

  test("reads courses with limit", async () => {
    const courses = await read__AllCourses({
      queryOptions: {
        limit: 1,
      },
    });

    expect(courses).toHaveLength(1);
  });

  test("reads courses with skip", async () => {
    const all = await read__AllCourses();

    const skipped = await read__AllCourses({
      queryOptions: {
        skip: 1,
      },
    });

    expect(skipped.length).toBe(all.length - 1);
  });

  /**
   * --------------------------------------------------
   * READ ONE
   * --------------------------------------------------
   */

  test("reads one course", async () => {
    const course = await read__OneCourse({
      identifier: {
        id: courseId1,
      },
    });

    expect(course).not.toBeNull();

    expect(course?.id).toBe(courseId1);

    expect(course?.topic).toBe("React");
    expect(course?.title).toBe("React Masterclass");

    expect(course?.modules.length).toBe(2);

    expect(course?.modules[0]?.assets.length).toBe(0);

    expect(course?.tableIdentifierToken).toBe("COFF");
  });

  test("returns null for non-existing course", async () => {
    const course = await read__OneCourse({
      identifier: {
        id: "INVALID123",
      },
    });

    expect(course).toBeNull();
  });

  /**
   * --------------------------------------------------
   * UPDATE
   * --------------------------------------------------
   */

  test("updates course", async () => {
    const updated = await update__Course({
      identifier: {
        id: courseId1,
      },
      dataToUpdate: {
        title: "Updated React Masterclass",
        discountedPrice: 4000,
      },
    });

    expect(updated).not.toBeNull();

    expect(updated?.title).toBe("Updated React Masterclass");
    expect(updated?.discountedPrice).toBe(4000);
  });

  test("returns null when update contains only undefined values", async () => {
    const updated = await update__Course({
      identifier: {
        id: courseId1,
      },
      dataToUpdate: {
        title: undefined,
        discountedPrice: undefined,
      },
    });

    expect(updated).toBeNull();
  });

  /**
   * --------------------------------------------------
   * DELETE
   * --------------------------------------------------
   */

  test("deletes course", async () => {
    const created = await create__Course({
      topic: "Delete Me",
      title: "Delete Course",
      brochureUrl: "https://example.com/delete.pdf",
      originalPrice: 5000,
      thumbnailUrl: "https://example.com/delete.jpg",
    });

    const deleted = await delete__Course({
      identifier: {
        id: created!.id,
      },
    });

    expect(deleted).not.toBeNull();

    const rows = await db
      .select()
      .from(CourseTable)
      .where(eq(CourseTable.id, created!.id));

    expect(rows).toHaveLength(0);
  });

  test("returns null when deleting non-existing course", async () => {
    const deleted = await delete__Course({
      identifier: {
        id: "INVALID123",
      },
    });

    expect(deleted).toBeNull();
  });
});
