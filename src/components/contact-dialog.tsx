"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";

interface ContactDrawerProps {
	contactId: number;
	children: React.ReactNode;
}

export function ContactDialog({ contactId, children }: ContactDrawerProps) {
	const { t } = useTranslation();

	const [role, setRole] = useState("");
	const [experience, setExperience] = useState("");
	const [portfolio, setPortfolio] = useState("");
	const [loading, setLoading] = useState(false);

	const tgUser = useTelegramUser();

	async function sendResponse() {
		setLoading(true);

		try {
			const res = await fetch("/api/respond", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contactId,
					viewer_tg_id: tgUser?.id ?? null,
					viewer_username: tgUser?.username ?? null,
					viewer_profile: { role, experience, portfolio },
				}),
			});

			if (res.ok) {
				toast.success(t("visitcard_success"));

				// закрываем через скрытый Dialog.Close
				setTimeout(() => {
					const btn = document.querySelector(
						"[data-dialog-close]"
					) as HTMLButtonElement | null;

					btn?.click();
				}, 300);
			}
		} finally {
			setLoading(false);
		}
	}

	return (
		<Dialog.Root>
			<Dialog.Trigger asChild>{children}</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />

				<Dialog.Content
					className="
						fixed bottom-0 left-0 right-0 z-50 
						bg-background rounded-t-2xl p-4 
						animate-in slide-in-from-bottom duration-200
					"
				>

					<div className="flex flex-col gap-0.5 text-center mb-4">
						<Dialog.Title className="text-lg font-semibold">
							{t("visitcard_title")}
						</Dialog.Title>

						<Dialog.Description className="text-muted-foreground text-sm">
							{t("visitcard_subtitle")}
						</Dialog.Description>
					</div>

					<div className="flex flex-col gap-4">
						<div className="flex flex-col gap-2">
							<Label>{t("visitcard_role")}</Label>
							<Input
								value={role}
								onChange={(e) => setRole(e.target.value)}
								placeholder={t("visitcard_role_placeholder")}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<Label>{t("visitcard_experience")}</Label>
							<Input
								value={experience}
								onChange={(e) => setExperience(e.target.value)}
								placeholder={t("visitcard_experience_placeholder")}
							/>
						</div>

						<div className="flex flex-col gap-2">
							<Label>{t("visitcard_portfolio")}</Label>
							<Input
								value={portfolio}
								onChange={(e) => setPortfolio(e.target.value)}
								placeholder={t("visitcard_portfolio_placeholder")}
							/>
						</div>
					</div>

					<div className="mt-6 flex flex-col gap-2">
						<Button className="w-full" disabled={loading} onClick={sendResponse}>
							{loading ? t("create_contact_submitting") : t("visitcard_submit")}
						</Button>

						<Dialog.Close asChild>
							<Button
								variant="outline"
								className="w-full"
								data-dialog-close
							>
								{t("visitcard_cancel")}
							</Button>
						</Dialog.Close>
					</div>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
