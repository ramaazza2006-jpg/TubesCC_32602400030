import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import * as noteService from "../services/noteService";

export default function NoteEditor() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [note, setNote] = useState(null);

  useEffect(() => {

    noteService
      .list()
      .then((notes) => {
        const selected = notes.find((item) => item.id === Number(id));
        if (!selected) {
          navigate("/notes");
          return;
        }
        setNote(selected);
      })
      .catch(() => {
        toast.error("Gagal memuat catatan.");
        navigate("/notes");
      });

  }, [id, navigate]);

  function updateContent(value) {

    setNote((prev) => ({ ...prev, content: value }));

    // Debounced-ish: save straight away, the textarea already batches
    // fast keystrokes into React state updates.
    noteService
      .update(Number(id), { content: value })
      .catch(() => toast.error("Gagal menyimpan catatan."));

  }

  async function deleteNote() {

    if (!window.confirm("Yakin ingin menghapus catatan?"))
      return;

    try {
      await noteService.remove(note.id);
      navigate("/notes");
    } catch {
      toast.error("Gagal menghapus catatan.");
    }

  }

  if (!note) return null;

  return (

    <div className="min-h-screen bg-slate-100 py-10">

      <div className="max-w-5xl mx-auto px-6">

        {/* Header */}

        <div className="flex justify-between items-center mb-8">

          <button
            onClick={() => navigate("/notes")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft size={20} />
            Kembali
          </button>

          <button
            onClick={deleteNote}
            className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-2 rounded-xl flex items-center gap-2"
          >
            <Trash2 size={18} />
            Hapus
          </button>

        </div>

        {/* Judul */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold">

            {note.title}

          </h1>

          <p className="text-blue-600 mt-2 text-lg">

            {note.course}

          </p>

        </div>

        {/* Kertas */}

        <div
          className="
            bg-white
            rounded-3xl
            shadow-2xl
            border
            overflow-hidden
          "
        >

          <textarea

            value={note.content}

            onChange={(e)=>
              updateContent(e.target.value)
            }

            placeholder="Mulai menulis catatan..."

            className="
              w-full
              min-h-[80vh]
              resize-none
              border-0
              outline-none
              p-12
              text-lg
              leading-10
              bg-transparent
              font-serif
            "

            style={{

              backgroundImage:
                "repeating-linear-gradient(to bottom, transparent 0px, transparent 39px, #d1d5db 40px)",

              backgroundAttachment: "local",

            }}

          />

        </div>

      </div>

    </div>

  );

}
