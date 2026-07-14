import { useEffect, useState } from "react";
import * as scheduleService from "../../services/scheduleService";


export default function TodaySchedule(){

const [todaySchedule,setTodaySchedule] = useState([]);



useEffect(()=>{


scheduleService
  .list()
  .then((schedules) => {

const days = [
"Senin",
"Selasa",
"Rabu",
"Kamis",
"Jumat",
"Sabtu",
"Minggu"
];



const today = new Date().getDay();


const todayName =
today === 0
? "Minggu"
: days[today-1];



const result = schedules.filter(
(item)=>item.day === todayName
);



setTodaySchedule(result);

  })
  .catch(() => setTodaySchedule([]));



},[]);



return(

<div className="
bg-white
rounded-3xl
shadow-sm
border
p-6
">


<h2 className="
text-2xl
font-bold
mb-5
">

Jadwal Hari Ini

</h2>



{

todaySchedule.length === 0 ? (


<p className="
text-slate-400
">

Tidak ada jadwal hari ini

</p>


):(


<div className="space-y-4">


{
todaySchedule.map((item)=>(


<div

key={item.id}

className="
border
rounded-2xl
p-4
bg-slate-50
"


>


<div className="
flex
justify-between
">


<h3 className="
font-bold
text-lg
">

{item.course}

</h3>


<span className="
text-blue-600
font-semibold
">

{item.start} - {item.end}

</span>


</div>



<p className="
text-slate-500
">

{item.lecturer}

</p>


<p className="
text-sm
text-slate-400
">

Ruangan : {item.room}

</p>


</div>


))

}


</div>


)

}



</div>


)


}