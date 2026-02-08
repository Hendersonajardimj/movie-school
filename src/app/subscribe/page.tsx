import { SubscribeForm } from "@/components/subscribe-form";

export default function SubscribePage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-14 md:px-8">
      <section className="space-y-6 rounded-2xl border border-white/15 bg-white/[0.03] p-8">
        <p className="text-xs tracking-[0.24em] text-white/60">MOVIE SCHOOL DISPATCH</p>
        <h1 className="font-display text-6xl leading-[0.95] text-white">Subscribe for weekly curriculum updates.</h1>
        <p className="max-w-2xl text-white/80">
          Get one email per week with the current film, context lens, and reflection prompts as we ship the V1 roadmap in public.
        </p>
        <SubscribeForm />
      </section>
    </main>
  );
}
