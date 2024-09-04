import MobileNavigation from "./_components/mobile-navigation";
import Sidebar from "./_components/sidebar";
import { Toaster } from "sonner";

export default function TableroLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/*<div className="flex w-full h-full">
         <div className="hidden h-full xl:block w-80 xl:fixed">
          <Sidebar />
        </div>
        <div className="w-full h-full xl:ml-80">
          <MobileNavigation />
          <div className="p-6 h-max">{children}</div>
        </div>
      </div> */}
      <div className="w-full h-full">
        <MobileNavigation />
        <div className="container">{children}</div>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}
