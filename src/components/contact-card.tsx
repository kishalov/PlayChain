"use client";

import { useState } from "react";
import { ContactDialog } from "./contact-dialog";
import { DescriptionSheet } from "./description-sheet";

import {
	Card,
	CardHeader,
	CardTitle,
	CardContent,
	CardFooter,
	CardAction,
	CardDescription,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

interface ContactCardProps {
	title: string;
	company: string;
	location: string;
	position: string;
	date: string;
	description: string;
}

export function ContactCard(props: ContactCardProps) {
	const { title, company, location, position, date, description } = props;
	const [fav, setFav] = useState(false);

	const { t } = useTranslation();

	return (
		<Card className="relative w-full max-w-full">
			
			{/* LIKE BUTTON */}
			<button
				onClick={() => setFav(!fav)}
				className="absolute right-4 top-4 text-muted-foreground"
			>
				<Heart size={20} className={fav ? "fill-black" : ""} />
			</button>

			<CardHeader>
				<CardTitle>{title}</CardTitle>

				<CardDescription>
					{company}
					<br />
					{location}
				</CardDescription>
			</CardHeader>

			<CardContent>
				<div className="flex flex-wrap gap-2 w-full">
					<div className="bg-secondary text-xs px-3 py-1 rounded-md max-w-[80%]">
						{position}
					</div>
				</div>

				<div className="text-muted-foreground text-sm mt-3">
					{t("contact_posted")} {date}
				</div>
			</CardContent>

			<CardFooter className="flex gap-2">
				<CardAction className="w-full">
					<ContactDialog contactId={42}>
						<Button className="w-full">{t("contact_get_contact")}</Button>
					</ContactDialog>
				</CardAction>

				<CardAction className="w-full">
					<DescriptionSheet description={description} />
				</CardAction>
			</CardFooter>
		</Card>
	);
}
