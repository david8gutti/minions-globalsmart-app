import { type NextRequest, NextResponse } from "next/server";

//NOTA: Este endpoint para la misma ID, genera la foto
// de un minion aleatoriamente

export async function GET(req: NextRequest) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  
  try {
    const id = req.nextUrl.searchParams.get("id");

    const response = await fetch(
      `${API_URL}/getMinionPic?id=${id}`,
    );
    const arrayBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");
    const contentType = response.headers.get("content-type") || "image/jpeg";

    return NextResponse.json({
      image: `data:${contentType};base64,${base64}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching minion" },
      { status: 500 },
    );
  }
}
