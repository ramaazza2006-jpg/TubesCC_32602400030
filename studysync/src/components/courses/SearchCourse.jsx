export default function SearchCourse({
    value,
    onChange,
}) {
    return (
        <input
            type="text"
            placeholder="Cari Mata Kuliah..."
            value={value}
            onChange={onChange}
            className="w-full bg-white rounded-xl border p-3"
        />
    );
}