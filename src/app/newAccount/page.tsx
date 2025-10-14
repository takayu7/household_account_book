"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { UserType } from "@/lib/type";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";

import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const defaultUserData: UserType = {
  name: "",
  password: "",
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<UserType>(defaultUserData);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function createUserDatas(name: string, password: string) {
    setLoading(true);
    try {
      const data = await fetch(`/api/setting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
      const result = await data.json();
      console.log(result);

      // HTTPステータスコードをチェック
      if (!data.ok) {
        throw new Error(result.error || "アカウント作成に失敗しました");
      }

      if (result && !(Array.isArray(result) && result.length === 0)) {
        toast.success("アカウント作成に成功しました");
        router.push("/login");
      } else {
        throw new Error("アカウント作成に失敗しました");
      }
    } catch (error) {
      console.log("Account creation failed:", error);
      toast.error("既にアカウント名が存在しています");
    } finally {
      setLoading(false);
    }
  }

  const handleSubmit = () => {
    createUserDatas(userData.name, userData.password);
  };

  return (
    <div className="bg-gray-200 h-screen flex flex-col justify-center items-center">
      <main className="flex flex-col items-center justify-center flex-1 px-4 text-center gap-8 w-full">
        <Image
          className=""
          src="/tiger.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <Card className="flex flex-col gap-2 w-full">
          <CardHeader className="items-center pb-0">
            <CardTitle>NEW ACCOUNT</CardTitle>
          </CardHeader>

          <CardContent className="flex-1 space-y-4  ">
            <div className="max-w-xs flex-col justify-center items-center mx-auto">
              <Input
                type="text"
                placeholder="Username"
                value={userData.name}
                onChange={(e) =>
                  setUserData({ ...userData, name: e.target.value })
                }
                className="mb-4 p-2 border border-gray-300 rounded-md w-full"
              />
              <div className="relative mb-4">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
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
            <Button className="max-w-xs" onClick={handleSubmit}>
              {" "}
              {loading ? "Loading..." : "SAVE"}
            </Button>
          </CardContent>
        </Card>
        <Button
          onClick={() => router.back()}
          variant="ghost"
          disabled={loading}
        >
          BACK
        </Button>
      </main>
    </div>
  );
}
