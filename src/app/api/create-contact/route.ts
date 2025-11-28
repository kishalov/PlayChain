import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const body = await req.json();

  const {
    company,
    position,
    sector,
    location,
    description,
    telegram_id,
    username,
  } = body;

  const { error } = await db.from("contacts").insert({
    company,
    position,
    sector,
    location,
    description,
    telegram_id,
    username,
  });

  if (error) {
    console.error("Insert failed:", error);
    return NextResponse.json({ error: "Insert failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
