
import Navi from "@/app/layout/Navi";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
        <div className="flex-1 overflow-auto">{children}</div>
        <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50 w-[470px]">
          <Navi />
        </div>
        <div className="h-20">{/* スペース確保用 */}</div>
    </>
  );
}
