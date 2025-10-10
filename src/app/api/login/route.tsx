import { NextResponse } from "next/server";
import { fetchLogin } from "@/lib/api";

export async function POST(request: Request) {
  try {
    const { name, password } = await request.json();
    const user = await fetchLogin(name, password);
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}