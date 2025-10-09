"use client";
import Image from "next/image";
import { PieChartShow } from "@/app/component/PieChartShow";
import { BarChartShow } from "@/app/component/BarChartShow";

export default function Top() {
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
        <PieChartShow />
        <BarChartShow />
      </div>
    </div>
  );
}
