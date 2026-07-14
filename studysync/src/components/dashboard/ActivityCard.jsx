import activities from "../../data/activities";

import {
  Upload,
  BookOpen,
  CheckCircle,
  CalendarDays,
} from "lucide-react";

export default function ActivityCard() {

  function getIcon(type) {

    switch (type) {

      case "upload":
        return (
          <div className="bg-purple-100 text-purple-600 p-2 rounded-xl">
            <Upload size={18}/>
          </div>
        );

      case "course":
        return (
          <div className="bg-blue-100 text-blue-600 p-2 rounded-xl">
            <BookOpen size={18}/>
          </div>
        );

      case "task":
        return (
          <div className="bg-green-100 text-green-600 p-2 rounded-xl">
            <CheckCircle size={18}/>
          </div>
        );

      default:
        return (
          <div className="bg-orange-100 text-orange-600 p-2 rounded-xl">
            <CalendarDays size={18}/>
          </div>
        );

    }

  }

  return (

    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <h2 className="text-xl font-bold mb-6">

        Aktivitas Terbaru

      </h2>

      <div className="space-y-5">

        {activities.map((activity)=>(

          <div
            key={activity.id}
            className="flex items-start gap-4 border-b pb-4 last:border-none"
          >

            {getIcon(activity.type)}

            <div>

              <h3 className="font-semibold">

                {activity.title}

              </h3>

              <p className="text-sm text-slate-500">

                {activity.time}

              </p>

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}