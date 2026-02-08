import fs from "node:fs/promises";
import path from "node:path";

import { NextResponse } from "next/server";
import { z } from "zod";

const payloadSchema = z.object({
  email: z.string().email(),
});

const subscribersPath = path.join(process.cwd(), "data", "subscribers.json");

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const { email } = payloadSchema.parse(payload);

    const normalized = email.toLowerCase().trim();

    const existingRaw = await fs.readFile(subscribersPath, "utf8").catch(() => "[]");
    const existing = z.array(z.string().email()).parse(JSON.parse(existingRaw));

    if (existing.includes(normalized)) {
      return NextResponse.json({ message: "Already subscribed." }, { status: 200 });
    }

    const updated = [...existing, normalized];
    await fs.writeFile(subscribersPath, `${JSON.stringify(updated, null, 2)}\n`, "utf8");

    return NextResponse.json({ message: "Subscribed. You will receive weekly updates." }, { status: 200 });
  } catch {
    return NextResponse.json({ message: "Please enter a valid email." }, { status: 400 });
  }
}
