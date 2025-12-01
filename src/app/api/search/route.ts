import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
	const { query } = await req.json();

	if (!query || !query.trim()) {
		return NextResponse.json({ results: [] });
	}

	const { data, error } = await db
		.from("contacts")
		.select("id, position, company, sector, location, description, created_at")
		.or(
			`position.ilike.%${query}%,company.ilike.%${query}%,sector.ilike.%${query}%,location.ilike.%${query}%,description.ilike.%${query}%`
		)
		.order("id", { ascending: false });

	if (error) {
		console.error(error);
		return NextResponse.json({ results: [] });
	}

	const results = data.map((item) => ({
		id: item.id,
		title: item.position,
		position: item.position, 
		company: item.company,
		sector: item.sector,
		location: item.location,
		description: item.description,
		date: new Date(item.created_at).toLocaleDateString("ru-RU"),
	}));

	return NextResponse.json({ results });
}
