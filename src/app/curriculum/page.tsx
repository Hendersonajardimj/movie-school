import { ArcGrid } from "@/components/arc-grid";
import { getArcSummaries } from "@/lib/content";

export default function CurriculumPage() {
  const arcs = getArcSummaries();

  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8">
      <header className="mb-10 space-y-4">
        <p className="text-xs tracking-[0.24em] text-white/60">THE FULL STARTER PATH</p>
        <h1 className="font-display text-6xl text-white md:text-7xl">12 Weeks. 3 Arcs. 1 world expanded.</h1>
        <p className="max-w-3xl text-white/80">
          This curriculum is intentionally opinionated: it prioritizes context awareness, emotional resilience,
          cultural literacy, and practical adulthood through narrative and discussion.
        </p>
      </header>
      <ArcGrid arcs={arcs} />
    </main>
  );
}
