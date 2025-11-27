"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTelegramUser } from "@/hooks/useTelegramUser";

interface ContactDrawerProps {
	contactId: number;
	children: React.ReactNode;
}

export function ContactDialog({ contactId, children }: ContactDrawerProps) {
	const [role, setRole] = useState("");
	const [experience, setExperience] = useState("");
	const [portfolio, setPortfolio] = useState("");
	const [loading, setLoading] = useState(false);

	const tgUser = useTelegramUser();

	async function sendResponse() {
		setLoading(true);

		try {
			await fetch("/api/respond", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contactId,
					viewer_tg_id: tgUser?.id ?? null,
					viewer_username: tgUser?.username ?? null,
					viewer_profile: { role, experience, portfolio },
				}),
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Portal>
				{/* Затемнение фона */}
				<Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

				{/* Контент диалога */}
				<Dialog.Content
					className="
						fixed bottom-0 left-0 right-0 z-50 
						bg-background rounded-t-2xl p-4 
						animate-in slide-in-from-bottom duration-200
					"
				>
					{/* Полоска-хэндл */}
					<div className="w-12 h-1.5 bg-muted mx-auto rounded-full mb-4" />

					{/* Заголовки */}
					<div className="flex flex-col gap-0.5 text-center mb-4">
						<Dialog.Title className="text-lg font-semibold">
							Ваша визитка
						</Dialog.Title>
						<Dialog.Description className="text-muted-foreground text-sm">
							Эта информация отправится автору объявления или администратору.
						</Dialog.Description>
					</div>

					{/* Форма */}
					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label>Роль</Label>
							<Input
								value={role}
								onChange={(e) => setRole(e.target.value)}
								placeholder="Например: Game Developer"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<Label>Опыт</Label>
							<Input
								value={experience}
								onChange={(e) => setExperience(e.target.value)}
								placeholder="3 года, Middle..."
							/>
						</div>

						<div className="flex flex-col gap-2">
							<Label>Портфолио</Label>
							<Input
								value={portfolio}
								onChange={(e) => setPortfolio(e.target.value)}
								placeholder="GitHub / ArtStation / CV"
							/>
						</div>
					</div>

					{/* Кнопки */}
					<div className="mt-6 flex flex-col gap-2">
						<Button className="w-full" disabled={loading} onClick={sendResponse}>
							{loading ? "Отправка..." : "Отправить отклик"}
						</Button>

						<Dialog.Close asChild>
							<Button variant="outline" className="w-full">
								Отмена
							</Button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
