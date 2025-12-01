"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from "@/components/ui/select";

import { useTelegramUser } from "@/hooks/useTelegramUser";
import { useTranslation } from "@/hooks/useTranslation";
import { toast } from "sonner";

export function CreateContactForm({
	onSuccess,
}: {
	onSuccess?: () => void;
}) {
	const { t } = useTranslation();
	const tg = useTelegramUser();

	const [company, setCompany] = useState("");
	const [position, setPosition] = useState("");
	const [sector, setSector] = useState("");
	const [location, setLocation] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);

	async function submit() {
		if (!company || !position || !sector) {
			toast.error(t("create_contact_required_error"));
			return;
		}

		setLoading(true);

		const res = await fetch("/api/create-contact", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				company,
				position,
				sector,
				location,
				description,
				telegram_id: tg?.id ?? null,
				username: tg?.username ? `@${tg.username}` : null,
			}),
		});

		setLoading(false);

		if (res.ok) {
			toast.success(t("create_contact_success"));
			onSuccess?.();
		} else {
			toast.error(t("create_contact_error"));
		}
	}

	return (
		<div className="flex flex-col gap-4">
			{/* Company */}
			<div className="flex flex-col gap-1">
				<Label>{t("create_contact_company")}</Label>
				<Input
					value={company}
					onChange={(e) => setCompany(e.target.value)}
					placeholder={t("create_contact_company_placeholder")}
				/>
			</div>

			{/* Position */}
			<div className="flex flex-col gap-1">
				<Label>{t("create_contact_position")}</Label>
				<Input
					value={position}
					onChange={(e) => setPosition(e.target.value)}
					placeholder={t("create_contact_position_placeholder")}
				/>
			</div>

			{/* Sector */}
			<div className="flex flex-col gap-1">
				<Label>{t("create_contact_sector")}</Label>

				<Select onValueChange={setSector}>
					<SelectTrigger>
						<SelectValue placeholder={t("create_contact_sector_placeholder")} />
					</SelectTrigger>

					<SelectContent>
						<SelectItem value="Game Provider">
							{t("sector_game_provider")}
						</SelectItem>

						<SelectItem value="Affiliate Network">
							{t("sector_affiliate_network")}
						</SelectItem>

						<SelectItem value="Operator">
							{t("sector_operator")}
						</SelectItem>

						<SelectItem value="Payment / PSP">
							{t("sector_payment")}
						</SelectItem>

						<SelectItem value="Marketing">
							{t("sector_marketing")}
						</SelectItem>
					</SelectContent>
				</Select>
			</div>

			{/* Location */}
			<div className="flex flex-col gap-1">
				<Label>{t("create_contact_location")}</Label>
				<Input
					value={location}
					onChange={(e) => setLocation(e.target.value)}
					placeholder={t("create_contact_location_placeholder")}
				/>
			</div>

			{/* Description */}
			<div className="flex flex-col gap-1">
				<Label>{t("create_contact_description")}</Label>
				<Textarea
					value={description}
					onChange={(e) => setDescription(e.target.value)}
					placeholder={t("create_contact_description_placeholder")}
				/>
			</div>

			<Button onClick={submit} disabled={loading}>
				{loading ? t("create_contact_submitting") : t("create_contact_submit")}
			</Button>
		</div>
	);
}
