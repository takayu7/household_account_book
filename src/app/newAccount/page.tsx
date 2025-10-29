"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface NewAccountType {
  name: string;
  password: string;
}

export default function Login() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isValid },
  } = useForm<NewAccountType>({
    defaultValues: {
      name: "",
      password: "",
    },
    mode: "onChange",
  });

  //バリデーションルール
  const validationRules = {
    name: {
      required: "名前は必須です",
      maxLength: { value: 20, message: "20文字以内にしてください" },
    },
    password: {
      required: "パスワードは必須です",
      maxLength: { value: 10, message: "10文字以内にしてください" },
    },
  };

  //API処理‗登録
  async function createUserDatas(name: string, password: string) {
    setLoading(true);
    const requestBody = JSON.stringify({ name, password });
    try {
      const data = await fetch(`/api/setting`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: requestBody,
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

  const onSubmit = (data: NewAccountType) => {
    console.log("Creating account with:", data);
    createUserDatas(data.name, data.password);
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
            <form onSubmit={rhfHandleSubmit(onSubmit)}>
              <div className="max-w-xs flex-col justify-center items-center mx-auto">
                <div className="relative">
                  <Input
                    {...register("name", validationRules.name)}
                    type="text"
                    placeholder="Username"
                    className=" mb-5 p-2 border border-gray-300 rounded-md w-full"
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
                    className="p-2 border border-gray-300 rounded-md w-full pr-10"
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
              </div>
              <Button
                className="max-w-xs"
                type="submit"
                disabled={loading || !isValid }
              >
                {" "}
                {loading ? "Loading..." : "SAVE"}
              </Button>
            </form>
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
