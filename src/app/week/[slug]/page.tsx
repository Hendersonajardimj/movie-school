import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { getAllLessons, getLessonBySlug } from "@/lib/content";

export function generateStaticParams() {
  return getAllLessons().map((lesson) => ({ slug: lesson.slug }));
}

type LessonPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function LessonPage({ params }: LessonPageProps) {
  const { slug } = await params;
  const lesson = getLessonBySlug(slug);

  if (!lesson) {
    notFound();
  }

  const pairTitle = lesson.films.map((film) => film.title).join(" + ");
  const pairRuntime = lesson.films.reduce((sum, film) => sum + film.runtime, 0);

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8">
      <section className="grid gap-8 lg:grid-cols-[320px_1fr]">
        <div className="relative aspect-[2/3] overflow-hidden rounded-2xl border border-white/15">
          <Image src={lesson.poster} alt={`${pairTitle} poster`} fill className="object-cover" priority />
        </div>

        <div className="space-y-7">
          <header className="space-y-3">
            <p className="text-xs tracking-[0.24em] text-white/60">WEEK {lesson.week} · {lesson.arcTitle}</p>
            <h1 className="font-display text-5xl leading-[0.95] text-white md:text-7xl">{pairTitle}</h1>
            <p className="text-white/80">{pairRuntime} min total</p>
            <ul className="space-y-1 text-sm text-white/80">
              {lesson.films.map((film) => (
                <li key={film.title}>
                  • {film.title} ({film.year}) · {film.runtime} min
                </li>
              ))}
            </ul>
            <p className="rounded-xl border border-[#ffd18c]/35 bg-[#ffd18c]/7 p-4 text-white/90">{lesson.thesis}</p>
          </header>

          <section className="grid gap-4 md:grid-cols-3">
            {lesson.outcomes.map((outcome) => (
              <div key={outcome} className="rounded-xl border border-white/15 bg-white/[0.03] p-4 text-sm text-white/80">
                {outcome.replaceAll("-", " ")}
              </div>
            ))}
          </section>
        </div>
      </section>

      <section className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="rounded-2xl border border-white/15 bg-white/[0.03] p-6">
          <h2 className="mb-3 font-display text-4xl text-white">Context Brief</h2>
          <div className="prose-cinema">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{lesson.body}</ReactMarkdown>
          </div>
        </article>

        <aside className="space-y-6">
          <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6">
            <h3 className="font-display text-3xl text-white">Reflection Prompts</h3>
            <ul className="mt-3 space-y-3 text-sm leading-6 text-white/80">
              {lesson.prompts.map((prompt) => (
                <li key={prompt}>• {prompt}</li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6">
            <h3 className="font-display text-3xl text-white">Action Step</h3>
            <p className="mt-3 text-sm leading-6 text-white/80">{lesson.actionStep}</p>
          </div>

          <div className="rounded-2xl border border-white/15 bg-white/[0.03] p-6">
            <h3 className="font-display text-3xl text-white">Further Viewing</h3>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-white/80">
              {lesson.furtherViewing.map((film) => (
                <li key={film}>• {film}</li>
              ))}
            </ul>
          </div>
        </aside>
      </section>
    </main>
  );
}
