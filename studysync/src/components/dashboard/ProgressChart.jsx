import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { weeklyActivity } from "../../data/dashboard";

const data = weeklyActivity;

export default function ProgressChart() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="flex justify-between items-center mb-6">

        <div>

          <h2 className="text-xl font-bold">
            Aktivitas Mingguan
          </h2>

          <p className="text-sm text-slate-500">
            Jumlah tugas yang dikerjakan
          </p>

        </div>

      </div>

      <ResponsiveContainer width="100%" height={300}>

        <AreaChart data={data}>

          <defs>

            <linearGradient id="colorTask" x1="0" y1="0" x2="0" y2="1">

              <stop offset="5%" stopColor="#2563EB" stopOpacity={0.8} />

              <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />

            </linearGradient>

          </defs>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />

          <YAxis />

          <Tooltip />

          <Area
            type="monotone"
            dataKey="task"
            stroke="#2563EB"
            fillOpacity={1}
            fill="url(#colorTask)"
          />

        </AreaChart>

      </ResponsiveContainer>

    </div>
  );
}