import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const page = req.nextUrl.searchParams.get("page") || "1";

    const response = await fetch(
      `${API_URL}/getMinions?page=${page}`,
    );
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching minions" },
      { status: 500 },
    );
  }
}
