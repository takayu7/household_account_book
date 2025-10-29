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

// ユーザーデータの更新
export async function fetchLogin(name: string, password: string) {
  try {
    const data =
      await sql`SELECT * FROM users WHERE name = ${name} AND password = ${password}`;
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

// ユーザーデータの更新
export async function updateUserData(
  id: string,
  name: string,
  password: string
) {
  try {
    // すでに同じ名前が存在するか確認
    const exists = await sql`SELECT * FROM users WHERE name = ${name} AND id != ${id}`;
    if (exists && exists.length > 0) {
      throw new Error("User already exists");
    }
    const data =
      await sql`UPDATE users SET name = ${name} , password = ${password} WHERE id = ${id} RETURNING *;`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user data.");
  }
}

// ユーザーデータの作成
export async function createUserData(name: string, password: string) {
  try {
    // すでに同じ名前が存在するか確認
    const exists = await sql`SELECT * FROM users WHERE name = ${name}`;
    if (exists && exists.length > 0) {
      throw new Error("User already exists");
    }
    // ランダムなアルファベット（a-z）を生成
    const alphabet = "abcdefghijklmnopqrstuvwxyz";
    const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

    // ランダムな6桁の数字を生成（000000-999999）
    const randomNumbers = String(Math.floor(Math.random() * 1000000)).padStart(
      6,
      "0"
    );
    const newId = `${randomLetter}${randomNumbers}`;
    const data =
      await sql`INSERT INTO users (id, name, password) VALUES (${newId}, ${name}, ${password}) RETURNING *;`;
    return data;
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch user data.");
  }
}
