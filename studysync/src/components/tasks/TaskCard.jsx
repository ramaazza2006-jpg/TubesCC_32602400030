export default function TaskCard({
  task,
  deleteTask,
  setEditTask,
  setIsOpen,
  toggleTask,
}) {

  function badge(priority) {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-700";

      case "Medium":
        return "bg-yellow-100 text-yellow-700";

      default:
        return "bg-green-100 text-green-700";
    }
  }

  function deadlineInfo(deadline) {

    const today = new Date();
    today.setHours(0,0,0,0);

    const end = new Date(deadline);
    end.setHours(0,0,0,0);

    const diff = Math.ceil(
      (end - today) / (1000 * 60 * 60 * 24)
    );

    if (diff < 0)
      return {
        text: `⚠️ Terlambat ${Math.abs(diff)} hari`,
        color: "bg-red-100 text-red-700",
      };

    if (diff === 0)
      return {
        text: "🔴 Hari Ini",
        color: "bg-red-100 text-red-700",
      };

    if (diff === 1)
      return {
        text: "🟠 Besok",
        color: "bg-orange-100 text-orange-700",
      };

    if (diff <= 3)
      return {
        text: `🟠 ${diff} Hari Lagi`,
        color: "bg-orange-100 text-orange-700",
      };

    if (diff <= 7)
      return {
        text: `🔵 ${diff} Hari Lagi`,
        color: "bg-blue-100 text-blue-700",
      };

    return {
      text: `🟢 ${diff} Hari Lagi`,
      color: "bg-green-100 text-green-700",
    };

  }

  const info = deadlineInfo(task.deadline);

  const tanggal = new Date(task.deadline).toLocaleDateString(
    "id-ID",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  return (

<div className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-lg transition">

<div className="flex justify-between items-start">

<div className="flex gap-3">

<input
type="checkbox"
checked={task.completed}
onChange={() => toggleTask(task.id)}
className="mt-1 w-5 h-5 accent-green-600"
/>

<div>

<h2
className={`font-bold text-xl ${
task.completed
? "line-through text-slate-400"
: ""
}`}
>

{task.title}

</h2>

<p className="text-slate-500">

{task.course}

</p>

</div>

</div>

<span
className={`px-3 py-1 rounded-full text-sm font-semibold ${badge(task.priority)}`}
>

{task.priority}

</span>

</div>

<div className="mt-6">

<span
className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${info.color}`}
>

{info.text}

</span>

</div>

<div className="mt-4">

<p className="text-sm text-slate-500">

Deadline

</p>

<p className="font-semibold">

📅 {tanggal}

</p>

</div>

<div className="mt-5">

<span
className={`px-3 py-1 rounded-full text-sm font-semibold ${
task.completed
? "bg-green-100 text-green-700"
: "bg-yellow-100 text-yellow-700"
}`}
>

{task.completed
? "✅ Selesai"
: "🕒 Belum Selesai"}

</span>

</div>

<div className="flex gap-3 mt-6">

<button
onClick={()=>{
setEditTask(task);
setIsOpen(true);
}}
className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl transition"
>

Edit

</button>

<button
onClick={()=>deleteTask(task.id)}
className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-xl transition"
>

Delete

</button>

</div>

</div>

  );

}