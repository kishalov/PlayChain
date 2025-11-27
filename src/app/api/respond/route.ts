import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { bot } from "@/lib/bot";

const ADMIN_ID = process.env.ADMIN_TELEGRAM_ID!;

export async function POST(req: Request) {
	try {
		console.log("▶ /api/respond CALLED");

		const body = await req.json();
		console.log("BODY:", body);

		const {
			contactId,
			viewer_tg_id,
			viewer_username,
			viewer_profile,
		} = body;

		if (!contactId || !viewer_profile) {
			return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
		}

		// Загружаем контакт
		const { data: contact, error: contactError } = await db
			.from("contacts")
			.select("*")
			.eq("id", contactId)
			.single();

		if (contactError || !contact) {
			return NextResponse.json({ error: "Contact not found" }, { status: 404 });
		}

		// Создаём отклик
		const { data: response, error: responseError } = await db
			.from("responses")
			.insert({
				contact_id: contactId,
				viewer_tg_id,
				viewer_username,
				viewer_profile,
				status: "pending",
			})
			.select()
			.single();

		if (responseError || !response) {
			console.error("Insert error:", responseError);
			return NextResponse.json({ error: "Failed to save response" }, { status: 500 });
		}

		// Если у контакта есть telegram_id — отправляем сообщение ему
		if (contact.telegram_id) {
			await bot.telegram.sendMessage(
				contact.telegram_id,
				`
🔥 Новый отклик по вакансии!

📌 *${contact.position}*
🏢 ${contact.company}

От: @${viewer_username ?? "не указано"}
Роль: ${viewer_profile.role ?? "-"}
Опыт: ${viewer_profile.experience ?? "-"}
Портфолио: ${viewer_profile.portfolio ?? "-"}
				`,
				{
					parse_mode: "Markdown",
					reply_markup: {
						inline_keyboard: [
							[
								{ text: "Ответить", callback_data: `accept_${response.id}` },
								{ text: "Отклонить", callback_data: `reject_${response.id}` },
							],
						],
					},
				}
			);

			await db
				.from("responses")
				.update({ status: "delivered" })
				.eq("id", response.id);

			return NextResponse.json({ ok: true });
		}

		// Иначе — отправляем админу
		await bot.telegram.sendMessage(
			ADMIN_ID,
			`
🔔 Отклик на НЕактивированного автора

📌 ${contact.position}
🏢 ${contact.company}
Автор: @${contact.username ?? "не указан"}

👤 Кандидат:
@${viewer_username ?? "не указан"}
Роль: ${viewer_profile.role ?? "-"}
Опыт: ${viewer_profile.experience ?? "-"}
Портфолио: ${viewer_profile.portfolio ?? "-"}

Response ID: ${response.id}
			`
		);

		await db
			.from("responses")
			.update({ status: "moderated" })
			.eq("id", response.id);

		return NextResponse.json({ ok: true });

	} catch (error) {
		console.error("API ERROR:", error);
		return NextResponse.json({ error: "Server error" }, { status: 500 });
	}
}
