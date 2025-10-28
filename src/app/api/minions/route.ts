import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";

    const response = await fetch(
      `https://minion.globalsmartiot.es/getMinions?page=${page}`
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching minions" }, { status: 500 });
  }
}
