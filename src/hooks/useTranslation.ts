"use client";

import { create } from "zustand";
import en from "@/locales/en.json";
import ru from "@/locales/ru.json";

const dictionaries: Record<string, Record<string, string>> = { en, ru };

type Locale = "en" | "ru";

type TranslationState = {
	locale: Locale;
	setLocale: (locale: Locale) => void;
	t: (key: string) => string;
};

export const useTranslationStore = create<TranslationState>((set, get) => ({
	locale: "en",

	setLocale: (newLocale: Locale) => {
		localStorage.setItem("locale", newLocale);
		set({ locale: newLocale });
	},

	t: (key: string) => {
		const locale = get().locale;
		const dict = dictionaries[locale] || {};
		return dict[key] || key;
	},
}));

// Удобный хук-обёртка, чтобы не таскать весь стор
export function useTranslation() {
	const locale = useTranslationStore((s) => s.locale);
	const setLocale = useTranslationStore((s) => s.setLocale);
	const t = useTranslationStore((s) => s.t);

	// Грузим сохранённый язык один раз
	// Можно вынести в отдельный эффект где-нибудь повыше, но сойдёт и так
	if (typeof window !== "undefined") {
		const saved = localStorage.getItem("locale");
		if (saved === "en" || saved === "ru") {
			if (saved !== locale) {
				setLocale(saved);
			}
		}
	}

	return { locale, setLocale, t };
}
