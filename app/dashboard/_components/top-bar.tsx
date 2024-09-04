import React from "react";

type Props = {};

export default function TopBar({}: Props) {
  return (
    <div className="p-8 pt-12 flex items-center justify-between">
      <div className="flex flex-col">
        <span className="font-bold text-2xl">
          Hola, <span className="font-light">Diego</span>
        </span>
        <span className="text-sm font-light">Bienvenido/a, de nuevo!</span>
      </div>
    </div>
  );
}
