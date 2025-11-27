"use client";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";

import { Flame, Megaphone, Users, BadgeCheck } from "lucide-react";

const ads = [
	{ id: 1, title: "Топ-вакансии", icon: Megaphone, color: "bg-blue-500" },
	{ id: 2, title: "Пост-резюме", icon: Users, color: "bg-purple-500" },
	{ id: 3, title: "Проверенные компании", icon: BadgeCheck, color: "bg-green-500" },
	{ id: 4, title: "Горячие офферы", icon: Flame, color: "bg-orange-500" },
];

export function TopAdsCarousel() {
	return (
		<ScrollArea className="w-full whitespace-nowrap">
			<div className="flex w-max space-x-4 p-4">
				{ads.map((item) => {
					const Icon = item.icon;

					return (
						<Card key={item.id} className="bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm">
                            <CardHeader>

								<div className={`w-12 h-12 rounded-full flex items-center justify-center text-white ${item.color}`}>
									<Icon size={24} />
								</div>
                            </CardHeader>
							<CardContent>
								<CardTitle>
									{item.title}
								</CardTitle>
							</CardContent>
						</Card>
					);
				})}
			</div>

			<ScrollBar orientation="horizontal" />
		</ScrollArea>
	);
}
