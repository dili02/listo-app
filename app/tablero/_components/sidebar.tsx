import { Clock } from "lucide-react";
import React from "react";
import SidebarNavigation from "./sidebar-navigation";

type Props = {};

export default function Sidebar({}: Props) {
  return (
    <div className="h-screen">
      <div className="flex flex-col h-full border-r border-primary">
        <div className="flex items-center min-h-20 px-6">
          <span className="text-2xl font-extrabold">list</span>
          <Clock className="w-4 h-4" />
        </div>

        <SidebarNavigation />
      </div>
    </div>
  );
}
