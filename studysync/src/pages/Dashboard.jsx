import { useEffect, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  CheckSquare,
  HardDrive,
} from "lucide-react";

import StatCard from "../components/cards/StatCard";

import QuickAction from "../components/dashboard/QuickAction";
import DeadlineCard from "../components/dashboard/DeadlineCard";
import ActivityCard from "../components/dashboard/ActivityCard";
import ProgressChart from "../components/dashboard/ProgressChart";
import CalendarWidget from "../components/dashboard/CalendarWidget";
import TodaySchedule from "../components/dashboard/TodaySchedule";

import { useAuth } from "../context/AuthContext";
import * as courseService from "../services/courseService";
import * as taskService from "../services/taskService";
import * as scheduleService from "../services/scheduleService";
import * as materialService from "../services/materialService";

export default function Dashboard() {

  const { user } = useAuth();

  const [stats, setStats] = useState({
    courses: 0,
    todaySchedule: 0,
    activeTasks: 0,
    materials: 0,
  });

  useEffect(() => {
    Promise.all([
      courseService.list().catch(() => []),
      taskService.list().catch(() => []),
      scheduleService.list().catch(() => []),
      materialService.list().catch(() => []),
    ]).then(([courses, tasks, schedules, materials]) => {

      const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const todayName = days[new Date().getDay()];

      setStats({
        courses: courses.length,
        todaySchedule: schedules.filter((s) => s.day === todayName).length,
        activeTasks: tasks.filter((t) => !t.completed).length,
        materials: materials.length,
      });
    });
  }, []);

  const hour = new Date().getHours();
  const greeting =
    hour < 11 ? "Good Morning" : hour < 15 ? "Good Afternoon" : "Good Evening";

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold">
          {greeting}, {user?.name?.split(" ")[0] || "Sahabat"} 👋
        </h1>

        <p className="text-slate-500 mt-2">
          Kelola semua aktivitas kuliahmu di satu tempat.
        </p>
      </div>

      {/* Statistik */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">

        <StatCard
          title="Mata Kuliah"
          value={String(stats.courses)}
          color="bg-blue-100 text-blue-600"
          icon={<BookOpen />}
        />

        <StatCard
          title="Jadwal Hari Ini"
          value={String(stats.todaySchedule)}
          color="bg-green-100 text-green-600"
          icon={<CalendarDays />}
        />

        <StatCard
          title="Tugas Aktif"
          value={String(stats.activeTasks)}
          color="bg-orange-100 text-orange-600"
          icon={<CheckSquare />}
        />

        <StatCard
          title="Materi"
          value={String(stats.materials)}
          color="bg-purple-100 text-purple-600"
          icon={<HardDrive />}
        />

      </div>

      {/* Quick Action */}
      <QuickAction />

    

      {/* Grafik dan Kalender */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <ProgressChart />

        <CalendarWidget />

      </div>

      {/* Jadwal dan Deadline */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <TodaySchedule />

        <DeadlineCard />

      </div>

      {/* Aktivitas */}
      <ActivityCard />

    </div>
  );
}
