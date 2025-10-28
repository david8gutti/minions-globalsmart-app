import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");

    const response = await fetch(
      `https://minion.globalsmartiot.es/getMinion?id=${id}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching minion" }, { status: 500 });
  }
}