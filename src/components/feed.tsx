"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactCard } from "./contact-card"; // твой компонент карточки

// пример данных (заменишь на свои)
const allContacts = Array.from({ length: 200 }).map((_, i) => ({
  id: i + 1,
  title: `Traffic Manager #${i + 1}`,
  company: "SpinMatrix Casino",
  location: "Dubai",
  tags: ["Affiliates", "RevShare", "CPA"],
  date: "19 November",
}));

export function ContactsFeed() {
  const [visibleCount, setVisibleCount] = useState(10);

  const visibleItems = allContacts.slice(0, visibleCount);

  function loadMore() {
    setVisibleCount((prev) => prev + 10);
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {visibleItems.map((item) => (
        <ContactCard
          key={item.id}
          title={item.title}
          company={item.company}
          location={item.location}
          tags={item.tags}
          date={item.date}
        />
      ))}

      {visibleCount < allContacts.length && (
        <Button
          variant="secondary"
          className="mt-4 w-full"
          onClick={loadMore}
        >
          Загрузить ещё
        </Button>
      )}
    </div>
  );
}
