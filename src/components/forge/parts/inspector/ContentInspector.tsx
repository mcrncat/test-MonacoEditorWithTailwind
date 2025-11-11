export default function ContentInspector({ node }: { node: any }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
        Content
      </h3>
      <input
        type="text"
        defaultValue={node.text || ""}
        className="w-full border rounded p-1 text-sm"
      />
      <p className="text-xs text-gray-400 mt-2">
        （※ テキスト編集機能は後でMonaco連携）
      </p>
    </div>
  );
}
