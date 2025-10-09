export type IncomeDetail = {
    category: string,
    cost: number,
}

export type IncomeType = {
    date: Date,
    detail:IncomeDetail[]
    memo: string
}