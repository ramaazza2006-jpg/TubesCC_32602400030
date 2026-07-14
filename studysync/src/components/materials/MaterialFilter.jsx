export default function MaterialFilter({
  value,
  onChange,
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="rounded-xl border p-3 bg-white"
    >
      <option value="Semua">Semua Mata Kuliah</option>
      <option>Pemrograman Web</option>
      <option>Cloud Computing</option>
      <option>Basis Data</option>
      <option>Mobile Programming</option>
    </select>
  );
}