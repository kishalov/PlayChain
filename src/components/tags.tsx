"use client";

import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "@/hooks/useTranslation";

export function TopTagsCarousel({
	tags,
	onSelect,
}: {
	tags: string[];
	onSelect: (tag: string | null) => void;
}) {
	const { t } = useTranslation();

	// используем стабильный ключ, не зависящий от языка
	const ALL_KEY = "all";

	const [active, setActive] = useState<string>(ALL_KEY);

	function select(tag: string) {
		setActive(tag);
		onSelect(tag === ALL_KEY ? null : tag);
	}

	return (
		<ScrollArea className="w-full whitespace-nowrap">
			<div className="flex w-max space-x-2 p-4">

				{/* Тег "Все" */}
				<Badge
					key={ALL_KEY}
					variant={active === ALL_KEY ? "default" : "secondary"}
					className="text-sm px-4 py-2 rounded-full cursor-pointer"
					onClick={() => select(ALL_KEY)}
				>
					{t("tag_all")}
				</Badge>

				{/* Остальные теги */}
				{tags.map((tag) => (
					<Badge
						key={tag}
						variant={active === tag ? "default" : "secondary"}
						className="text-sm px-4 py-2 rounded-full cursor-pointer"
						onClick={() => select(tag)}
					>
						{/* Переводим каждое значение если оно есть в словаре */}
						{t(`tag_${tag}`) !== `tag_${tag}` ? t(`tag_${tag}`) : tag}
					</Badge>
				))}
			</div>

			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
