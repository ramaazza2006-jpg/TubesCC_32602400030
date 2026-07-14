import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CourseForm({
  addCourse,
  editCourse,
  updateCourse,
  onClose,
}) {
  const emptyForm = {
    id: "",
    code: "",
    name: "",
    lecturer: "",
    sks: "",
    semester: "",
  };

  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editCourse) {
      setForm(editCourse);
    } else {
      setForm(emptyForm);
    }
  }, [editCourse]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (
      !form.code ||
      !form.name ||
      !form.lecturer ||
      !form.sks ||
      !form.semester
    ) {
      toast.error("Semua data harus diisi");
      return;
    }

    if (editCourse) {
      updateCourse(form);
      toast.success("Mata kuliah berhasil diperbarui");
    } else {
      addCourse({
        ...form,
        id: Date.now(),
      });

      toast.success("Mata kuliah berhasil ditambahkan");
    }

    setForm(emptyForm);

    if (onClose) onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <h2 className="text-2xl font-bold">
        {editCourse ? "Edit Mata Kuliah" : "Tambah Mata Kuliah"}
      </h2>

      <input
        name="code"
        placeholder="Kode"
        value={form.code}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="name"
        placeholder="Nama Mata Kuliah"
        value={form.name}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        name="lecturer"
        placeholder="Nama Dosen"
        value={form.lecturer}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        name="sks"
        placeholder="SKS"
        value={form.sks}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <input
        type="number"
        name="semester"
        placeholder="Semester"
        value={form.semester}
        onChange={handleChange}
        className="w-full border rounded-lg p-3"
      />

      <div className="flex justify-end gap-3">

        <button
          type="button"
          onClick={onClose}
          className="px-5 py-2 rounded-lg bg-gray-300"
        >
          Batal
        </button>

        <button
          type="submit"
          className="px-5 py-2 rounded-lg bg-blue-600 text-white"
        >
          {editCourse ? "Update" : "Simpan"}
        </button>

      </div>

    </form>
  );
}