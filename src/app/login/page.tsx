"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="bg-gray-200 h-screen flex flex-col justify-center items-center">
      <main className="flex flex-col items-center justify-center flex-1 px-4 text-center gap-8">
        <Image
          className=""
          src="/tiger.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <div>
          <Input
            type="text"
            placeholder="Username"
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
          <Input
            type="password"
            placeholder="Password"
            className="mb-4 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <Button onClick={() => handleNavigation("/top")}>
          <Image
            className=""
            src="/vercel.svg"
            alt="Vercel logomark"
            width={20}
            height={20}
          />
          LOG IN
        </Button>
      </main>
    </div>
  );
}
