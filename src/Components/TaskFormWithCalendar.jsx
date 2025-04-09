import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function TaskFormWithCalendar({
  onSubmit,
  task,
  selectedDate,
  setSelectedDate,
}) {
  // initialize form state with task values or defaults
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [priority, setPriority] = useState(task?.priority || "");
  const [status, setStatus] = useState(task?.status || "");

  // update form fields if task is updated
  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
    }
  }, [task]);

  // handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // call the onSubmit prop function with the form data
    onSubmit({
      title,
      description,
      priority,
      taskDate: selectedDate.toISOString().split("T")[0],
      status,
    });

    // reset form fields after submission
    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <div className="bg-white flex justify-evenly p-4 rounded shadow mb-4">
      {/* task creation or editing form */}
      <form onSubmit={handleSubmit} className="mt-4">
        <h3 className="text-xl font-bold mb-4">
          {task ? "Edit Task" : "Add Task"}
        </h3>

        {/* input field for title */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mb-2 w-full"
        />

        {/* input field for description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 mb-2 w-full"
        />

        {/* dropdown for priority selection */}
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option>Select Priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        {/* dropdown for status selection */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 mb-2 w-full"
        >
          <option>Select status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Paused">Paused</option>
        </select>

        {/* submit button to add or update task */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {task ? "Update Task" : "Add Task"}
        </button>
      </form>

      {/* calendar component to select date */}
      <Calendar
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
      />
    </div>
  );
}

export default TaskFormWithCalendar;
