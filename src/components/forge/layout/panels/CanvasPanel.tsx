"use client";
import { useState, useRef, useEffect } from "react";
import Editor from "@monaco-editor/react";
import { useForgeStore } from "@/lib/store/forgeStore";

export default function CanvasPanel() {
  const [code, setCode] = useState(`<div class="min-h-screen flex flex-col items-center justify-center bg-gray-50">
  <div class="p-8 bg-white rounded-xl shadow-md text-center">
    <h1 class="text-3xl font-bold text-teal-600">Hello TailForge!</h1>
    <p class="text-gray-500 mt-2">ノーコードForge・プレビュー</p>
  </div>
</div>`);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { setEditor } = useForgeStore();

  const handleEditorMount = (editor: any) => setEditor(editor);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const timer = setTimeout(() => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      console.log("Rendering preview:", code.slice(0, 80));

      const html = `<!DOCTYPE html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <script src="https://cdn.tailwindcss.com"></script>
    <title>TailForge Preview</title>
    <style>body{margin:0;}</style>
  </head>
  <body>${code}</body>
</html>`;
      doc.open();
      doc.write(html);
      doc.close();
    }, 50);
    return () => clearTimeout(timer);
  }, [code]);

  return (
    <div className="relative flex-1 h-full bg-gray-100">
      {/* Monaco Editor (hidden) */}
      <div className="hidden">
        <Editor
          height="100%"
          defaultLanguage="html"
          theme="vs-dark"
          value={code}
          onChange={(v) => setCode(v ?? "")}
          onMount={handleEditorMount}
        />
      </div>

      {/* Preview */}
      <iframe
        ref={iframeRef}
        className="absolute inset-0 w-full h-full bg-white"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
}
