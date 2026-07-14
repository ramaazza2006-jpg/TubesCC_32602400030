import MaterialCard from "./MaterialCard";

export default function MaterialTable({
  materials,
  deleteMaterial,
}) {

  if (materials.length === 0) {
    return (
      <div className="bg-white rounded-2xl border p-10 text-center shadow-sm">
        <h2 className="text-xl font-semibold text-slate-500">
          Belum ada file.
        </h2>

        <p className="text-slate-400 mt-2">
          Upload file pertama kamu.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      {materials.map((material) => (

        <MaterialCard
          key={material.id}
          material={material}
          deleteMaterial={deleteMaterial}
        />

      ))}

    </div>
  );
}