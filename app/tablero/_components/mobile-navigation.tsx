import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Clock, Menu } from "lucide-react";
import React from "react";
import SidebarNavigation from "./sidebar-navigation";

type Props = {};

export default function MobileNavigation({}: Props) {
  return (
    <div className="flex items-center justify-between w-full h-20 px-2 border-b gap-x-4 md:px-6">
      <div className="flex items-center min-h-20 px-6">
        <span className="text-2xl font-extrabold">list</span>
        <Clock className="w-4 h-5" strokeWidth={3} />
        <span className="text-2xl">APP</span>
      </div>

      <div className="hidden">
        <Sheet>
          <SheetTrigger className="flex items-center">
            <Menu />
          </SheetTrigger>
          <SheetContent side="right" className="py-16">
            <SidebarNavigation />
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
