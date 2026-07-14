import {
  PlusCircle,
  BookOpen,
  CalendarPlus,
  Upload,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function QuickAction() {
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      title: "Tambah Tugas",
      description: "Buat tugas baru",
      icon: <PlusCircle size={30} />,
      color: "bg-blue-100 text-blue-600",
      path: "/tasks",
    },
    {
      id: 2,
      title: "Mata Kuliah",
      description: "Kelola mata kuliah",
      icon: <BookOpen size={30} />,
      color: "bg-green-100 text-green-600",
      path: "/courses",
    },
    {
      id: 3,
      title: "Tambah Jadwal",
      description: "Atur jadwal kuliah",
      icon: <CalendarPlus size={30} />,
      color: "bg-orange-100 text-orange-600",
      path: "/schedule",
    },
    {
      id: 4,
      title: "Upload Materi",
      description: "Upload file ke Amazon S3",
      icon: <Upload size={30} />,
      color: "bg-purple-100 text-purple-600",
      path: "/materials",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="flex items-center justify-between mb-6">

        <div>
          <h2 className="text-2xl font-bold">
            Quick Action
          </h2>

          <p className="text-slate-500 text-sm">
            Akses cepat ke fitur utama StudySync
          </p>
        </div>

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">

        {actions.map((action) => (

          <button
            key={action.id}
            onClick={() => navigate(action.path)}
            className="group bg-slate-50 hover:bg-white border rounded-2xl p-6 text-left transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >

            <div
              className={`w-14 h-14 rounded-xl flex items-center justify-center ${action.color}`}
            >
              {action.icon}
            </div>

            <h3 className="font-bold text-lg mt-5 group-hover:text-blue-600 transition">
              {action.title}
            </h3>

            <p className="text-sm text-slate-500 mt-2">
              {action.description}
            </p>

          </button>

        ))}

      </div>

    </div>
  );
}