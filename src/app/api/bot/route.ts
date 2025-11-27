import { bot } from "@/lib/bot";

export async function POST(req: Request) {
  const body = await req.json();
  await bot.handleUpdate(body);
  return new Response("ok");
}

export function GET() {
  return new Response("Telegram bot endpoint");
}
