"use client";

import { useEffect, useState } from "react";
import type { TgUser } from "@/types/telegram";

export function useTelegramUser() {
	const [user, setUser] = useState<TgUser | null>(null);

	useEffect(() => {
		// @ts-ignore
		const tg = window.Telegram?.WebApp;
		if (!tg) return;

		tg.ready();

		const data = tg.initDataUnsafe?.user;
		if (data) {
			setUser(data as TgUser);
		}
	}, []);

	return user;
}
