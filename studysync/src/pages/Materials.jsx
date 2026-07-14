import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import * as materialService from "../services/materialService";

import MaterialSearch from "../components/materials/MaterialSearch";
import MaterialFilter from "../components/materials/MaterialFilter";
import MaterialTable from "../components/materials/MaterialTable";
import MaterialModal from "../components/materials/MaterialModal";
import MaterialUpload from "../components/materials/MaterialUpload";

export default function Materials() {

  const [materials, setMaterials] = useState([]);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("Semua");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    materialService
      .list()
      .then(setMaterials)
      .catch(() => toast.error("Gagal memuat materi."));
  }, []);

  async function addMaterial(material) {
    // MaterialUpload gives us { course, file, ... } — the actual bytes go
    // straight to S3 (via the backend), the row that comes back from the
    // API is the real, saved record.
    try {
      const created = await materialService.upload(material.file, material.course);
      setMaterials((prev) => [...prev, created]);
    } catch {
      toast.error("Gagal mengunggah file.");
    }
  }

  async function deleteMaterial(id) {
    try {
      await materialService.remove(id);
      setMaterials((prev) => prev.filter((item) => item.id !== id));
    } catch {
      toast.error("Gagal menghapus file.");
    }
  }

  const filteredMaterials = materials.filter((item) => {

    const searchMatch =
      item.name.toLowerCase().includes(search.toLowerCase());

    const filterMatch =
      filter === "Semua"
        ? true
        : item.course === filter;

    return searchMatch && filterMatch;

  });

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Materials
          </h1>

          <p className="text-slate-500 mt-2">
            Kelola seluruh file kuliahmu.
          </p>

        </div>

        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow"
        >
          + Upload File
        </button>

      </div>

      {/* Search & Filter */}

      <div className="grid md:grid-cols-2 gap-4">

        <MaterialSearch
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <MaterialFilter
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />

      </div>

      {/* Table */}

      <MaterialTable
        materials={filteredMaterials}
        deleteMaterial={deleteMaterial}
      />

      {/* Upload Modal */}

      <MaterialModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <MaterialUpload
          addMaterial={(material) => {
            addMaterial(material);
            setIsOpen(false);
          }}
        />
      </MaterialModal>

    </div>

  );
}
