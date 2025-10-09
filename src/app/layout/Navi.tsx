"use client";
import clsx from "clsx";
import { useRouter, usePathname } from "next/navigation";

//アイコン
import { IoMdSettings } from "react-icons/io";
import { BsGraphUpArrow } from "react-icons/bs";
import { FaCodepen } from "react-icons/fa6";
import { MdOutlineHistory } from "react-icons/md";


export type linkType = {
  name: string;
  href: string;
  icon: React.ElementType;
};

const staffLinks: linkType[] = [
  {
    name: "Top",
    href: "/top",
    icon: BsGraphUpArrow,
  },
  {
    name: "InputData",
    href: "/inputData",
    icon: FaCodepen,
  },
  {
    name: "History",
    href: "/history",
    icon: MdOutlineHistory,
  },
  { name: "Setting", href: "/setting", icon: IoMdSettings }
];

const Navi = () => {
  const router = useRouter();
  const pathname = usePathname(); 

  // ナビゲーション処理
  const handleNavigation = (href: string) => {
    if (href !== pathname) {
      router.push(href);
    }
  };

  return (
    <>
      <div className="flex items-center gap-1 justify-between p-4 bg-gray-900/30">
            {staffLinks.map((link) => {
            return (
              <button
                key={link.name}
                onClick={() => handleNavigation(link.href)}
                className={clsx(
                  "flex-col w-1/4 items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600",
                  {
                    "bg-sky-100 text-blue-600": pathname === link.href,
                  }
                )}
              >
                <link.icon className="flex items-center justify-center" />
                <p className="">{link.name}</p>
              </button>
            );
          })}
        </div>
    </>
  );
};
export default Navi;
