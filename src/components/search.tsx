"use client";

import { useState, useEffect, useRef } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { LangSwitch } from "./lang-switch";
import { useTranslation } from "@/hooks/useTranslation";

import {
	Command,
	CommandGroup,
	CommandItem,
	CommandList,
	CommandEmpty,
} from "@/components/ui/command";

export function SearchInput({
	onSearch,
	onSelectItem
}: {
	onSearch: (query: string) => void;
	onSelectItem: (item: any) => void;
}) {
	const { t } = useTranslation();

	const [query, setQuery] = useState("");
	const [results, setResults] = useState<any[]>([]);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const containerRef = useRef<HTMLDivElement>(null);

	// закрытие при клике вне
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (!containerRef.current?.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	// поиск
	async function handleSearch(q: string) {
		if (!q.trim()) {
			setResults([]);
			setOpen(false);
			return;
		}

		setLoading(true);

		const res = await fetch("/api/search", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ query: q }),
		});

		const data = await res.json();
		setResults(data.results || []);
		setLoading(false);
		setOpen(true);
	}

	// обработка enter
	function onEnter() {
		onSearch(query);     // ← сообщаем наверх
		setOpen(false);
	}

	return (
		<div ref={containerRef} className="relative flex w-full space-x-4 p-4">
			<Search className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />

			<Input
				value={query}
				onChange={(e) => {
					const val = e.target.value;
					setQuery(val);
					handleSearch(val);
				}}
				onKeyDown={(e) => {
					if (e.key === "Enter") onEnter();
				}}
				onFocus={() => results.length > 0 && setOpen(true)}
				placeholder={t("search_placeholder")}
				className="pl-12 pr-4 py-6 rounded-full text-base"
			/>

			{/* DROPDOWN */}
			{open && (
				<div className="absolute left-4 right-4 top-full mt-2 z-50 rounded-xl border bg-background shadow-xl">
					<Command>
						<CommandList className="max-h-[300px] overflow-y-auto">

							{loading && (
								<div className="p-3 text-sm text-muted-foreground">
									{t("loading")}
								</div>
							)}

							<CommandEmpty>
								<div className="p-3 text-sm text-muted-foreground">
									{t("no_results")}
								</div>
							</CommandEmpty>

							<CommandGroup heading={t("search_results")}>
								{results.map((item) => (
									<CommandItem
										key={item.id}
										onSelect={() => {
											onSelectItem(item);  // ← передаём выбранную карточку наверх
											setQuery(item.title);
											setOpen(false);
										}}
										className="cursor-pointer px-4 py-3"
									>
										<div className="flex flex-col">
											<span className="font-medium">{item.title}</span>
											<span className="text-xs text-muted-foreground">
												{item.company} • {item.sector}
											</span>
										</div>
									</CommandItem>
								))}
							</CommandGroup>
						</CommandList>
					</Command>
				</div>
			)}
			
			<LangSwitch />
		</div>
	);
}
