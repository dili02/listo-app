import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Layers, List, ShoppingCart } from "lucide-react";
import React from "react";

type Props = {};

export default function Page({}: Props) {
  return (
    <div>
      <div className="flex gap-3">
        <div className="w-8/12">
          <Stats />
        </div>
        <div className="w-4/12 flex flex-col gap-3">
          <OverallProgress />
        </div>
      </div>
      <LatestList />
    </div>
  );
}

interface StatsProps {
  text: string;
  quantity: number;
  icon: React.ReactNode;
}

function Stats() {
  const stats: StatsProps[] = [
    { text: "Listas", quantity: 11, icon: <List className="w-10 h-10" /> },
    {
      text: "Completadas",
      quantity: 11,
      icon: <ShoppingCart className="w-10 h-10" />,
    },
    {
      text: "Categorias",
      quantity: 11,
      icon: <Layers className="w-10 h-10" />,
    },
  ];

  return (
    <Card className="flex gap-4">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className="bg-primary text-primary-foreground w-full flex flex-col justify-between"
        >
          <CardHeader className="text-xl">{stat.text}</CardHeader>
          <CardContent className="flex items-center justify-between">
            <span className="font-bold text-6xl">{stat.quantity}</span>
            <span className="w-20 h-20 rounded-full flex items-center justify-center bg-secondary text-primary">
              {stat.icon}
            </span>
          </CardContent>
        </Card>
      ))}
    </Card>
  );
}

function OverallProgress() {
  return (
    <Card className="flex-col justify-between items-center">
      <CardHeader className="text-xl text-center">Progreso General</CardHeader>
      <CardContent className="flex justify-center items-center">
        <span className="bg-primary text-primary-foreground w-20 h-20 text-3xl rounded-full flex items-center justify-center">
          76%
        </span>
      </CardContent>
    </Card>
  );
}

function LatestList() {
  return (
    <Card className="flex flex-col gap-3">
      <CardLatestList />
      <CardLatestList />
      <CardLatestList />
    </Card>
  );
}

function CardLatestList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <h2>Lista 1</h2>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>Total de productos: 12</p>
        <div className="flex gap-2 items-center">
          <span>Progreso</span>
          <span>9/12</span>
        </div>
        <div className="w-full h-[5px] rounded-2xl bg-secondary overflow-hidden">
          <div className="w-[70%] h-full bg-primary"></div>
        </div>
      </CardContent>
    </Card>
  );
}
