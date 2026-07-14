import { useState, useEffect } from "react";

import * as scheduleService from "../../services/scheduleService";

export default function TaskForm({
  addTask,
  editTask,
  updateTask,
}) {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    scheduleService
      .list()
      .then((schedules) => {
        const uniqueCourses = [...new Set(schedules.map((item) => item.course))];
        setCourses(uniqueCourses);
        if (!editTask && uniqueCourses.length > 0) {
          setCourse((prev) => prev || uniqueCourses[0]);
        }
      })
      .catch(() => setCourses([]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [title, setTitle] = useState("");

  const [course, setCourse] = useState(
    courses[0] || ""
  );

  const [priority, setPriority] =
    useState("Medium");

  const [deadline, setDeadline] =
    useState("");

  useEffect(() => {

    if (editTask) {

      setTitle(editTask.title);
      setCourse(editTask.course);
      setPriority(editTask.priority);
      setDeadline(editTask.deadline);

    } else {

      resetForm();

    }

  }, [editTask]);

  function resetForm() {

    setTitle("");

    setCourse(courses[0] || "");

    setPriority("Medium");

    setDeadline("");

  }

  function submit(e) {

    e.preventDefault();

    const task = {

      id: editTask
        ? editTask.id
        : Date.now(),

      title,

      course,

      priority,

      deadline,

      completed: editTask
        ? editTask.completed
        : false,

    };

    if (editTask) {

      updateTask(task);

    } else {

      addTask(task);

    }

    resetForm();

  }

  return (

    <form
      onSubmit={submit}
      className="space-y-5"
    >

      <h2 className="text-2xl font-bold">

        {editTask
          ? "Edit Tugas"
          : "Tambah Tugas"}

      </h2>

      <input
        placeholder="Judul Tugas"
        value={title}
        onChange={(e)=>
          setTitle(e.target.value)
        }
        className="w-full border rounded-xl p-3"
        required
      />

      <select
        value={course}
        onChange={(e)=>
          setCourse(e.target.value)
        }
        className="w-full border rounded-xl p-3 bg-white"
      >

        {courses.map((course)=>(

          <option
            key={course}
            value={course}
          >
            {course}
          </option>

        ))}

      </select>

      <select
        value={priority}
        onChange={(e)=>
          setPriority(e.target.value)
        }
        className="w-full border rounded-xl p-3 bg-white"
      >

        <option value="High">
          High
        </option>

        <option value="Medium">
          Medium
        </option>

        <option value="Low">
          Low
        </option>

      </select>

      <input
        type="date"
        value={deadline}
        onChange={(e)=>
          setDeadline(e.target.value)
        }
        className="w-full border rounded-xl p-3"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl"
      >

        {editTask
          ? "Update Tugas"
          : "Tambah Tugas"}

      </button>

    </form>

  );

}