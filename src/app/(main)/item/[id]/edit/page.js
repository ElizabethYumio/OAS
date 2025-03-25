"use client";

import ItemForm from "@/components/item-form/item-form";

export default function EditItemPage({ params }) {
  const id = params.id;

  return <ItemForm itemId={id}></ItemForm>;
}
