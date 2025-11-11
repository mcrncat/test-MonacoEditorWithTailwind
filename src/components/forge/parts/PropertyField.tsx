export function PropertyField({ label, type="select", options, value, onChange }) {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-xs text-gray-500">{label}</label>
      {type === "select" && (
        <select value={value} onChange={e=>onChange(e.target.value)}
          className="p-1 border rounded text-sm">
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      )}
      {type === "color" && (
        <div className="flex gap-1">
          {options.map(o => (
            <button key={o} className={`${o} w-6 h-6 rounded border`}
              onClick={()=>onChange(o)} />
          ))}
        </div>
      )}
    </div>
  );
}
