"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchInput() {
  return (
    <div className="relative flex w-full space-x-4 p-4">
      <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />

      <Input
        type="text"
        placeholder="Casino, affiliate, PSP..."
        className="pl-12 pr-4 py-6 rounded-full text-base"
      />
    </div>
  );
}
