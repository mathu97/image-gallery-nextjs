import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

export async function GET(request: NextApiRequest) {
  const url = new URL(request.url!);
  const params = url.searchParams;

  console.log("URL Parameters:");
  params.forEach((value, key) => {
    if (key === "url") {
      console.log(`${key}: ${value}`);
    }
  });

  return NextResponse.json({
    message: "Rewrite debug info",
    query: request.query,
  });
  // return NextResponse(200, {
  //   message: "Rewrite debug info",
  //   query: request.query,
  // });
}
