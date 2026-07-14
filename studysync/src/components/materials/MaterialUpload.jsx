import { useState } from "react";

const emptyData = {
  course: "",
  file: null,
};

export default function MaterialUpload({
  addMaterial,
}) {

  const [form, setForm] = useState(emptyData);

  function handleSubmit(e) {
    e.preventDefault();

    if (!form.file || !form.course) {
      alert("Lengkapi data terlebih dahulu.");
      return;
    }

    addMaterial({
      id: Date.now(),
      name: form.file.name,
      course: form.course,
      size: `${(form.file.size / 1024 / 1024).toFixed(2)} MB`,
      type: form.file.name.split(".").pop().toUpperCase(),
      uploadDate: new Date().toLocaleDateString("id-ID"),
      file: form.file,
    });

    setForm(emptyData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >

      <h2 className="text-2xl font-bold">
        Upload Material
      </h2>

      <select
        className="w-full border rounded-xl p-3 bg-white"
        value={form.course}
        onChange={(e) =>
          setForm({
            ...form,
            course: e.target.value,
          })
        }
      >
        <option value="">Pilih Mata Kuliah</option>
        <option>Pemrograman Web</option>
        <option>Cloud Computing</option>
        <option>Basis Data</option>
        <option>Mobile Programming</option>
      </select>

      <input
        type="file"
        className="w-full border rounded-xl p-3"
        onChange={(e) =>
          setForm({
            ...form,
            file: e.target.files[0],
          })
        }
      />

      <button
        className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700"
      >
        Upload
      </button>

    </form>
  );
}