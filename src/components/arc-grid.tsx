import { WeekCard } from "@/components/week-card";
import type { ArcSummary } from "@/lib/content";

type ArcGridProps = {
  arcs: ArcSummary[];
};

export function ArcGrid({ arcs }: ArcGridProps) {
  return (
    <div className="space-y-16">
      {arcs.map((arc) => (
        <section key={arc.arc} className="space-y-6">
          <div className="space-y-2">
            <p className="text-xs tracking-[0.24em] text-white/60">{arc.weeks.length} WEEKS</p>
            <h2 className="font-display text-4xl text-white md:text-5xl">{arc.arcTitle}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {arc.weeks.map((lesson) => (
              <WeekCard key={lesson.slug} lesson={lesson} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
