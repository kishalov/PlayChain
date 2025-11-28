"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { ContactCard } from "./contact-card";
import { TopTagsCarousel } from "./tags";

interface Contact {
  id: number;
  title: string;
  company: string;
  location: string;
  position: string;
  sector: string;
  date: string;
}

export function ContactsFeed({ contacts }: { contacts: Contact[] }) {
  const [visibleCount, setVisibleCount] = useState(10);
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Получаем уникальные теги
  const tags = useMemo(() => {
    return Array.from(
      new Set(
        contacts
          .map((c) => c.sector?.trim())
          .filter(Boolean)
      )
    );
  }, [contacts]);

  // Фильтрация
  const filtered = activeTag
    ? contacts.filter((c) => c.sector === activeTag)
    : contacts;

  const visibleItems = filtered.slice(0, visibleCount);

  return (
    <div className="w-full flex flex-col">
      
      {/* Теги */}
      <TopTagsCarousel tags={tags} onSelect={setActiveTag} />

      {/* Лента */}
      <div className="flex flex-col gap-4 p-4">
        {visibleItems.map((item) => (
          <ContactCard
            key={item.id}
            title={item.title}
            company={item.company}
            location={item.location}
            position={item.position}
            date={item.date}
          />
        ))}

        {/* Load more */}
        {visibleCount < filtered.length && (
          <Button
            variant="secondary"
            className="mt-4 w-full"
            onClick={() => setVisibleCount((p) => p + 10)}
          >
            Загрузить ещё
          </Button>
        )}
      </div>
    </div>
  );
}
