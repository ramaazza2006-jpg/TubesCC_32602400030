const filters = [
  "Semua",
  "High",
  "Medium",
  "Low",
];

export default function TaskFilter({
  active,
  setActive,
}) {
  return (
    <div className="flex gap-3 flex-wrap">

      {filters.map((filter) => (

        <button
          key={filter}
          onClick={() => setActive(filter)}
          className={`px-5 py-2 rounded-xl transition

          ${
            active === filter
              ? "bg-blue-600 text-white"
              : "bg-slate-100 hover:bg-slate-200"
          }
          `}
        >
          {filter}
        </button>

      ))}

    </div>
  );
}