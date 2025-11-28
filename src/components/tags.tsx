"use client";

import { useState } from "react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";

export function TopTagsCarousel({
  tags,
  onSelect,
}: {
  tags: string[];
  onSelect: (tag: string | null) => void;
}) {
  const [active, setActive] = useState<string>("Все");

  function select(tag: string) {
    setActive(tag);
    onSelect(tag === "Все" ? null : tag);
  }

  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex w-max space-x-2 p-4">
        {/* Тег ВСЕ */}
        <Badge
          key="Все"
          variant={active === "Все" ? "default" : "secondary"}
          className="text-sm px-4 py-2 rounded-full cursor-pointer"
          onClick={() => select("Все")}
        >
          Все
        </Badge>

        {/* Остальные теги */}
        {tags.map((tag) => (
          <Badge
            key={tag}
            variant={active === tag ? "default" : "secondary"}
            className="text-sm px-4 py-2 rounded-full cursor-pointer"
            onClick={() => select(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
