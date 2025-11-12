"use client";
import { useEffect, useState } from "react";
import { useForgeStore } from "@/lib/store/forgeStore";

type NodeItem = { id: string; tag: string; text?: string; children: NodeItem[]; depth: number };

export default function StructurePanel() {
  const { editorRef, selectNode, selectedNode } = useForgeStore();
  const [tree, setTree] = useState<NodeItem[]>([]);

  useEffect(() => {
    if (!editorRef) return;
    const html = editorRef.getValue();
    const doc = new DOMParser().parseFromString(html, "text/html");
    const root = doc.body;
    const parse = (el: Element, depth = 0): NodeItem => ({
      id: el.getAttribute("id") || Math.random().toString(36).slice(2, 8),
      tag: el.tagName.toLowerCase(),
      text: el.textContent?.trim().slice(0, 20),
      children: Array.from(el.children).map((child) => parse(child, depth + 1)),
      depth,
    });
    const result = Array.from(root.children).map((c) => parse(c, 0));
    setTree(result);
  }, [editorRef]);

  const renderNode = (n: NodeItem) => (
    <div
      key={n.id}
      className={`pl-${n.depth * 3} py-1 text-sm cursor-pointer ${
        selectedNode?.id === n.id ? "bg-teal-100" : "hover:bg-gray-100"
      }`}
      onClick={() => selectNode(n)}
    >
      &lt;{n.tag}&gt;{" "}
      {n.text && <span className="text-gray-400 text-xs">“{n.text}”</span>}
      {n.children.map(renderNode)}
    </div>
  );

  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
        Structure
      </h3>
      <div>{tree.map(renderNode)}</div>
    </div>
  );
}
