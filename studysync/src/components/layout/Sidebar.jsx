import {
  LayoutDashboard,
  BookOpen,
  CalendarDays,
  CheckSquare,
  NotebookPen,
  FolderOpen,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menus = [
  {
    name: "Dashboard",
    path: "/",
    icon: LayoutDashboard,
  },
  {
    name: "Mata Kuliah",
    path: "/courses",
    icon: BookOpen,
  },
  {
    name: "Jadwal",
    path: "/schedule",
    icon: CalendarDays,
  },
  {
    name: "Tugas",
    path: "/tasks",
    icon: CheckSquare,
  },
  {
    name: "Catatan",
    path: "/notes",
    icon: NotebookPen,
  },
  {
    name: "Materi",
    path: "/materials",
    icon: FolderOpen,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: User,
  },
];

export default function Sidebar() {
  return (
    <aside className="h-screen sticky top-0 w-64 bg-white border-r shadow-sm flex flex-col">

      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b shrink-0">

        <h1 className="text-2xl font-bold text-blue-600">
          StudySync
        </h1>

      </div>

      {/* Menu */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">

        {menus.map((menu) => {
          const Icon = menu.icon;

          return (
            <NavLink
              key={menu.path}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow"
                    : "text-slate-600 hover:bg-slate-100"
                }`
              }
            >
              <Icon size={20} />
              <span className="font-medium">
                {menu.name}
              </span>
            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}