import { type NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const id = req.nextUrl.searchParams.get("id");

    const response = await fetch(
      `${API_URL}/getMinion?id=${id}`,
    );
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching minion" },
      { status: 500 },
    );
  }
}
