import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.POSTGRES_URL!);

// ユーザーデータの取得
export async function fetchUserDatas() {
  try {
    const data = await sql`SELECT * FROM users`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user data.");
  }
}

// ログインの取得
export async function fetchLogin(name: string, password: string) {
  try {
    const data = await sql`SELECT * FROM users WHERE name = ${name} AND password = ${password}`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user data.");
  }
}

// Categoryデータの取得
export async function fetchCategoryDatas() {
  try {
    const data = await sql`SELECT * FROM category`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user data.");
  }
}
