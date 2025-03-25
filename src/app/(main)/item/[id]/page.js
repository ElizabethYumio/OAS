"use client";

import Item from "@/components/item/item";

export default function ItemPage({ params }) {
  const id = params.id;

  return <Item id={id}></Item>;
}
