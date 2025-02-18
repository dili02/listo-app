import React from "react";
import { permanentRedirect } from "next/navigation";
type Props = {};

export default function Tableropage({}: Props) {
  permanentRedirect(`/lista`);
  return <></>;
}
