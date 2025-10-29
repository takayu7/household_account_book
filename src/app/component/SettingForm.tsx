"use client";
import React, { useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { UserType } from "@/lib/type";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import { useUserStore } from "@/store/userStore";
import { toast } from "sonner";

interface InputFormProps {
  loginData?: UserType | null;
}

export function SettingForm({ loginData }: InputFormProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);

  const { setUser } = useUserStore();

  const {
    register,
    watch,
    setValue,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isValid },
  } = useForm<UserType>({
    defaultValues: {
      id: loginData?.id ?? "",
      name: loginData?.name ?? "",
      password: loginData?.password ?? "",
    },
    mode: "onChange",
  });

  const validationRules = {
    name: {
      required: "名前は必須です",
      maxLength: { value: 20, message: "20文字以内にしてください" },
    },
    password: {
      required: "パスワードは必須です",
      maxLength: { value: 10, message: "20文字以内にしてください" },
    },
  };
  const isAllFilled = watch("name") !== "" && watch("password") !== "";

  async function updateUserData(id: string, name: string, password: string) {
    setLoading(true);
    const requestBody = JSON.stringify({ id, name, password });
    try {
      const data = await fetch(`/api/setting`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
      });
      const result = await data.json();

      if (result && !(Array.isArray(result) && result.length === 0)) {
        const newData = result[0] as UserType;
        setUser(newData);
        setValue("name", newData.name);
        setValue("password", newData.password);
        toast.success("User settings update successful");
      } else {
        throw new Error("ログインに失敗しました");
      }
    } catch (error) {
      console.log("Login failed:", error);
      toast.error("ログインに失敗しました");
    } finally {
      setLoading(false);
    }
  }

  const onSubmit = (data: UserType) => {
    console.log("Saving data:", data);
    if (
      (data.id !== undefined && loginData?.name !== data.name) ||
      loginData?.password !== data.password
    ) {
      updateUserData(data.id ?? "", data.name, data.password);
    } else {
      alert("No changes to save.");
    }
  };

  return (
    <Card className="flex flex-col gap-2 w-full">
      <CardHeader className="items-center pb-0">
        <CardTitle>User Config</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 space-y-4">
        <form onSubmit={rhfHandleSubmit(onSubmit)}>
          <div className="relative">
            <Input
              {...register("name", validationRules.name)}
              type="text"
              placeholder="Username"
              className="mb-5 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.name && (
              <p className="absolute bottom-1 text-xs text-red-600">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="relative mb-5">
            <Input
              {...register("password", validationRules.password)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="mb-5 p-2 border border-gray-300 rounded-md w-full"
            />
            {errors.password && (
              <p className="absolute -bottom-4 text-xs text-red-600">
                {errors.password.message}
              </p>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-1/2 -translate-y-1/2"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <IoMdEyeOff className="h-4 w-4" />
              ) : (
                <IoMdEye className="h-4 w-4" />
              )}
              <span className="sr-only">
                {showPassword ? "Hide password" : "Show password"}
              </span>
            </Button>
          </div>
          <Button type="submit" disabled={loading || !isValid || !isAllFilled}>
            {" "}
            {loading ? "Loading..." : "UPDATE"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
