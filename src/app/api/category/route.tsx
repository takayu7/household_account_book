import { NextResponse } from "next/server";
import { fetchCategoryDatas } from "@/lib/api";

export async function GET() {
  try {
    const category = await fetchCategoryDatas();
    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}