import { useNavigate } from "react-router-dom";

export default function NoteCard({

note,

deleteNote,

}){

const navigate=useNavigate();

return(

<div

onClick={()=>navigate(`/notes/${note.id}`)}

className="bg-white rounded-2xl shadow border p-6 cursor-pointer hover:shadow-xl transition"

>

<h2 className="text-xl font-bold">

{note.title}

</h2>

<p className="text-blue-600 mt-2">

{note.course}

</p>

<p className="text-sm text-slate-500 mt-6">

Terakhir diubah

</p>

<p>

{note.updatedAt}

</p>

<button

onClick={(e)=>{

e.stopPropagation();

deleteNote(note.id);

}}

className="mt-5 bg-red-600 text-white px-4 py-2 rounded-xl"

>

Delete

</button>

</div>

);

}