import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bot } from "@/lib/bot";

const ADMIN_ID = process.env.ADMIN_TELEGRAM_ID!;

export async function POST(req: Request) {
  const {
    contactId,
    viewer_tg_id,
    viewer_username,
    viewer_profile
  } = await req.json();

  // 1. Загружаем контакт
  const { data: contact } = await db
    .from("contacts")
    .select("*")
    .eq("id", contactId)
    .single();

  if (!contact) {
    return NextResponse.json({ error: "Contact not found" }, { status: 404 });
  }

  // 2. Создаём отклик
  const { data: response, error: createError } = await db
    .from("responses")
    .insert({
      contact_id: contactId,
      viewer_tg_id,
      viewer_username,
      viewer_profile,
      status: "pending"
    })
    .select()
    .single();

  if (createError) {
    console.error(createError);
    return NextResponse.json({ error: "Failed to create response" });
  }

  // 3. Автор активирован?
  if (contact.telegram_id) {
    await bot.telegram.sendMessage(
      contact.telegram_id,
      `
🔥 Новый отклик!

По объявлению: ${contact.position}
Компания: ${contact.company}

От: @${viewer_username}
Роль: ${viewer_profile.role}
Опыт: ${viewer_profile.experience}
      `,
      {
        reply_markup: {
          inline_keyboard: [
            [
              { text: "Ответить", callback_data: `accept_${response.id}` },
              { text: "Отклонить", callback_data: `reject_${response.id}` }
            ]
          ]
        }
      }
    );

    await db
      .from("responses")
      .update({ status: "delivered" })
      .eq("id", response.id);

    return NextResponse.json({ ok: true });
  }

  // 4. Автор НЕ активирован → уведомляем АДМИНА
  await bot.telegram.sendMessage(
    ADMIN_ID,
    `
🔔 Отклик для неактивированного автора

Position: ${contact.position}
Company: ${contact.company}
Автор: @${contact.username} (не активирован)

Кандидат:
@${viewer_username}
${viewer_profile.role}, ${viewer_profile.experience}

Response ID: ${response.id}
    `
  );

  await db
    .from("responses")
    .update({ status: "moderated" })
    .eq("id", response.id);

  return NextResponse.json({ ok: true });
}
