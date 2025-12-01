"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Flame, Megaphone, Users, BadgeCheck, Star } from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";

const ads = [
	{
		id: 0,
		titleKey: "ad_top_vacancies", // Senior Affiliate Manager в iGaming (твоя реклама)
		icon: Star,
		color: "bg-yellow-500",
		isAd: true,
	},
	{
		id: 1,
		titleKey: "ad_top_vacancies",
		icon: Megaphone,
		color: "bg-blue-500",
	},
	{
		id: 2,
		titleKey: "ad_post_resume",
		icon: Users,
		color: "bg-purple-500",
	},
	{
		id: 3,
		titleKey: "ad_verified_companies",
		icon: BadgeCheck,
		color: "bg-green-500",
	},
	{
		id: 4,
		titleKey: "ad_hot_offers",
		icon: Flame,
		color: "bg-orange-500",
	},
];

export function TopAdsCarousel() {
	const { t } = useTranslation();

	return (
		<ScrollArea className="w-full">
			<div className="flex w-max space-x-4 p-4">

				{ads.map((item) => {
					const Icon = item.icon;

					return (
						<Card
							key={item.id}
							className="justify-between py-6 px-4 max-w-[200px]"
						>
							<CardHeader className="p-0">
								<div
									className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${item.color}`}
								>
									<Icon size={24} />
								</div>
							</CardHeader>

							<CardContent className="p-0">
								<CardTitle className="text-sm">
									{t(item.titleKey)}
								</CardTitle>

								{item.isAd && (
									<span className="inline-block text-[10px] mt-3 px-2 py-0.5 rounded-full bg-yellow-300 text-black font-semibold uppercase">
										{t("ad_sponsored")}
									</span>
								)}
							</CardContent>
						</Card>
					);
				})}
			</div>

			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
