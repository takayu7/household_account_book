"use client";
import React, { useState, useEffect } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { UserType } from "@/lib/type";

import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

const defaultUserData: UserType = {
  name: "",
  password: "",
};

interface InputFormProps {
  loginData?: UserType;
}

export function SettingForm({ loginData }: InputFormProps) {
  const [userData, setUserData] = useState<UserType>(defaultUserData);
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    if (loginData) {
      setUserData(loginData);
    } else {
      setUserData(defaultUserData);
    }
  }, [loginData]);

  const handleSubmit = () => {
    console.log("Saving data:", userData);
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
        <Button onClick={handleSubmit}>UPDATE</Button>
      </CardContent>
    </Card>
  );
}
