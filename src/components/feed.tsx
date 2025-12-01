"use client";

import { useState, useMemo } from "react";
import { ContactCard } from "./contact-card"
import { SearchInput } from "./search";

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

export function ContactsFeed({ contacts }: { contacts: Contact[] }) {
	const [searchQuery, setSearchQuery] = useState("");
	const [selectedCard, setSelectedCard] = useState<Contact | null>(null);

	// Фильтрация по Enter
	const filtered = searchQuery
		? contacts.filter((c) => {
				const q = searchQuery.toLowerCase();
				return (
					c.title.toLowerCase().includes(q) ||
					c.company.toLowerCase().includes(q) ||
					c.position.toLowerCase().includes(q) ||
					c.sector.toLowerCase().includes(q) ||
					c.location.toLowerCase().includes(q) ||
					c.description.toLowerCase().includes(q)
				);
		  })
		: contacts;

	return (
		<div className="w-full flex flex-col">

			{/* SEARCH */}
			<SearchInput
				onSearch={(q) => {
					setSelectedCard(null); // ← выключаем одиночный режим
					setSearchQuery(q);
				}}
				onSelectItem={(item) => {
					setSelectedCard(item);
					setSearchQuery(""); // ← отключаем фильтрацию
				}}
			/>

			<div className="flex flex-col gap-4 p-4">

				{/* Отображаем одну карточку */}
				{selectedCard && (
					<ContactCard {...selectedCard} />
				)}

				{/* Отображаем результаты фильтрации */}
				{!selectedCard &&
					filtered.map((item) => (
						<ContactCard key={item.id} {...item} />
					))}
			</div>

		</div>
	);
}

