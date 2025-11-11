export default function InspectorTabs({
  current,
  onChange,
}: {
  current: string;
  onChange: (tab: "style" | "layout" | "content" | "advanced") => void;
}) {
  const tabs = ["style", "layout", "content", "advanced"] as const;

  return (
    <div className="flex border-b border-gray-200 bg-white text-xs font-semibold">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          className={`flex-1 py-2 capitalize ${
            t === current
              ? "text-teal-600 border-b-2 border-teal-600"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          {t}
        </button>
      ))}
    </div>
  );
}
