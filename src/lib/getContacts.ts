import { db } from "@/lib/db";

export async function getContacts() {
  const { data, error } = await db
    .from("contacts")
    .select("id, position, company, sector, location, created_at")
    .order("id", { ascending: false });

  if (error) {
    console.error("Failed to load contacts:", error);
    return [];
  }

  return data.map((item) => ({
    id: item.id,
    title: item.position ?? "",   
    company: item.company ?? "",
    location: item.location ?? "",
    position: item.position ?? "",
    sector: item.sector ?? "",
    date: new Date(item.created_at).toLocaleDateString("ru-RU"),
  }));
}
