import { Search } from "lucide-react";

export default function SearchTask({
  value,
  onChange,
}) {
  return (
    <div className="relative">

      <Search
        size={20}
        className="absolute left-4 top-3.5 text-slate-400"
      />

      <input
        type="text"
        placeholder="Cari tugas..."
        value={value}
        onChange={onChange}
        className="w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
      />

    </div>
  );
}