import DayCard from "../components/schedule/DayCard";
import ScheduleModal from "../components/schedule/ScheduleModal";
import ScheduleForm from "../components/schedule/ScheduleForm";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import * as scheduleService from "../services/scheduleService";


export default function Schedule() {



  const [isOpen, setIsOpen] = useState(false);

  const [editSchedule, setEditSchedule] = useState(null);


  const [schedules, setSchedules] = useState([]);


useEffect(() => {

  scheduleService
    .list()
    .then(setSchedules)
    .catch(() => toast.error("Gagal memuat jadwal."));

}, []);



  const days = [

    {
      name:"Senin",
      color:"bg-orange-100"
    },

    {
      name:"Selasa",
      color:"bg-green-100"
    },

    {
      name:"Rabu",
      color:"bg-blue-100"
    },

    {
      name:"Kamis",
      color:"bg-purple-100"
    },

    {
      name:"Jumat",
      color:"bg-pink-100"
    },

    {
      name:"Sabtu",
      color:"bg-yellow-100"
    },

    {
      name:"Minggu",
      color:"bg-slate-100"
    }

  ];



  async function addSchedule(schedule){

    const { id, ...payload } = schedule;

    try {
      const created = await scheduleService.create(payload);
      setSchedules((prev)=>[...prev, created]);
    } catch {
      toast.error("Gagal menambah jadwal.");
    }

  }



  async function deleteSchedule(id){

    try {
      await scheduleService.remove(id);
      setSchedules((prev)=>
        prev.filter(
          item=>item.id !== id
        )
      );
    } catch {
      toast.error("Gagal menghapus jadwal.");
    }

  }



  async function updateSchedule(schedule){

    try {
      const saved = await scheduleService.update(schedule.id, schedule);

      setSchedules((prev)=>

        prev.map(item=>

          item.id === saved.id
          ? saved
          : item

        )

      );
    } catch {
      toast.error("Gagal memperbarui jadwal.");
    } finally {
      setEditSchedule(null);
    }

  }



return (

<div className="space-y-8">


{/* HEADER */}

<div className="flex justify-between items-center">


<div>

<h1 className="text-4xl font-bold">
Weekly Schedule
</h1>


<p className="text-slate-500 mt-2">
Kelola jadwal kuliah mingguan
</p>


</div>



<button

onClick={()=>{

setEditSchedule(null);

setIsOpen(true);

}}

className="
bg-blue-600
hover:bg-blue-700
text-white
px-5
py-3
rounded-xl
shadow
"

>

+ Tambah Jadwal

</button>


</div>




{/* GRID HARI */}


<div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">


{

days.map((day)=>(


<DayCard

key={day.name}

title={day.name}

color={day.color}

items={

schedules.filter(

(item)=>
item.day === day.name

)

}

deleteSchedule={deleteSchedule}

setEditSchedule={setEditSchedule}

setIsOpen={setIsOpen}


/>


))


}


</div>




{/* MODAL */}


<ScheduleModal

isOpen={isOpen}

onClose={()=>setIsOpen(false)}

>


<ScheduleForm

addSchedule={(schedule)=>{
addSchedule(schedule);
setIsOpen(false);
}}

editSchedule={editSchedule}

updateSchedule={(schedule)=>{
updateSchedule(schedule);
setIsOpen(false);
}}

closeModal={()=>setIsOpen(false)}

/>


</ScheduleModal>



</div>


);


}
