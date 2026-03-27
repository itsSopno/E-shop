"use client";

import ItemForm from "@/components/Dashboard/ItemForm";

export default function AddKeyboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-bebas text-4xl tracking-tight text-[#1A1A1A]">Manage Keyboards</h1>
        <p className="text-gray-500 text-sm font-medium">Add a new keyboard to the store collection.</p>
      </div>
      <ItemForm type="keyboard" />
    </div>
  );
}
