export type IncomeDetail = {
    category: string,
    cost: number,
}

export type IncomeType = {
    id:string,
    date: Date,
    detail:IncomeDetail[]
    memo: string
}

export type TableType = {
  id: string;
  date: string;
  cost: number;
  memo: string;
};

export type UserType = {
  name: string;
  password: string;
};