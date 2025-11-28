"use client";

import { useState } from "react";
import { PenSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { CreateContactForm } from "./create-contact-form";

export function FloatingBurgerButton() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg"
          variant="default"
          onClick={() => setOpen(true)}
        >
          <PenSquare className="h-8 w-8" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="bottom"
        className="rounded-t-xl max-h-[85vh] overflow-y-auto"
      >
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Создать объявление</h2>

          <CreateContactForm
            onSuccess={() => {
              setOpen(false); // ← правильное закрытие
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
}
