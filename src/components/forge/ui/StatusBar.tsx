"use client";
import { useForgeStore } from "@/lib/store/forgeStore";
import { useEffect, useState } from "react";

export default function StatusBar() {
  const { selectedNode } = useForgeStore();
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString("ja-JP", { hour12: false }));
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="h-6 bg-gray-800 text-gray-200 flex items-center justify-between px-3 text-xs font-mono">
      <div>
        {selectedNode
          ? `Sel: <${selectedNode.id}>`
          : "No element selected"}
      </div>
      <div className="text-gray-400">{time}</div>
    </footer>
  );
}
