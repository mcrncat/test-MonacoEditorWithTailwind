"use client";
import LayoutEditor from "@/components/forge/layout/LayoutEditor";
import Link from "next/link";

export default function LayoutEditorPage() {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* TopBar */}
      <header className="h-12 border-b bg-white flex items-center justify-between px-4 text-sm">
        <div className="font-semibold text-gray-700">
          🧩 TailForge <span className="text-gray-400">/ Layout Editor</span>
        </div>
        <Link
          href="/forge"
          className="text-teal-600 hover:text-teal-800 text-xs font-medium"
        >
          ← Back to Forge
        </Link>
      </header>

      {/* Layout Editor */}
      <main className="flex-1 overflow-hidden">
        <LayoutEditor />
      </main>

      {/* Status */}
      <footer className="h-6 bg-gray-800 text-gray-300 text-xs flex items-center px-3 font-mono">
        Layout Editor Ready
      </footer>
    </div>
  );
}
