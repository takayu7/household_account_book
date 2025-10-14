"use client";
import Image from "next/image";
import { SettingForm } from "@/app/component/SettingForm";
import { useUserStore } from '@/store/userStore'

export default function Setting() {

  const { user } = useUserStore();

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
      </div>
    </div>
  );
}
