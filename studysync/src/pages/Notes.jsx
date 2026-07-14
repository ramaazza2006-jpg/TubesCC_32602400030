import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import * as noteService from "../services/noteService";

import NoteSearch from "../components/notes/NoteSearch";
import NoteGrid from "../components/notes/NoteGrid";
import NoteModal from "../components/notes/NoteModal";
import NoteForm from "../components/notes/NoteForm";

export default function Notes() {

  const [notes, setNotes] = useState([]);

  const [search, setSearch] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const [editNote, setEditNote] = useState(null);

  useEffect(() => {
    noteService
      .list()
      .then(setNotes)
      .catch(() => toast.error("Gagal memuat catatan."));
  }, []);

  async function addNote(note) {
    const { id, ...payload } = note;
    try {
      const created = await noteService.create(payload);
      setNotes((prev) => [...prev, created]);
    } catch {
      toast.error("Gagal menambah catatan.");
    }
  }

  async function deleteNote(id) {
    try {
      await noteService.remove(id);
      setNotes((prev) => prev.filter((item) => item.id !== id));
    } catch {
      toast.error("Gagal menghapus catatan.");
    }
  }

  async function updateNote(note) {
    try {
      const saved = await noteService.update(note.id, note);
      setNotes((prev) =>
        prev.map((item) => (item.id === saved.id ? saved : item))
      );
    } catch {
      toast.error("Gagal memperbarui catatan.");
    } finally {
      setEditNote(null);
    }
  }

  const filteredNotes = notes.filter((note) =>
    note.title
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div className="space-y-6">

      <div className="flex justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            Notes
          </h1>

          <p className="text-slate-500 mt-2">
            Kelola seluruh catatan kuliahmu.
          </p>

        </div>

        <button
          onClick={() => {

            setEditNote(null);

            setIsOpen(true);

          }}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow"
        >
          + Tambah Catatan
        </button>

      </div>

      <NoteSearch
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <NoteGrid
        notes={filteredNotes}
        deleteNote={deleteNote}
        setEditNote={setEditNote}
        setIsOpen={setIsOpen}
      />

      <NoteModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >

        <NoteForm
          addNote={(note) => {

            addNote(note);

            setIsOpen(false);

          }}
          editNote={editNote}
          updateNote={(note) => {

            updateNote(note);

            setIsOpen(false);

          }}
        />

      </NoteModal>

    </div>

  );

}
