import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TaskFormWithCalendar({ onSubmit, task, selectedDate, setSelectedDate }) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "medium");

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      title,
      description,
      priority,
      taskDate: selectedDate.toISOString().split("T")[0],
    });
    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <div className="bg-white flex justify-evenly p-4 rounded shadow mb-4">
      
      
      

      <form onSubmit={handleSubmit} className="mt-4">
      <h3 className="text-xl font-bold mb-4">{task ? "Edit Task" : "Add Task"}</h3>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {task ? "Update Task" : "Add Task"}
        </button>
      </form>
      <Calendar
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
    </div>
  );
}

export default TaskFormWithCalendar;
