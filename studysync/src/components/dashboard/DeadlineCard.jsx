import { useEffect, useState } from "react";
import * as taskService from "../../services/taskService";
import {
  CalendarDays,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";

export default function DeadlineCard() {

  const [allTasks, setAllTasks] = useState([]);

  useEffect(() => {
    taskService.list().then(setAllTasks).catch(() => setAllTasks([]));
  }, []);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tasks = [...allTasks]
    .filter((task) => !task.completed && task.deadline)
    .map((task) => {

      const deadline = new Date(task.deadline);
      deadline.setHours(0, 0, 0, 0);

      const diff = Math.floor(
        (deadline - today) / (1000 * 60 * 60 * 24)
      );

      return {
        ...task,
        diff,
      };

    })
    .sort((a, b) => a.diff - b.diff)
    .slice(0, 5);

  function badge(diff) {

    if (diff < 0)
      return {
        text: "Terlambat",
        color: "bg-red-100 text-red-600",
      };

    if (diff === 0)
      return {
        text: "Hari Ini",
        color: "bg-orange-100 text-orange-600",
      };

    if (diff === 1)
      return {
        text: "Besok",
        color: "bg-yellow-100 text-yellow-700",
      };

    return {
      text: `${diff} Hari Lagi`,
      color: "bg-blue-100 text-blue-600",
    };

  }

  function priority(priority) {

    switch (priority) {

      case "High":
        return "bg-red-100 text-red-600";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-600";

    }

  }

  return (

    <div className="bg-white rounded-3xl shadow-sm border p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-2xl font-bold">

            Deadline Tugas

          </h2>

          <p className="text-slate-500 text-sm">

            Deadline terdekat

          </p>

        </div>

        <AlertTriangle className="text-red-500" />

      </div>

      <div className="space-y-4">

        {tasks.length === 0 ? (

          <div className="text-center py-10">

            <CheckCircle2
              size={45}
              className="mx-auto text-green-500"
            />

            <p className="mt-3 text-slate-500">

              Tidak ada deadline.

            </p>

          </div>

        ) : (

          tasks.map((task) => {

            const status = badge(task.diff);

            return (

              <div
                key={task.id}
                className="border rounded-2xl p-4 hover:bg-slate-50 transition"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <h3 className="font-bold text-lg">

                      {task.title}

                    </h3>

                    <p className="text-slate-500 text-sm">

                      {task.course}

                    </p>

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${priority(task.priority)}`}
                  >

                    {task.priority}

                  </span>

                </div>

                <div className="flex justify-between items-center mt-4">

                  <div className="flex items-center gap-2 text-slate-500">

                    <CalendarDays size={16} />

                    {task.deadline}

                  </div>

                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${status.color}`}
                  >

                    {status.text}

                  </span>

                </div>

              </div>

            );

          })

        )}

      </div>

      <button
        className="mt-6 w-full border rounded-xl py-3 hover:bg-slate-100 transition font-medium"
      >

        Lihat Semua Tugas

      </button>

    </div>

  );

}