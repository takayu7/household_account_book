import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const dateToString = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const stringToDate = (dateString: string) => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const formatPrice = (price: number) => {
  return price.toLocaleString();
};

// 日付6桁 + アルファベット + ランダム数字2桁のIDを生成
export const generateRandomId = (date?: Date): string => {
  const targetDate = date || new Date();

  // 年月日を6桁に変換（例: 2025年10月8日 → 251008）
  const year = targetDate.getFullYear().toString().slice(-2); // 下2桁
  const month = String(targetDate.getMonth() + 1).padStart(2, "0");
  const day = String(targetDate.getDate()).padStart(2, "0");
  const dateStr = `${year}${month}${day}`;

  // ランダムなアルファベット（a-z）を生成
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];

  // ランダムな2桁の数字を生成（00-99）
  const randomNumbers = String(Math.floor(Math.random() * 100)).padStart(
    2,
    "0"
  );

  return `${dateStr}${randomLetter}${randomNumbers}`;
};
