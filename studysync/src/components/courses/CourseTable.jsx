export default function CourseTable({
  courses,
  deleteCourse,
  setEditCourse,
  setIsOpen,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

      <table className="w-full">

        <thead className="bg-slate-100">

          <tr>

            <th className="p-4 text-left">Kode</th>

            <th className="p-4 text-left">Mata Kuliah</th>

            <th className="p-4 text-left">Dosen</th>

            <th className="p-4 text-left">SKS</th>

            <th className="p-4 text-left">Semester</th>

            <th className="p-4 text-left">Aksi</th>

          </tr>

        </thead>

        <tbody>

          {courses.map((course) => (

            <tr
              key={course.id}
              className="border-t hover:bg-slate-50"
            >

              <td className="p-4">{course.code}</td>

              <td className="p-4">{course.name}</td>

              <td className="p-4">{course.lecturer}</td>

              <td className="p-4">{course.sks}</td>

              <td className="p-4">{course.semester}</td>

              <td className="p-4">

                <div className="flex gap-2">

                  <button
                    onClick={() => {
                      setEditCourse(course);
                      setIsOpen(true);
                    }}
                    className="bg-blue-600 text-white rounded-lg px-3 py-1"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteCourse(course.id)}
                    className="bg-red-500 text-white rounded-lg px-3 py-1"
                  >
                    Hapus
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}