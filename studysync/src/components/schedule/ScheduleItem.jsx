import {
  Clock3,
  MapPin,
  User,
  Pencil,
  Trash2,
} from "lucide-react";


export default function ScheduleItem({
  schedule,
  deleteSchedule,
  setEditSchedule,
  setIsOpen,
}) {


return (

<div className="bg-white rounded-xl shadow-sm border p-4 hover:shadow-lg transition">


<h3 className="font-bold text-lg">
{schedule.course}
</h3>


<div className="mt-3 text-sm text-slate-600 space-y-2">


<p className="flex gap-2">
<Clock3 size={16}/>
{schedule.start} - {schedule.end}
</p>


<p className="flex gap-2">
<User size={16}/>
{schedule.lecturer}
</p>


<p className="flex gap-2">
<MapPin size={16}/>
{schedule.room}
</p>


</div>



<div className="flex gap-2 mt-5">


<button

onClick={()=>{
setEditSchedule(schedule);
setIsOpen(true);
}}

className="flex-1 bg-blue-600 text-white py-2 rounded-lg flex justify-center gap-2"

>

<Pencil size={15}/>
Edit

</button>



<button

onClick={()=>deleteSchedule(schedule.id)}

className="flex-1 bg-red-600 text-white py-2 rounded-lg flex justify-center gap-2"

>

<Trash2 size={15}/>
Hapus

</button>


</div>


</div>

)

}