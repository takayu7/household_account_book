"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SettingForm } from "@/app/component/SettingForm";
import { useUserStore } from '@/store/userStore'
import { useRouter } from "next/navigation";

export default function Setting() {
  const router = useRouter();
  const { user, logout: storeLogout } = useUserStore();

  const logout=()=>{
    storeLogout();
    router.push("/login");
  }

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-4 text-center gap-4">
        <Image
          className=""
          src="/tiger.png"
          alt="Next.js logo"
          width={50}
          height={38}
          priority
        />
        <SettingForm loginData={user} />
        <Button variant="outline" onClick={logout}>LOGOUT</Button>
      </div>
    </div>
  );
}
