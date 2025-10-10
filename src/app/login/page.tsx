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

const defaultUserData: UserType = {
  name: "",
  password: "",
};

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [userData, setUserData] = useState<UserType>(defaultUserData);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function fetchUserDatas(name: string, password: string) {
    setLoading(true);
    try {
      const data = await fetch(`/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, password }),
      });
      const result = await data.json();
      console.log(result);

      if (result) {
        setUser(result);
        console.log("Login successful：", user);
        router.push("/top");
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

  const handleLogin = () => {
    fetchUserDatas(userData.name, userData.password);
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
        <div className="w-full max-w-xs">
          <Input
            type="text"
            placeholder="Username"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
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
          <Button onClick={handleLogin} disabled={loading}>
            <Image
              className=""
              src="/vercel.svg"
              alt="Vercel logomark"
              width={20}
              height={20}
            />
            {loading ? "Loading..." : "LOG IN"}
          </Button>
        </div>
      </main>
    </div>
  );
}
