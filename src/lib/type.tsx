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
  id?: string | undefined;
  name: string;
  password: string;
};

export type LoginUserType = {
  id?: string | undefined;
  name: string;
  password: string;
};