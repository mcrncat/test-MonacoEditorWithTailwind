"use client";
// import SnippetList from "../snippets/SnippetList";
import { useForgeStore } from "@/lib/store/forgeStore";

export default function LeftPanel() {
  const { insertSnippet } = useForgeStore();

  return (
    <aside className="bg-gray-100 border-r border-gray-300 p-3 overflow-y-auto">
      <h2 className="text-sm font-semibold mb-2 text-gray-600">Components</h2>
      {/* <SnippetList onInsert={insertSnippet} /> */}
    </aside>
  );
}
