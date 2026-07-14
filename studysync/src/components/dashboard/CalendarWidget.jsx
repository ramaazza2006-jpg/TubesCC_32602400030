import { useState } from "react";
import Calendar from "react-calendar";
import { format } from "date-fns";
import "react-calendar/dist/Calendar.css";
import "../../styles/calendar.css";

export default function CalendarWidget() {
  const [date, setDate] = useState(new Date());

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">

      <div className="mb-5">

        <h2 className="text-xl font-bold">
          Kalender
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          {format(date, "EEEE, dd MMMM yyyy")}
        </p>

      </div>

      <Calendar
        onChange={setDate}
        value={date}
        className="study-calendar"
      />

    </div>
  );
}