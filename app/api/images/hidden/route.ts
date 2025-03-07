import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json({ config: process.env.MATHUSAN_ADMIN_CONFIG });
}
