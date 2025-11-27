"use client";

import { useState } from "react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from "@/components/ui/drawer";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

interface ContactDrawerProps {
  contactId: number;
  children: React.ReactNode;
}

export function ContactDrawer({ contactId, children }: ContactDrawerProps) {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendResponse() {
    setLoading(true);

    try {
      await fetch("/api/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contactId,
          viewer_tg_id: null,
          viewer_username: null,
          viewer_profile: { role, experience, portfolio },
        }),
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Ваша визитка</DrawerTitle>
          <DrawerDescription>
            Эта информация отправится автору объявления или администратору.
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 py-2 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Роль</Label>
            <Input
              value={role}
              onChange={(e) => setRole(e.target.value)}
              placeholder="Например: Game Developer"
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Опыт</Label>
            <Input
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="3 года, Middle..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <Label>Портфолио</Label>
            <Input
              value={portfolio}
              onChange={(e) => setPortfolio(e.target.value)}
              placeholder="GitHub / ArtStation / CV"
            />
          </div>
        </div>

        <DrawerFooter>
          <Button className="w-full" disabled={loading} onClick={sendResponse}>
            {loading ? "Отправка..." : "Отправить отклик"}
          </Button>

          <DrawerClose asChild>
            <Button variant="outline" className="w-full">
              Отмена
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
