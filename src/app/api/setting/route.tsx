import { NextResponse } from "next/server";
import { createUserData, updateUserData } from "@/lib/api";

export async function PUT(request: Request) {
  try {
    const { id, name, password } = await request.json();
    const user = await updateUserData(id, name, password);

    // テーブル更新が成功した場合（結果が返ってきた場合）
    if (user && user.length > 0) {
      return NextResponse.json(user, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "User not found or update failed" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Setting update error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}

//登録
export async function POST(request: Request) {
  try {
    // リクエストボディをデバッグ
    const rawBody = await request.text();

    if (!rawBody) {
      throw new Error("Empty request body");
    }

    const { name, password } = JSON.parse(rawBody);
    const user = await createUserData(name, password);

    // テーブル作成が成功した場合（結果が返ってきた場合）
    if (user && user.length > 0) {
      return NextResponse.json(user, { status: 201 });
    } else {
      return NextResponse.json(
        { error: "User creation failed" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("User creation error:", error);
    return NextResponse.json({ error: "DB error" }, { status: 500 });
  }
}
