"use client";
import React, { useState, useEffect } from "react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import SelectForm from "@/app/component/SelectForm";

import { FaPlus } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { RxReset } from "react-icons/rx";

import { IncomeType } from "@/lib/type";

import { dateToString, stringToDate, generateRandomId } from "@/lib/utils";

const categorySample = [
  { key: "food", value: "food", label: "Food" },
  { key: "clothes", value: "clothes", label: "Clothes" },
  { key: "transportation", value: "transportation", label: "Transportation" },
  { key: "education", value: "education", label: "Education" },
  { key: "entertainment", value: "entertainment", label: "Entertainment" },
  { key: "health", value: "health", label: "Health" },
  { key: "other", value: "other", label: "Other" },
];

const defaultIncomeData: IncomeType = {
  id: generateRandomId(new Date()),
  date: new Date(),
  detail: [{ category: "", cost: 0 }],
  memo: "",
};

interface InputFormProps {
  editData?: IncomeType;
  onOpenChange?: (open: boolean) => void;
}

export function InputForm({ editData, onOpenChange }: InputFormProps) {
  const [incomeData, setIncomeData] = useState<IncomeType>(defaultIncomeData);

  useEffect(() => {
    if (editData && editData.detail) {
      setIncomeData(editData);
    } else {
      setIncomeData(defaultIncomeData);
    }
  }, [editData]);

  const today = new Date();
  const formattedDate = dateToString(today);

  const handeDetailPuls = () => {
    if (incomeData.detail.length < 5) {
      setIncomeData({
        ...incomeData,
        detail: [...incomeData.detail, { category: "", cost: 0 }],
      });
    }
  };

  const handeDetailMinus = (index: number) => {
    setIncomeData({
      ...incomeData,
      detail: [...incomeData.detail.filter((_, i) => i !== index)],
    });
  };

  const handleSubmit = () => {
    if (onOpenChange) {
      onOpenChange(false);
    }
    console.log("Saving data:", incomeData);
  }

  return (
    <Card className="flex flex-col gap-2 w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>Expense Input</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <Input
          type="date"
          placeholder="Username"
          className="p-2 border border-gray-300 rounded-md w-full"
          value={
            incomeData.date ? dateToString(incomeData.date) : formattedDate
          }
          onChange={(e) =>
            setIncomeData({ ...incomeData, date: stringToDate(e.target.value) })
          }
        />
        <div className="flex flex-col gap-1">
          {incomeData.detail.map((detail, index) => (
            <div
              key={index}
              className="flex gap-2 border-2 border-gray-300 rounded-md w-full p-2"
            >
              <SelectForm
                options={categorySample}
                selected={detail.category}
                onValueChange={(value: string) => {
                  const newDetail = { ...detail, category: value };
                  const newDetailList = [...incomeData.detail];
                  newDetailList[index] = newDetail;
                  setIncomeData({ ...incomeData, detail: newDetailList });
                }}
              />
              <Input
                type="text"
                placeholder="Cost"
                className="p-2 border border-gray-300 rounded-md w-full text-right"
                value={detail.cost}
                onChange={(e) => {
                  const newDetail = { ...detail, cost: Number(e.target.value) };
                  const newDetailList = [...incomeData.detail];
                  newDetailList[index] = newDetail;
                  setIncomeData({ ...incomeData, detail: newDetailList });
                }}
              />
              {index === 0 ? (
                <Button
                  size="icon-lg"
                  variant="ghost"
                  onClick={() => {
                    const newDetailList = [...incomeData.detail];
                    newDetailList[0] = { category: "", cost: 0 };
                    setIncomeData({ ...incomeData, detail: newDetailList });
                  }}
                >
                  <RxReset />
                </Button>
              ) : (
                <Button
                  size="icon-lg"
                  variant="ghost"
                  onClick={() => handeDetailMinus(index)}
                >
                  <RxCross2 />
                </Button>
              )}
            </div>
          ))}
        </div>
        {incomeData.detail.length < 5 && (
          <Button variant="outline" onClick={() => handeDetailPuls()}>
            <FaPlus className="w-6 h-6" />
          </Button>
        )}
        <Input
          type="text"
          placeholder="memo"
          className="p-2 border h-20 border-gray-300 rounded-md w-full"
        />
        <Button 
          type="button"
          variant="secondary" 
          onClick={handleSubmit}
        >
          Add Data
        </Button>
      </CardContent>
    </Card>
  );
}
