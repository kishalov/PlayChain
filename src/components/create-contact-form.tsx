"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useTelegramUser } from "@/hooks/useTelegramUser";
import { toast } from "sonner";

export function CreateContactForm({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const tg = useTelegramUser(); // ← правильно
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [sector, setSector] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!company || !position || !sector) {
      toast.error("Заполните обязательные поля");
      return;
    }

    setLoading(true);

    const res = await fetch("/api/create-contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company,
        position,
        sector,
        location,
        description,
        telegram_id: tg?.id ?? null,
        username: tg?.username ? `@${tg.username}` : null
      }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Объявление отправлено!");

      onSuccess?.();
    } else {
      toast.error("Ошибка при сохранении");
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label>Компания *</Label>
        <Input value={company} onChange={(e) => setCompany(e.target.value)} />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Позиция *</Label>
        <Input value={position} onChange={(e) => setPosition(e.target.value)} />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Сектор *</Label>
        <Select onValueChange={setSector}>
          <SelectTrigger>
            <SelectValue placeholder="Выберите сектор" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Game Provider">Game Provider</SelectItem>
            <SelectItem value="Affiliate Network">Affiliate Network</SelectItem>
            <SelectItem value="Operator">Operator</SelectItem>
            <SelectItem value="Payment / PSP">Payment / PSP</SelectItem>
            <SelectItem value="Marketing">Marketing</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-1">
        <Label>Локация</Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>

      <div className="flex flex-col gap-1">
        <Label>Описание</Label>
        <Textarea
          value={description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setDescription(e.target.value)
          }
        />
      </div>

      <Button onClick={submit} disabled={loading}>
        {loading ? "Отправка..." : "Отправить"}
      </Button>
    </div>
  );
}
