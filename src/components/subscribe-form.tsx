"use client";

import { FormEvent, useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

export function SubscribeForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = (await response.json()) as { message: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(data.message || "Could not subscribe right now.");
        return;
      }

      setStatus("success");
      setMessage(data.message || "You are on the list.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Network error. Try again.");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <label htmlFor="email" className="block text-sm text-white/85">
        Email address
      </label>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-xl border border-white/20 bg-black/40 px-4 py-3 text-white outline-none transition placeholder:text-white/40 focus:border-[#ffd18c]"
          placeholder="you@example.com"
        />
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-xl bg-[#ffd18c] px-5 py-3 text-sm font-semibold tracking-[0.1em] text-black transition hover:bg-[#ffe8c4] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {status === "submitting" ? "SENDING..." : "SUBSCRIBE"}
        </button>
      </div>
      {message && (
        <p className={status === "success" ? "text-sm text-emerald-300" : "text-sm text-red-300"}>
          {message}
        </p>
      )}
    </form>
  );
}
