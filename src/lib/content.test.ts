import { describe, expect, it } from "vitest";

import { getAllLessons, getArcSummaries, getLessonBySlug, getProgramStats } from "./content";

describe("content pipeline", () => {
  it("loads all 12 lessons in order", () => {
    const lessons = getAllLessons();
    expect(lessons).toHaveLength(12);
    expect(lessons[0]?.week).toBe(1);
    expect(lessons[11]?.week).toBe(12);
  });

  it("groups lessons into three arcs", () => {
    const arcs = getArcSummaries();
    expect(arcs).toHaveLength(3);
    expect(arcs.every((arc) => arc.weeks.length === 4)).toBe(true);
  });

  it("resolves lesson by slug", () => {
    const lesson = getLessonBySlug("week-12-idiocracy");
    expect(lesson?.films[0]?.title).toBe("Idiocracy");
    expect(lesson?.films).toHaveLength(2);
  });

  it("returns consistent program stats", () => {
    const stats = getProgramStats();
    expect(stats.totalWeeks).toBe(12);
    expect(stats.totalArcs).toBe(3);
    expect(stats.totalRuntime).toBeGreaterThan(2000);
  });
});
