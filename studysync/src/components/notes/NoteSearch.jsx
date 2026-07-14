export default function NoteSearch({
  value,
  onChange,
}) {
  return (
    <input
      type="text"
      placeholder="Cari catatan..."
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border p-3 bg-white shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
    />
  );
}