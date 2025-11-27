"use client";

import { useState } from "react";
import { ContactDialog } from "./contact-dialog";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardAction,
  CardDescription,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Heart } from "lucide-react";

interface ContactCardProps {
  title: string;
  company: string;
  location: string;
  tags: string[];
  date: string;
}

export function ContactCard({
  title,
  company,
  location,
  tags,
  date,
}: ContactCardProps) {
  const [fav, setFav] = useState(false);

  return (
    <Card className="relative w-full max-w-full">
      
      {/* Иконка избранного */}
      <button
        onClick={() => setFav(!fav)}
        className="absolute right-4 top-4 text-muted-foreground"
      >
        <Heart
          size={20}
          className={fav ? "fill-black" : ""}
        />
      </button>

      <CardHeader>
        <CardTitle>{title}</CardTitle>

        <CardDescription>
          {company}
          <br />
          {location}
        </CardDescription>
      </CardHeader>
<CardContent>
  <div className="flex flex-wrap gap-2 w-full">
    {tags.map((tag) => (
      <div
        key={tag}
        className="
          bg-secondary
          text-xs
          px-3 py-1
          rounded-md
          max-w-[80%]
        "
      >
        {tag}
      </div>
    ))}
  </div>

  <div className="text-muted-foreground text-sm mt-3">
    Опубликовано {date}
  </div>
</CardContent>


      <CardFooter>
        <CardAction className="w-full">

          {/* ← ЗДЕСЬ БЫЛ <ContactDrawer> */}
          <ContactDialog contactId={42}>
            <Button className="w-full">Узнать контакт</Button>
          </ContactDialog>

        </CardAction>
      </CardFooter>
    </Card>
  );
}
