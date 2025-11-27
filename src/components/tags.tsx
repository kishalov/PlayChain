"use client";

import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

const tags = [
  { id: 1, label: "Для вас" },
  { id: 2, label: "Kasino" },
  { id: 3, label: "Affiliapats" },
  { id: 4, label: "PSP / Payments" },
  { id: 5, label: "Developers" },
];

export function TopTagsCarousel() {
  const [active, setActive] = useState(1);

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-2 p-4">
        {tags.map((tag) => (
          <Badge
            key={tag.id}
            variant={tag.id === active ? "default" : "secondary"}
            className="text-sm px-4 py-2 rounded-full cursor-pointer"
            onClick={() => setActive(tag.id)}
          >
            {tag.label}
          </Badge>
        ))}
      </div>

      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
