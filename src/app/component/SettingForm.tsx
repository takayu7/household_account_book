"use client";
import React, { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { UserType } from "@/lib/type";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import { useUserStore } from '@/store/userStore'
import { toast } from "sonner";

const defaultUserData: UserType = {
  id: "",
  name: "",
  password: "",
};

interface InputFormProps {
  loginData?: UserType | null;
}

export function SettingForm({ loginData }: InputFormProps) {
  const [userData, setUserData] = useState<UserType>(defaultUserData);
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = useState(false);

    const { setUser } = useUserStore();

  useEffect(() => {
    if (loginData) {
      setUserData(loginData);
    } else {
      setUserData(defaultUserData);
    }
  }, [loginData]);

  console.log(userData)

    async function updateUserData(id:string, name: string, password: string) {
      setLoading(true);
      try {
        const data = await fetch(`/api/setting`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, name, password }),
        });
        const result = await data.json();
  
        if (result && !(Array.isArray(result) && result.length === 0)) {
          const newData = result[0] as UserType
          setUser(newData);
          setUserData(newData);
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

  const handleSubmit = () => {
    console.log("Saving data:", userData);
    if(userData.id !== undefined && loginData?.name !== userData.name || loginData?.password !== userData.password){
      updateUserData(userData.id ?? "", userData.name, userData.password);
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
        <div>
          <Input
            type="text"
            placeholder="Username"
            value={userData.name}
            onChange={(e)=> setUserData({...userData, name: e.target.value})}
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <div className="relative mb-4">
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={userData.password}
            onChange={(e)=> setUserData({...userData, password: e.target.value})}
            className=" p-2 border border-gray-300 rounded-md w-full"
          />
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
        </div>
        <Button onClick={handleSubmit}> {loading ? "Loading..." : "UPDATE"}</Button>
      </CardContent>
    </Card>
  );
}
