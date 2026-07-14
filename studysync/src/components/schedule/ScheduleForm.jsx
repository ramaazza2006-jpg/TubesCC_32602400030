import { useEffect, useState } from "react";


const emptyData = {

  id:null,

  day:"Senin",

  course:"",

  lecturer:"",

  room:"",

  start:"",

  end:"",

};



export default function ScheduleForm({

  addSchedule,

  editSchedule,

  updateSchedule,

  closeModal,

}) {


const [form,setForm]=useState(emptyData);



useEffect(()=>{


if(editSchedule){

setForm(editSchedule);


}else{


setForm(emptyData);


}


},[editSchedule]);





function handleChange(e){


setForm({

...form,

[e.target.name]:e.target.value

});


}





function handleSubmit(e){


e.preventDefault();



if(

!form.course ||

!form.lecturer ||

!form.room ||

!form.start ||

!form.end

){


alert("Lengkapi semua data jadwal");

return;


}





if(editSchedule){


updateSchedule(form);


}else{


addSchedule({

...form,

id:Date.now()

});


}



setForm(emptyData);



if(closeModal){

closeModal();

}


}






return (

<form

onSubmit={handleSubmit}

className="
bg-white
space-y-5
"

>


<h2 className="
text-3xl
font-bold
text-slate-800
">

{

editSchedule

?

"Edit Jadwal"

:

"Tambah Jadwal"

}


</h2>





{/* Mata Kuliah */}

<input

name="course"

placeholder="Nama Mata Kuliah"

value={form.course}

onChange={handleChange}

className="
w-full
border
border-slate-300
rounded-xl
p-3
bg-white
outline-none
focus:ring-2
focus:ring-blue-500
"

/>






{/* Hari */}


<select

name="day"

value={form.day}

onChange={handleChange}

className="
w-full
border
border-slate-300
rounded-xl
p-3
bg-white
"

>


<option>Senin</option>

<option>Selasa</option>

<option>Rabu</option>

<option>Kamis</option>

<option>Jumat</option>

<option>Sabtu</option>

<option>Minggu</option>


</select>







{/* Jam */}


<div className="
grid
grid-cols-2
gap-4
">


<input

name="start"

type="time"

value={form.start}

onChange={handleChange}

className="
border
border-slate-300
rounded-xl
p-3
bg-white
"

/>



<input

name="end"

type="time"

value={form.end}

onChange={handleChange}

className="
border
border-slate-300
rounded-xl
p-3
bg-white
"

/>


</div>







{/* Dosen */}


<input

name="lecturer"

placeholder="Nama Dosen"

value={form.lecturer}

onChange={handleChange}

className="
w-full
border
border-slate-300
rounded-xl
p-3
bg-white
"

/>







{/* Ruangan */}


<input

name="room"

placeholder="Ruangan"

value={form.room}

onChange={handleChange}

className="
w-full
border
border-slate-300
rounded-xl
p-3
bg-white
"

/>








<div className="
flex
justify-end
gap-3
pt-3
">



<button

type="button"

onClick={closeModal}

className="
px-5
py-3
rounded-xl
bg-slate-200
hover:bg-slate-300
"

>

Batal

</button>





<button

type="submit"

className="
px-5
py-3
rounded-xl
bg-blue-600
hover:bg-blue-700
text-white
"

>


{

editSchedule

?

"Update Jadwal"

:

"Simpan Jadwal"

}


</button>



</div>






</form>


);


}