import TaskCard from "./TaskCard";

export default function TaskTable({
  tasks,
  deleteTask,
  setEditTask,
  setIsOpen,
  toggleTask,
}) {

  if (tasks.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 text-center shadow border">
        <h2 className="text-xl font-semibold text-slate-500">
          Tidak ada tugas
        </h2>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">

      {tasks.map((task) => (

        <TaskCard
        key={task.id}
        task={task}
        deleteTask={deleteTask}
        setEditTask={setEditTask}
        setIsOpen={setIsOpen}
        toggleTask={toggleTask}
        />

      ))}

    </div>
  );
}