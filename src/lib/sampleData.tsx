import { IncomeType,IncomeDetail } from "@/lib/type";
import { stringToDate } from "@/lib/utils";
const detailData: IncomeDetail[] = [
  {
    cost: 316,
    category: "food",
  },
  {
    cost: 242,
    category: "other",
  },
  {
    cost: 837,
    category: "food",
  },
  {
    cost: 874,
    category: "health",
  },
  {
    cost: 721,
    category: "education",
  },
]

const detailData2: IncomeDetail[] = [
  {
    cost: 1000,
    category: "food",
  },
  {
    cost: 2000,
    category: "other",
  },
  {
    cost: 3000,
    category: "food",
  },
  {
    cost: 4000,
    category: "health",
  },
]

export const sampleData: IncomeType[] = [
  {
    id: "251008a01",
    date: stringToDate("2025-10-08"),
    detail: detailData,
    memo:"メモ"
  },
    {
    id: "251009a01",
    date: stringToDate("2025-10-09"),
    detail: detailData2,
    memo:"メモ2"
  }
]