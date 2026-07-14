export default function MaterialSearch({
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      placeholder="Cari file..."
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}