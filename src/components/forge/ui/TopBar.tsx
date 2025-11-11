"use client";
import { useForgeStore } from "@/lib/store/forgeStore";
import { useState } from "react";
import { Save, Play, FilePlus, Upload } from "lucide-react";

export default function TopBar() {
  const { editorRef } = useForgeStore();
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  const handleSave = () => {
    if (!editorRef) return;
    setStatus("saving");
    const html = editorRef.getValue();
    localStorage.setItem("tailforge-last", html);
    setTimeout(() => setStatus("saved"), 400);
    setTimeout(() => setStatus("idle"), 1200);
  };

  const handleExport = () => {
    if (!editorRef) return;
    const html = editorRef.getValue();
    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tailforge-export.html";
    a.click();
    URL.revokeObjectURL(url);
  };

  const handlePreview = () => {
    if (!editorRef) return;
    const html = editorRef.getValue();
    const preview = window.open("", "_blank");
    preview?.document.write(`<!DOCTYPE html>
      <html>
        <head><script src="https://cdn.tailwindcss.com"></script></head>
        <body>${html}</body>
      </html>`);
    preview?.document.close();
  };

  const handleNew = () => {
    if (!editorRef) return;
    if (confirm("新しいページを開始しますか？ 現在の内容は失われます。")) {
      editorRef.setValue("<div class='p-8 text-center'>New Page</div>");
    }
  };

  return (
    <header className="h-12 bg-white border-b border-gray-200 flex items-center justify-between px-3 text-sm">
      <div className="flex items-center gap-2 font-semibold text-gray-700">
        <span className="text-teal-600">TailForge</span>
        <span className="text-gray-400">/ Editor</span>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={handleNew}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
        >
          <FilePlus size={16} />
          New
        </button>

        <button
          onClick={handleSave}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
        >
          <Save size={16} />
          Save
        </button>

        <button
          onClick={handleExport}
          className="flex items-center gap-1 px-2 py-1 rounded hover:bg-gray-100"
        >
          <Upload size={16} />
          Export
        </button>

        <button
          onClick={handlePreview}
          className="flex items-center gap-1 px-3 py-1 bg-teal-600 text-white rounded hover:bg-teal-700"
        >
          <Play size={14} />
          Preview
        </button>
      </div>

      <div className="text-xs text-gray-400 min-w-[60px] text-right">
        {status === "saving" && "Saving..."}
        {status === "saved" && "Saved ✓"}
      </div>
    </header>
  );
}
