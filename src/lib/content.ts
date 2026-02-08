import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";
import { z } from "zod";

const CONTENT_DIR = path.join(process.cwd(), "content", "weeks");

const weekSchema = z.object({
  slug: z.string().min(1),
  week: z.number().int().min(1).max(52),
  arc: z.string().min(1),
  arcTitle: z.string().min(1),
  filmTitle: z.string().min(1),
  year: z.number().int().min(1900).max(2100),
  runtime: z.number().int().min(1),
  poster: z.string().min(1),
  thesis: z.string().min(1),
  outcomes: z.array(z.string().min(1)).min(1),
  prompts: z.array(z.string().min(1)).min(3),
  actionStep: z.string().min(1),
  furtherViewing: z.array(z.string().min(1)).min(1),
});

export type WeekLesson = z.infer<typeof weekSchema> & { body: string };

export type ArcSummary = {
  arc: string;
  arcTitle: string;
  weeks: WeekLesson[];
};

function parseWeekFile(filePath: string): WeekLesson {
  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);

  const validated = weekSchema.parse(parsed.data);

  return {
    ...validated,
    body: parsed.content.trim(),
  };
}

export function getAllLessons(): WeekLesson[] {
  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => path.join(CONTENT_DIR, file));

  const lessons = files.map(parseWeekFile);
  return lessons.sort((a, b) => a.week - b.week);
}

export function getLessonBySlug(slug: string): WeekLesson | null {
  const lessons = getAllLessons();
  return lessons.find((lesson) => lesson.slug === slug) ?? null;
}

export function getArcSummaries(): ArcSummary[] {
  const lessons = getAllLessons();
  const grouped = new Map<string, ArcSummary>();

  for (const lesson of lessons) {
    const existing = grouped.get(lesson.arc);
    if (existing) {
      existing.weeks.push(lesson);
      continue;
    }

    grouped.set(lesson.arc, {
      arc: lesson.arc,
      arcTitle: lesson.arcTitle,
      weeks: [lesson],
    });
  }

  return Array.from(grouped.values()).map((arc) => ({
    ...arc,
    weeks: arc.weeks.sort((a, b) => a.week - b.week),
  }));
}

export function getProgramStats() {
  const lessons = getAllLessons();
  const totalRuntime = lessons.reduce((sum, lesson) => sum + lesson.runtime, 0);

  return {
    totalWeeks: lessons.length,
    totalArcs: new Set(lessons.map((lesson) => lesson.arc)).size,
    totalRuntime,
  };
}
