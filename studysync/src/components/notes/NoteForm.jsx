import { useEffect, useState } from "react";
import * as scheduleService from "../../services/scheduleService";

const emptyForm = {
  title: "",
  course: "",
};

export default function NoteForm({
  addNote,
  onClose,
}) {

  const [form, setForm] = useState(emptyForm);

  const [courses, setCourses] = useState([]);

  useEffect(() => {

    scheduleService
      .list()
      .then((schedules) => {
        const uniqueCourses = [
          ...new Set(
            schedules
              .map((item) => item.course)
              .filter(Boolean)
          ),
        ];
        setCourses(uniqueCourses);
      })
      .catch(() => setCourses([]));

  }, []);

  function handleChange(e) {

    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });

  }

  function handleSubmit(e) {

    e.preventDefault();

    if (!form.title || !form.course) {
      alert("Lengkapi semua data.");
      return;
    }

    addNote({
      id: Date.now(),
      title: form.title,
      course: form.course,
      content: "",
      createdAt: new Date().toLocaleString("id-ID"),
      updatedAt: new Date().toLocaleString("id-ID"),
    });

    setForm(emptyForm);

    onClose();

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white p-6 rounded-2xl"
    >

      <h2 className="text-2xl font-bold">

        Tambah Catatan

      </h2>

      {/* Judul */}

      <div>

        <label className="font-medium">

          Judul Catatan

        </label>

        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Contoh: Ringkasan React"
          className="w-full mt-2 border rounded-xl p-3 focus:ring-2 focus:ring-blue-500 outline-none"
        />

      </div>

      {/* Mata Kuliah */}

      <div>

        <label className="font-medium">

          Mata Kuliah

        </label>

        <select
          name="course"
          value={form.course}
          onChange={handleChange}
          className="w-full mt-2 border rounded-xl p-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none"
        >

          <option value="">
            -- Pilih Mata Kuliah --
          </option>

          {courses.map((course) => (

            <option
              key={course}
              value={course}
            >
              {course}
            </option>

          ))}

        </select>

      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition"
      >

        Buat Catatan

      </button>

    </form>

  );

}