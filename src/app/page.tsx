"use client";

import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function Home() {
  const [code, setCode] = useState(`
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="p-8 bg-white rounded-xl shadow-lg text-center">
      <h1 class="text-3xl font-bold mb-2 text-teal-600">Hello TailForge!</h1>
      <p class="text-gray-600">This is a live Tailwind + Monaco test.</p>
    </div>
  </div>`);

  return (
    <div className="grid grid-cols-2 h-screen">
      {/* 左側：Monaco Editor */}
      <div className="bg-gray-900 text-white">
        <Editor
          height="100%"
          defaultLanguage="html"
          theme="vs-dark"
          value={code}
          onChange={(v) => setCode(v ?? "")}
        />
      </div>

      {/* 右側：Tailwindプレビュー */}
      <iframe
  className="w-full h-full bg-white"
  srcDoc={`<!DOCTYPE html>
  <html>
    <head>
      <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="antialiased">${code}</body>
  </html>`}
  sandbox="allow-scripts"
  title="preview"
/>

    </div>
  );
}
