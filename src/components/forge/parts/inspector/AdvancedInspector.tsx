export default function AdvancedInspector({ node }: { node: any }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
        Advanced
      </h3>
      <textarea
        className="w-full h-32 border rounded p-1 text-xs font-mono"
        defaultValue={node.raw || "<div>...</div>"}
      />
    </div>
  );
}
