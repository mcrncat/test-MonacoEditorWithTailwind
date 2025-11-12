"use client";
import { useState } from "react";
import ComponentsPanel from "./ComponentsPanel";
import StructurePanel from "./StructurePanel";

export default function LeftPanel() {
  const [tab, setTab] = useState<"components" | "structure">("components");

  return (
    <aside className="w-64 border-r bg-gray-50 h-full flex flex-col">
      {/* タブ切り替え */}
      <div className="flex border-b border-gray-200 text-xs font-semibold">
        <button
          onClick={() => setTab("components")}
          className={`flex-1 py-2 ${
            tab === "components"
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Components
        </button>
        <button
          onClick={() => setTab("structure")}
          className={`flex-1 py-2 ${
            tab === "structure"
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          Structure
        </button>
      </div>

      {/* パネル本体 */}
      <div className="flex-1 overflow-y-auto p-3">
        {tab === "components" && <ComponentsPanel />}
        {tab === "structure" && <StructurePanel />}
      </div>
    </aside>
  );
}
