import { Check, ShoppingCart } from "lucide-react";
import React from "react";
import { Progress } from "./progress-bar";
import { Tabs } from "./tabs";
import App from "./app";

type Props = {};

export default function AppPage({}: Props) {
  return (
    <div className="min-h-screen bg-[#DAD7CD]">
      <App />
    </div>
  );
}
