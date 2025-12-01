"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

import { ContactCard } from "./contact-card";
import { TopAdsCarousel } from "./top-ads-carousel";
import { TopTagsCarousel } from "./tags";

interface Contact {
	id: number;
	title: string;
	company: string;
	location: string;
	position: string;
	sector: string;
	date: string;
	description: string;
}

export function ContactsSearchFeed({ contacts }: { contacts: Contact[] }) {
	const { t } = useTranslation();

	// SEARCH STATE
	const [query, setQuery] = useState("");
	const [results, setResults] = useState<Contact[]>([]);
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	// FEED STATE
	const [selectedCard, setSelectedCard] = useState<Contact | null>(null);
	const [activeTag, setActiveTag] = useState<string | null>(null);

	const containerRef = useRef<HTMLDivElement>(null);

	// Закрытие Command при клике вне поиска
	useEffect(() => {
		function handleClick(e: MouseEvent) {
			if (!containerRef.current?.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener("mousedown", handleClick);
		return () => document.removeEventListener("mousedown", handleClick);
	}, []);

	// LIVE SEARCH
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

	// Enter → фильтрация всей ленты
	function handleEnter() {
		setSelectedCard(null);
		setOpen(false);
	}

	// Все доступные теги
	const tags = useMemo(() => {
		return Array.from(new Set(contacts.map((c) => c.sector).filter(Boolean)));
	}, [contacts]);

	// Итоговая фильтрация фида
	const filtered = contacts.filter((c) => {
		const matchTag = activeTag ? c.sector === activeTag : true;
		const matchQuery = query
			? [
					c.title,
					c.company,
					c.position,
					c.sector,
					c.location,
					c.description,
			  ]
					.join(" ")
					.toLowerCase()
					.includes(query.toLowerCase())
			: true;

		return matchTag && matchQuery;
	});

	return (
		<div className="w-full flex flex-col gap-2" ref={containerRef}>

			{/* ========================================================= */}
			{/* 1. ПОИСК */}
			{/* ========================================================= */}
			<div className="relative flex w-full space-x-4 p-4">
				<Search
					className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground"
					size={20}
				/>

				<Input
					value={query}
					onChange={(e) => {
						const v = e.target.value;
						setQuery(v);
						handleSearch(v);
					}}
					onKeyDown={(e) => e.key === "Enter" && handleEnter()}
					onFocus={() => results.length > 0 && setOpen(true)}
					placeholder={t("search_placeholder")}
					className="pl-12 pr-4 py-6 rounded-full text-base"
				/>

				<LangSwitch />
			</div>

			{/* Выпадающие подсказки */}
			{open && (
				<div className="absolute left-4 right-4 top-[90px] z-50 rounded-xl border bg-background shadow-xl">
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
											setSelectedCard(item);
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

			{/* ========================================================= */}
			{/* 2. РЕКЛАМА */}
			{/* ========================================================= */}
			<div className="mt-2">
				<TopAdsCarousel />
			</div>

			{/* ========================================================= */}
			{/* 3. ТЭГИ */}
			{/* ========================================================= */}
			<TopTagsCarousel
				tags={tags}
				onSelect={(tag) => {
					setSelectedCard(null);
					setActiveTag(tag);
				}}
			/>

			{/* ========================================================= */}
			{/* 4. ФИД */}
			{/* ========================================================= */}
			<div className="flex flex-col gap-4 p-4">

				{selectedCard && <ContactCard {...selectedCard} />}

				{!selectedCard &&
					filtered.map((c) => <ContactCard key={c.id} {...c} />)
				}

			</div>
		</div>
	);
}
