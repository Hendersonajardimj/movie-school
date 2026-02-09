"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import type { WeekLesson } from "@/lib/content";

type WeekCardProps = {
  lesson: WeekLesson;
};

export function WeekCard({ lesson }: WeekCardProps) {
  const [activeFilmIndex, setActiveFilmIndex] = useState(0);
  const pairTitle = lesson.films.map((film) => film.title).join(" + ");
  const totalRuntime = lesson.films.reduce((sum, film) => sum + film.runtime, 0);
  const activeFilm = lesson.films[activeFilmIndex];

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_24px_42px_-32px_rgba(0,0,0,0.75)] transition hover:-translate-y-1 hover:border-white/35">
      <div className="relative aspect-[4/5] overflow-hidden">
        <Link href={`/week/${lesson.slug}`}>
          <Image
            src={activeFilm.poster || lesson.poster}
            alt={`${pairTitle} poster`}
            fill
            sizes="(max-width: 768px) 90vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            priority={lesson.week <= 3}
          />
        </Link>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <p className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs tracking-[0.2em] text-white/90">
          WEEK {lesson.week}
        </p>
        <div className="absolute bottom-0 p-5">
          <p className="text-xs tracking-[0.24em] text-white/80">DOUBLE FEATURE</p>
          <p className="mt-1 text-sm text-white/90">{activeFilm.title}</p>
          <p className="text-xs text-white/70">{totalRuntime} min total</p>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-5">
        <div className="grid gap-3">
          {lesson.films.map((film, index) => (
            <div
              key={film.title}
              className={`rounded-xl border p-3 transition ${
                index === activeFilmIndex
                  ? "border-[#ffd18c]/60 bg-[#ffd18c]/10"
                  : "border-white/15 bg-black/25 hover:border-white/40"
              }`}
            >
              <button
                type="button"
                onClick={() => setActiveFilmIndex(index)}
                className="w-full text-left"
                aria-expanded={index === activeFilmIndex}
              >
                <p className="text-[10px] tracking-[0.2em] text-[#ffd18c]">FILM {String(index + 1).padStart(2, "0")}</p>
                <h3 className="mt-1 font-display text-2xl leading-[1.05] text-white">{film.title}</h3>
                <p className="mt-1 text-xs text-white/75">
                  {film.year} · {film.runtime} min
                </p>
                <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-white/60">
                  {index === activeFilmIndex ? "Now Showing" : "Click to Expand"}
                </p>
              </button>
            </div>
          ))}
        </div>
        <p className="text-sm leading-6 text-white/80">{lesson.thesis}</p>
        <Link
          href={`/week/${lesson.slug}`}
          className="mt-auto inline-flex text-sm font-semibold tracking-[0.12em] text-[#ffd18c] transition hover:text-[#ffe8c4]"
        >
          OPEN LESSON
        </Link>
      </div>
    </article>
  );
}
