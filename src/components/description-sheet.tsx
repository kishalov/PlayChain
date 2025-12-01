"use client";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useTranslation } from "@/hooks/useTranslation";

export function DescriptionSheet({ description }: { description: string }) {
	if (!description) return null;

	const { t } = useTranslation();

	return (
		<Sheet>
			<SheetTrigger asChild>
				<Button variant="secondary" className="w-full">
					{t("contact_learn_more")}
				</Button>
			</SheetTrigger>

			<SheetContent
				side="bottom"
				className="rounded-t-xl max-h-[80vh] overflow-y-auto p-4"
			>
				<h2 className="text-lg font-semibold mb-3">
					{t("contact_details")}
				</h2>

				<p className="text-muted-foreground whitespace-pre-wrap text-sm leading-relaxed">
					{description}
				</p>
			</SheetContent>
		</Sheet>
	);
}
