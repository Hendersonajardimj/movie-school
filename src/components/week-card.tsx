import Image from "next/image";
import Link from "next/link";

import type { WeekLesson } from "@/lib/content";

type WeekCardProps = {
  lesson: WeekLesson;
};

export function WeekCard({ lesson }: WeekCardProps) {
  const firstFilm = lesson.films[0];
  const pairTitle = lesson.films.map((film) => film.title).join(" + ");
  const totalRuntime = lesson.films.reduce((sum, film) => sum + film.runtime, 0);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_24px_42px_-32px_rgba(0,0,0,0.75)] transition hover:-translate-y-1 hover:border-white/35">
      <Link href={`/week/${lesson.slug}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={lesson.poster}
            alt={`${pairTitle} poster`}
            fill
            sizes="(max-width: 768px) 90vw, 33vw"
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            priority={lesson.week <= 3}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <p className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-xs tracking-[0.2em] text-white/90">
            WEEK {lesson.week}
          </p>
          <div className="absolute bottom-0 p-5">
            <h3 className="font-display text-3xl leading-[1.05] text-white">{firstFilm.title}</h3>
            <p className="mt-1 text-sm text-white/80">+ {lesson.films[1].title}</p>
            <p className="mt-2 text-sm text-white/80">{totalRuntime} min total</p>
          </div>
        </div>
      </Link>
      <div className="flex flex-1 flex-col gap-4 p-5">
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
