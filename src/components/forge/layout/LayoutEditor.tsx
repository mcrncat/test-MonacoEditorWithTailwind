"use client";
import { useState, useEffect, useRef } from "react";
import Editor from "@monaco-editor/react";
import { useForgeStore } from "@/lib/store/forgeStore";
import { Plus, Trash, ArrowUp, ArrowDown } from "lucide-react";

type Container = {
  id: string;
  name: string;
  classes: string;
  slotCount: number;
  slotHeight: string;
  slotMargin: string;
};

type PageLayout = {
  header: { visible: boolean };
  footer: { visible: boolean };
  leftSidebar: { visible: boolean; width: string };
  rightSidebar: { visible: boolean; width: string };
  containers: Container[];
};

export default function LayoutEditor() {
  const { setEditor, editorRef } = useForgeStore();
  const [scale, setScale] = useState(0.85);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // 初期状態
  const [page, setPage] = useState<PageLayout>({
    header: { visible: true },
    footer: { visible: true },
    leftSidebar: { visible: false, width: "w-64" },
    rightSidebar: { visible: false, width: "w-64" },
    containers: [
      {
        id: "c1",
        name: "Container 1",
        classes: "grid grid-cols-3 gap-4 m-4 bg-gray-50",
        slotCount: 3,
        slotHeight: "h-48",
        slotMargin: "m-2",
      },
    ],
  });

  const [selected, setSelected] = useState("c1");
  const selectedContainer = page.containers.find((c) => c.id === selected);

  const handleEditorMount = (editor: any) => setEditor(editor);

  // HTML構築
  const renderContainer = (c: Container) => {
    const slots = Array.from({ length: c.slotCount })
      .map(
        (_, i) =>
          `<div class="rounded text-center text-gray-600 ${c.slotHeight} ${c.slotMargin} border-2 border-dashed border-orange-400 flex items-center justify-center">
            Slot ${i + 1}
          </div>`
      )
      .join("\n");

    return `
<div class="${c.classes} border-2 border-dashed border-teal-400 p-2">
  ${slots}
</div>`;
  };

  const buildHTML = (p: PageLayout) => `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    body {
      transform: scale(${scale});
      transform-origin: top left;
      width: ${100 / scale}%;
      transition: transform 0.3s ease;
    }
  </style>
</head>
<body class="min-h-screen flex flex-col bg-gray-100">
  ${
    p.header.visible
      ? `<header class="border-2 border-dashed border-sky-400 flex items-center justify-center text-gray-700 text-sm">Header Area</header>`
      : ""
  }

  <div class="flex flex-1">
    ${
      p.leftSidebar.visible
        ? `<aside class="${p.leftSidebar.width} border-r-2 border-dashed border-sky-400 flex items-center justify-center text-gray-600 text-sm">Left Sidebar</aside>`
        : ""
    }

    <main class="flex-1 p-6 space-y-6">
      ${p.containers.map(renderContainer).join("")}
    </main>

    ${
      p.rightSidebar.visible
        ? `<aside class="${p.rightSidebar.width} border-l-2 border-dashed border-sky-400 flex items-center justify-center text-gray-600 text-sm">Right Sidebar</aside>`
        : ""
    }
  </div>

  ${
    p.footer.visible
      ? `<footer class="border-2 border-dashed border-sky-400 flex items-center justify-center text-gray-700 text-sm">Footer Area</footer>`
      : ""
  }
</body>
</html>`;

  const updateMonaco = (p: PageLayout) => {
    if (!editorRef) return;
    editorRef.setValue(buildHTML(p));
  };

  useEffect(() => {
    if (editorRef) updateMonaco(page);
  }, [editorRef]);

  // Container操作
  const addContainer = () => {
    const id = `c${Math.random().toString(36).slice(2, 6)}`;
    const newContainer: Container = {
      id,
      name: `Container ${page.containers.length + 1}`,
      classes: "grid grid-cols-2 gap-4 m-4 bg-gray-50",
      slotCount: 2,
      slotHeight: "h-48",
      slotMargin: "m-2",
    };
    const newPage = { ...page, containers: [...page.containers, newContainer] };
    setPage(newPage);
    setSelected(id);
    updateMonaco(newPage);
  };

  const removeContainer = (id: string) => {
    const newPage = {
      ...page,
      containers: page.containers.filter((c) => c.id !== id),
    };
    setPage(newPage);
    updateMonaco(newPage);
  };

  const moveContainer = (id: string, dir: "up" | "down") => {
    const idx = page.containers.findIndex((c) => c.id === id);
    if (idx === -1) return;
    const arr = [...page.containers];
    const swap = dir === "up" ? idx - 1 : idx + 1;
    if (swap < 0 || swap >= arr.length) return;
    [arr[idx], arr[swap]] = [arr[swap], arr[idx]];
    const newPage = { ...page, containers: arr };
    setPage(newPage);
    updateMonaco(newPage);
  };

  const updateContainer = (id: string, patch: Partial<Container>) => {
    const newPage = {
      ...page,
      containers: page.containers.map((c) =>
        c.id === id ? { ...c, ...patch } : c
      ),
    };
    setPage(newPage);
    updateMonaco(newPage);
  };

  const updatePage = (patch: Partial<PageLayout>) => {
    const newPage = { ...page, ...patch };
    setPage(newPage);
    updateMonaco(newPage);
  };

  const htmlDoc = buildHTML(page);

  return (
    <div className="grid grid-cols-[260px_1fr] h-full">
      {/* LEFT PANEL */}
      <div className="border-r bg-gray-50 flex flex-col">
        <div className="flex items-center justify-between p-3 border-b">
          <h3 className="text-sm font-semibold text-gray-700">Containers</h3>
          <button
            onClick={addContainer}
            className="text-teal-600 hover:text-teal-800 text-xs flex items-center gap-1"
          >
            <Plus size={14} /> Add
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {page.containers.map((c) => (
            <div
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`px-3 py-2 cursor-pointer text-sm flex justify-between items-center ${
                selected === c.id
                  ? "bg-teal-100 text-teal-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              <span>{c.name}</span>
              <div className="flex gap-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveContainer(c.id, "up");
                  }}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <ArrowUp size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    moveContainer(c.id, "down");
                  }}
                  className="text-gray-400 hover:text-gray-700"
                >
                  <ArrowDown size={14} />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeContainer(c.id);
                  }}
                  className="text-gray-400 hover:text-red-500"
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MAIN AREA */}
      <div className="grid grid-rows-[1fr_auto] h-full">
        {/* VIEW */}
        <div className="relative bg-gray-100 flex items-center justify-center overflow-auto border-b">
          <div className="hidden">
            <Editor height="0" width="0" defaultLanguage="html" onMount={handleEditorMount} />
          </div>

          <iframe
            ref={iframeRef}
            className="border shadow bg-white mx-auto rounded-md"
            style={{
              width: "1280px",
              aspectRatio: "16/10",
            }}
            sandbox="allow-scripts allow-same-origin"
            srcDoc={htmlDoc}
          />

          {/* Zoomコントロール */}
          <div className="absolute bottom-2 right-2 bg-white/80 border rounded shadow px-2 py-1 flex items-center gap-2 text-xs">
            <span>Zoom</span>
            <select
              value={scale}
              onChange={(e) => setScale(parseFloat(e.target.value))}
              className="border rounded px-1 py-0.5"
            >
              {[0.5, 0.75, 0.85, 1, 1.25].map((s) => (
                <option key={s} value={s}>
                  {Math.round(s * 100)}%
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* PROPERTY PANEL */}
        <div className="p-4 bg-gray-50 overflow-y-auto">
          {/* PAGE SETTINGS */}
          <h3 className="text-sm font-semibold mb-2 text-gray-700">Page Settings</h3>
          <div className="grid grid-cols-2 gap-4 text-sm mb-4">
            {/* Header */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={page.header.visible}
                onChange={(e) => updatePage({ header: { visible: e.target.checked } })}
              />
              Header
            </label>

            {/* Footer */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={page.footer.visible}
                onChange={(e) => updatePage({ footer: { visible: e.target.checked } })}
              />
              Footer
            </label>

            {/* Left Sidebar */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={page.leftSidebar.visible}
                onChange={(e) =>
                  updatePage({
                    leftSidebar: { ...page.leftSidebar, visible: e.target.checked },
                  })
                }
              />
              Left Sidebar
            </label>

            {/* Left Width */}
            {page.leftSidebar.visible && (
              <select
                value={page.leftSidebar.width.replace("w-", "")}
                onChange={(e) =>
                  updatePage({
                    leftSidebar: { ...page.leftSidebar, width: `w-${e.target.value}` },
                  })
                }
                className="border rounded p-1 text-sm w-full"
              >
                {["48", "64", "80"].map((w) => (
                  <option key={w} value={w}>
                    {w}px
                  </option>
                ))}
              </select>
            )}

            {/* Right Sidebar */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={page.rightSidebar.visible}
                onChange={(e) =>
                  updatePage({
                    rightSidebar: { ...page.rightSidebar, visible: e.target.checked },
                  })
                }
              />
              Right Sidebar
            </label>

            {/* Right Width */}
            {page.rightSidebar.visible && (
              <select
                value={page.rightSidebar.width.replace("w-", "")}
                onChange={(e) =>
                  updatePage({
                    rightSidebar: { ...page.rightSidebar, width: `w-${e.target.value}` },
                  })
                }
                className="border rounded p-1 text-sm w-full"
              >
                {["48", "64", "80"].map((w) => (
                  <option key={w} value={w}>
                    {w}px
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* CONTAINER SETTINGS */}
          {selectedContainer && (
            <>
              <h3 className="text-sm font-semibold mb-2 text-gray-700">Container Settings</h3>
              <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                <div>
                  <label className="text-xs text-gray-500">Name</label>
                  <input
                    value={selectedContainer.name}
                    onChange={(e) =>
                      updateContainer(selected, { name: e.target.value })
                    }
                    className="border rounded p-1 text-sm w-full"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500">Columns</label>
                  <select
                    value={
                      selectedContainer.classes.match(/grid-cols-(\d+)/)?.[1] || "3"
                    }
                    onChange={(e) =>
                      updateContainer(selected, {
                        classes: selectedContainer.classes.replace(
                          /\bgrid-cols-\d+\b/,
                          `grid-cols-${e.target.value}`
                        ),
                      })
                    }
                    className="border rounded p-1 w-full"
                  >
                    {[1, 2, 3, 4, 5, 6].map((n) => (
                      <option key={n} value={n}>
                        {n} cols
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Gap</label>
                  <input
                    type="range"
                    min={1}
                    max={10}
                    value={selectedContainer.classes.match(/gap-(\d+)/)?.[1] || "4"}
                    onChange={(e) =>
                      updateContainer(selected, {
                        classes: selectedContainer.classes.replace(
                          /\bgap-\d+\b/,
                          `gap-${e.target.value}`
                        ),
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              <h4 className="text-xs font-semibold text-gray-600 mb-2 uppercase">
                Slot Settings
              </h4>
              <div className="grid grid-cols-3 gap-4 text-sm">
                <div>
                  <label className="text-xs text-gray-500">Count</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={selectedContainer.slotCount}
                    onChange={(e) =>
                      updateContainer(selected, {
                        slotCount: Number(e.target.value),
                      })
                    }
                    className="border rounded p-1 text-sm w-full"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500">Height</label>
                  <select
                    value={selectedContainer.slotHeight.replace("h-", "")}
                    onChange={(e) =>
                      updateContainer(selected, {
                        slotHeight: `h-${e.target.value}`,
                      })
                    }
                    className="border rounded p-1 text-sm w-full"
                  >
                    {["32", "48", "64", "80", "96", "auto"].map((h) => (
                      <option key={h} value={h}>
                        h-{h}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-xs text-gray-500">Margin</label>
                  <input
                    type="range"
                    min={0}
                    max={12}
                    value={
                      selectedContainer.slotMargin.match(/m-(\d+)/)?.[1] || "2"
                    }
                    onChange={(e) =>
                      updateContainer(selected, {
                        slotMargin: `m-${e.target.value}`,
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
