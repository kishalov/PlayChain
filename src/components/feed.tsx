"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactCard } from "./contact-card";

interface Contact {
  title: string;
  company: string;
  location: string;
  tags: string[];
  date: string;
}

export function ContactsFeed({ contacts }: { contacts: Contact[] }) {
  const [visibleCount, setVisibleCount] = useState(10);

  const visibleItems = contacts.slice(0, visibleCount);

  function loadMore() {
    setVisibleCount((prev) => prev + 10);
  }

  return (
    <div className="w-full flex flex-col gap-4 p-4">
      {visibleItems.map((item, i) => (
        <ContactCard
          key={i}
          title={item.title}
          company={item.company}
          location={item.location}
          tags={item.tags}
          date={item.date}
        />
      ))}

      {visibleCount < contacts.length && (
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
