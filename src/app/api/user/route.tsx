import { NextResponse } from "next/server";
import { fetchUserDatas } from "@/lib/api";

export async function GET() {
  try {
    const users = await fetchUserDatas();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}