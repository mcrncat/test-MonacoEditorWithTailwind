"use client";
import { useState } from "react";
import { useForgeStore } from "@/lib/store/forgeStore";
import InspectorTabs from "@/components/forge/parts/InspectorTabs";
import StyleInspector from "@/components/forge/parts/inspector/StyleInspector";
import LayoutInspector from "@/components/forge/parts/inspector/LayoutInspector";
import ContentInspector from "@/components/forge/parts/inspector/ContentInspector";
import AdvancedInspector from "@/components/forge/parts/inspector/AdvancedInspector";

export default function RightPanel() {
  const { selectedNode, updateNode } = useForgeStore();
  const [tab, setTab] = useState<"style" | "layout" | "content" | "advanced">("style");

  if (!selectedNode) {
    return (
      <aside className="w-72 border-l bg-gray-50 h-full flex items-center justify-center text-gray-400">
        No element selected
      </aside>
    );
  }

  return (
    <aside className="w-72 border-l bg-gray-50 h-full flex flex-col">
      {/* タブ切り替え */}
      <InspectorTabs current={tab} onChange={setTab} />

      {/* タブ別インスペクタ */}
      <div className="flex-1 overflow-y-auto p-4 text-sm">
        {tab === "style" && (
          <StyleInspector node={selectedNode} update={updateNode} />
        )}
        {tab === "layout" && (
          <LayoutInspector node={selectedNode} update={updateNode} />
        )}
        {tab === "content" && (
          <ContentInspector node={selectedNode} update={updateNode} />
        )}
        {tab === "advanced" && (
          <AdvancedInspector node={selectedNode} update={updateNode} />
        )}
      </div>
    </aside>
  );
}
