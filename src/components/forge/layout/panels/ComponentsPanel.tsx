"use client";
import { useForgeStore } from "@/lib/store/forgeStore";

export default function ComponentsPanel() {
  const { editorRef } = useForgeStore();

  const components = [
    {
      name: "Hero",
      html: `<section class="p-12 bg-white text-center rounded-xl shadow">
  <h2 class="text-2xl font-bold">Hero Section</h2>
</section>`,
    },
    {
      name: "Card",
      html: `<div class="p-6 bg-white rounded-lg shadow">
  <h3 class="font-semibold text-lg mb-2">Card Title</h3>
  <p class="text-gray-500 text-sm">Card content goes here.</p>
</div>`,
    },
    {
      name: "Button",
      html: `<button class="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700">Click</button>`,
    },
  ];

  const handleInsert = (html: string) => {
    if (!editorRef) return;
    const selection = editorRef.getSelection();
    editorRef.executeEdits("insert", [
      { range: selection, text: html + "\n", forceMoveMarkers: true },
    ]);
  };

  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
        Components
      </h3>
      <ul className="space-y-2">
        {components.map((c) => (
          <li
            key={c.name}
            onClick={() => handleInsert(c.html)}
            className="p-2 bg-white rounded border border-gray-200 hover:bg-teal-50 cursor-pointer text-sm"
          >
            {c.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
