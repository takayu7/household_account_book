"use client";
import Image from "next/image";
import { InputForm } from "@/app/component/InputForm";

export default function InputData() {
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
        <InputForm />
      </div>
    </div>
  );
}
