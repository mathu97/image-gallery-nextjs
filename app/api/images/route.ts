import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = Number.parseInt(searchParams.get("page") || "1", 10);
  const limit = 20;

  const images = Array.from({ length: limit }, (_, i) => ({
    id: (page - 1) * limit + i + 1,
    url: `/placeholder.svg?height=300&width=300&text=Image ${
      (page - 1) * limit + i + 1
    }`,
    title: `Image ${(page - 1) * limit + i + 1}`,
  }));

  return NextResponse.json(images);
}
