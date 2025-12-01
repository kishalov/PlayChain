"use client";

import { useTranslation } from "@/hooks/useTranslation";

export function LangSwitch() {
	const { locale, setLocale } = useTranslation();

	function toggle() {
		setLocale(locale === "ru" ? "en" : "ru");
	}

	return (
		<button
			onClick={toggle}
			className="px-3 py-1 bg-secondary rounded-full text-sm"
		>
			{locale.toUpperCase()}
		</button>
	);
}
