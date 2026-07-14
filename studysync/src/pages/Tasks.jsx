import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import * as taskService from "../services/taskService";

import SearchTask from "../components/tasks/SearchTask";
import TaskFilter from "../components/tasks/TaskFilter";
import TaskTable from "../components/tasks/TaskTable";
import TaskModal from "../components/tasks/TaskModal";
import TaskForm from "../components/tasks/TaskForm";

export default function Tasks() {

  const [tasks, setTasks] = useState([]);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("Semua");

  const [isOpen, setIsOpen] = useState(false);

  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    taskService
      .list()
      .then(setTasks)
      .catch(() => toast.error("Gagal memuat tugas."));
  }, []);

  // ===========================
  // CRUD (backed by the API — the database is the source of truth)
  // ===========================

  async function addTask(task) {
    const { id, ...payload } = task; // drop the client-side placeholder id
    try {
      const created = await taskService.create(payload);
      setTasks((prev) => [...prev, created]);
    } catch {
      toast.error("Gagal menambah tugas.");
    }
  }

  async function deleteTask(id) {
    try {
      await taskService.remove(id);
      setTasks((prev) => prev.filter((task) => task.id !== id));
    } catch {
      toast.error("Gagal menghapus tugas.");
    }
  }

  async function updateTask(updatedTask) {
    try {
      const saved = await taskService.update(updatedTask.id, updatedTask);
      setTasks((prev) =>
        prev.map((task) => (task.id === saved.id ? saved : task))
      );
    } catch {
      toast.error("Gagal memperbarui tugas.");
    } finally {
      setEditTask(null);
    }
  }

  // ===========================
  // Checklist
  // ===========================

  async function toggleTask(id) {
    const target = tasks.find((task) => task.id === id);
    if (!target) return;

    const optimistic = { ...target, completed: !target.completed };
    setTasks((prev) => prev.map((task) => (task.id === id ? optimistic : task)));

    try {
      await taskService.update(id, { completed: optimistic.completed });
    } catch {
      toast.error("Gagal memperbarui status tugas.");
      setTasks((prev) => prev.map((task) => (task.id === id ? target : task)));
    }
  }

  // ===========================
  // Search + Filter + Sort
  // ===========================

  const filteredTasks = tasks
    .filter((task) => {

      const searchMatch =
        task.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const filterMatch =
        filter === "Semua"
          ? true
          : task.priority === filter;

      return searchMatch && filterMatch;

    })
    .sort((a, b) => {

      // Belum selesai di atas
      if (a.completed !== b.completed) {
        return a.completed - b.completed;
      }

      // Deadline terdekat di atas
      return (
        new Date(a.deadline) -
        new Date(b.deadline)
      );

    });

  return (

    <div className="space-y-6">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

        <div>

          <h1 className="text-4xl font-bold">

            My Tasks

          </h1>

          <p className="text-slate-500 mt-2">

            Kelola seluruh tugas kuliahmu

          </p>

        </div>

        <button
          onClick={() => {
            setEditTask(null);
            setIsOpen(true);
          }}
          className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-xl shadow"
        >
          + Tambah Tugas
        </button>

      </div>

      {/* Search */}

      <SearchTask
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      {/* Filter */}

      <TaskFilter
        active={filter}
        setActive={setFilter}
      />

      {/* List */}

      <TaskTable
        tasks={filteredTasks}
        deleteTask={deleteTask}
        setEditTask={setEditTask}
        setIsOpen={setIsOpen}
        toggleTask={toggleTask}
      />

      {/* Modal */}

      <TaskModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >

        <TaskForm
          addTask={(task) => {
            addTask(task);
            setIsOpen(false);
          }}
          editTask={editTask}
          updateTask={(task) => {
            updateTask(task);
            setIsOpen(false);
          }}
        />

      </TaskModal>

    </div>

  );

}
