import { getSheetData } from "./sheets";

export async function getContacts() {
  const rows = await getSheetData("Лист1!A2:C500");

  return rows.map((row: (string | undefined)[]) => {
    const [title = "", company = "", sector = ""] = row;

    return {
      title,
      company,
      location: "",
      tags: sector
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      date: new Date().toLocaleDateString("ru-RU"),
    };
  });
}
