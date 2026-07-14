import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import * as courseService from "../services/courseService";

import SearchCourse from "../components/courses/SearchCourse";
import CourseTable from "../components/courses/CourseTable";
import CourseModal from "../components/courses/CourseModal";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [editCourse, setEditCourse] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    courseService
      .list()
      .then(setCourses)
      .catch(() => toast.error("Gagal memuat mata kuliah."));
  }, []);

  // Tambah Mata Kuliah
  async function addCourse(course) {
    const { id, ...payload } = course;
    try {
      const created = await courseService.create(payload);
      setCourses((prev) => [...prev, created]);
    } catch {
      toast.error("Gagal menambah mata kuliah.");
    }
  }

  // Hapus Mata Kuliah
  async function deleteCourse(id) {
    try {
      await courseService.remove(id);
      setCourses((prev) => prev.filter((course) => course.id !== id));
    } catch {
      toast.error("Gagal menghapus mata kuliah.");
    }
  }

  // Update Mata Kuliah
  async function updateCourse(updatedCourse) {
    try {
      const saved = await courseService.update(updatedCourse.id, updatedCourse);
      setCourses((prev) =>
        prev.map((course) => (course.id === saved.id ? saved : course))
      );
    } catch {
      toast.error("Gagal memperbarui mata kuliah.");
    } finally {
      setEditCourse(null);
    }
  }

  // Filter Search
  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">

        <div>
          <h1 className="text-4xl font-bold">
            Mata Kuliah
          </h1>

          <p className="text-slate-500">
            Kelola seluruh mata kuliah
          </p>
        </div>

        <button
          onClick={() => {
            setEditCourse(null);
            setIsOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
        >
          + Tambah Mata Kuliah
        </button>

      </div>

      {/* Search */}
      <SearchCourse
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <CourseTable
        courses={filteredCourses}
        deleteCourse={deleteCourse}
        setEditCourse={setEditCourse}
        setIsOpen={setIsOpen}
      />

      {/* Modal */}
      <CourseModal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setEditCourse(null);
        }}
        addCourse={(course) => {
          addCourse(course);
          setIsOpen(false);
        }}
        editCourse={editCourse}
        updateCourse={(course) => {
          updateCourse(course);
          setIsOpen(false);
        }}
      />

    </div>
  );
}
