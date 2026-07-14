import NoteCard from "./NoteCard";

export default function NoteGrid({
  notes,
  deleteNote,
  setEditNote,
  setIsOpen,
}) {

  if (notes.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow border">
        <h2 className="text-xl font-semibold text-slate-500">
          Belum ada catatan
        </h2>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      {notes.map((note)=>(

        <NoteCard
          key={note.id}
          note={note}
          deleteNote={deleteNote}
          setEditNote={setEditNote}
          setIsOpen={setIsOpen}
        />

      ))}

    </div>
  );
}