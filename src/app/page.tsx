import Link from "next/link";

import { ArcGrid } from "@/components/arc-grid";
import { SubscribeForm } from "@/components/subscribe-form";
import { getArcSummaries, getProgramStats } from "@/lib/content";

export default function Home() {
  const arcs = getArcSummaries();
  const stats = getProgramStats();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-18">
      <section className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div className="space-y-6">
          <p className="text-xs tracking-[0.28em] text-white/60">WORLDVIEW LEVEL UP</p>
          <h1 className="max-w-3xl font-display text-6xl leading-[0.94] text-white md:text-8xl">
            School for life,
            <span className="text-[#ffd18c]"> taught through film.</span>
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-white/80">
            A curated 12-week starter path for self-driven young adults. Every week: two films, one context brief,
            one reflection flow, one action step.
          </p>
          <div className="flex flex-wrap gap-3 text-sm text-white/85">
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2">{stats.totalWeeks} weeks</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2">{stats.totalArcs} thematic arcs</span>
            <span className="rounded-full border border-white/20 bg-white/5 px-4 py-2">{Math.round(stats.totalRuntime / 60)}h total watch time</span>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              href="/curriculum"
              className="rounded-xl bg-[#ffd18c] px-6 py-3 text-sm font-semibold tracking-[0.12em] text-black transition hover:bg-[#ffe8c4]"
            >
              VIEW CURRICULUM
            </Link>
            <Link
              href="/subscribe"
              className="rounded-xl border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold tracking-[0.12em] text-white transition hover:border-white/35"
            >
              GET WEEKLY UPDATES
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur">
          <h2 className="font-display text-4xl text-white">How it works</h2>
          <ol className="mt-4 space-y-3 text-sm leading-6 text-white/80">
            <li>1. Watch two assigned films each week.</li>
            <li>2. Read a concise lens on history, culture, and systems.</li>
            <li>3. Reflect with prompts designed for worldview growth.</li>
            <li>4. Apply one action step in your real life that same week.</li>
          </ol>
        </div>
      </section>

      <section className="mt-16 space-y-7">
        <div className="space-y-2">
          <p className="text-xs tracking-[0.24em] text-white/60">12-WEEK STARTER PATH</p>
          <h2 className="font-display text-5xl text-white md:text-6xl">Curriculum Preview</h2>
        </div>
        <ArcGrid arcs={arcs} />
      </section>

      <section className="mt-18 grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.24em] text-white/60">BUILD IN PUBLIC</p>
          <h2 className="font-display text-5xl leading-[1] text-white md:text-6xl">Get weekly drops as we expand the curriculum.</h2>
          <p className="max-w-xl text-white/80">
            Join the list for new lessons, editor notes, and launch updates as the full Movie School library grows.
          </p>
        </div>
        <SubscribeForm />
      </section>
    </main>
  );
}
