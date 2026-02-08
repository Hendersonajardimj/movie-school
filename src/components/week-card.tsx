import Image from "next/image";
import Link from "next/link";

import type { WeekLesson } from "@/lib/content";

type WeekCardProps = {
  lesson: WeekLesson;
};

export function WeekCard({ lesson }: WeekCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-[0_24px_42px_-32px_rgba(0,0,0,0.75)] transition hover:-translate-y-1 hover:border-white/35">
      <Link href={`/week/${lesson.slug}`}>
        <div className="relative aspect-[2/3] overflow-hidden">
          <Image
            src={lesson.poster}
            alt={`${lesson.filmTitle} poster`}
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
            <h3 className="font-display text-3xl leading-[1.05] text-white">{lesson.filmTitle}</h3>
            <p className="mt-2 text-sm text-white/80">{lesson.year} · {lesson.runtime} min</p>
          </div>
        </div>
      </Link>
      <div className="space-y-4 p-5">
        <p className="text-sm leading-6 text-white/80">{lesson.thesis}</p>
        <Link
          href={`/week/${lesson.slug}`}
          className="inline-flex text-sm font-semibold tracking-[0.12em] text-[#ffd18c] transition hover:text-[#ffe8c4]"
        >
          OPEN LESSON
        </Link>
      </div>
    </article>
  );
}
