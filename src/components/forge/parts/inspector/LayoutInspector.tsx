export default function LayoutInspector({ node }: { node: any }) {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2">
        Layout Controls
      </h3>
      <p className="text-gray-400 text-xs">選択要素: {node.id}</p>
      <button className="mt-2 w-full bg-gray-200 text-gray-700 py-1 rounded">
        Grid化 (未実装)
      </button>
    </div>
  );
}
