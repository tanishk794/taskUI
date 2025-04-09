import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";

function TaskList({ tasks, onEdit, onDelete, setTasks }) {
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [reminderTime, setReminderTime] = useState("");

  // function to determine button color based on task priority
  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "high":
        return "bg-red-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-amber-300";
    }
  };

  // function to sort tasks in order of priority from high to low
  const sortTasksByPriority = (tasksList) => {
    const priorityOrder = {
      high: 1,
      medium: 2,
      low: 3,
    };

    return [...tasksList].sort((a, b) => {
      return (
        priorityOrder[a.priority.toLowerCase()] -
        priorityOrder[b.priority.toLowerCase()]
      );
    });
  };

  // handle delete button click by storing the task id
  const handleDeleteClick = (taskId) => {
    setTaskToDelete(taskId);
  };

  // confirm task deletion
  const confirmDelete = () => {
    onDelete(taskToDelete);
    setTaskToDelete(null);
  };

  // cancel task deletion
  const cancelDelete = () => {
    setTaskToDelete(null);
  };

  // get sorted tasks
  const sortedTasks = sortTasksByPriority(tasks);

  // handle setting a reminder for a task
  const setReminder = async (taskId) => {
    if (!reminderTime) {
      toast.warn("Please select a time for the reminder.");
      return;
    }

    const now = new Date();
    const todayDate = now.toISOString().split("T")[0];
    const reminderISO = `${todayDate}T${reminderTime}:00.000+05:30`;
    const reminderDate = new Date(reminderISO);

    if (reminderDate.getTime() < now.getTime()) {
      toast.error("Reminder time cannot be in the past");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/tasks/set-reminder",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          credentials: "include",
          body: JSON.stringify({
            taskId,
            reminderTime,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        toast.success("Reminder set successfully");

        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId
              ? {
                  ...task,
                  reminder: reminderISO,
                }
              : task
          )
        );
        setReminderTime("");
      } else {
        toast.error(data.message || "Failed to set reminder");
      }
    } catch (error) {
      console.error("Error setting reminder", error);
      toast.error("Something went wrong while setting reminder");
    }
  };

  // set interval to check every 10 seconds if any task's reminder time has arrived
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      tasks.forEach((task) => {
        if (task.reminder && !task.notified) {
          const reminderTime = new Date(task.reminder);
          const diff = reminderTime.getTime() - now.getTime();

          if (diff <= 0 && diff > -60000) {
            toast.info(`Reminder: ${task.title}`, {
              position: "top-center",
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              className: "text-lg px-6 h- py-4",
            });
            task.notified = true;
          }
        }
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [tasks]);

  return (
    <>
      <ul className="mt-4">
        {sortedTasks.map((task) => (
          <li
            key={task._id}
            className="p-4 mb-2 rounded bg-gray-200 flex justify-around shadow"
          >
            <div className="-ml-56">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <p>{task.description}</p>
              <button
                className={`${getPriorityColor(
                  task.priority
                )} py-2 px-2 rounded-md text-white font-semibold`}
              >
                Priority: {task.priority}
              </button>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => onEdit(task)}
                  className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 transition-colors"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteClick(task._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors"
                >
                  Delete
                </button>
                <button className="p-2 bg-indigo-500 text-white rounded-lg">
                  {task?.status}
                </button>
              </div>
            </div>

            <div className="bg-blue-400 w-60 h-24 my-auto flex flex-col items-center justify-start rounded-lg p-2 pt-3 pb-6 relative">
              <h1 className="text-white text-sm font-medium">Set Reminder</h1>

              <div className="flex items-center gap-2 mt-2 w-full">
                <input
                  type="time"
                  value={
                    task.reminder
                      ? new Date(task.reminder).toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: false,
                          timeZone: "Asia/Kolkata",
                        })
                      : ""
                  }
                  onChange={(e) => setReminderTime(e.target.value)}
                  disabled={task.status?.toLowerCase() !== "pending"}
                  className={`bg-white text-black p-1 rounded w-3/5 ${
                    task.status?.toLowerCase() !== "pending"
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                />

                <button
                  onClick={() => setReminder(task._id)}
                  disabled={task.status?.toLowerCase() !== "pending"}
                  className={`text-sm font-semibold rounded px-2 py-1 w-2/5 ${
                    task.status?.toLowerCase() !== "pending"
                      ? "bg-gray-300 opacity-50 cursor-not-allowed"
                      : "bg-gray-300 hover:bg-gray-400"
                  }`}
                >
                  Set
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {taskToDelete && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full pointer-events-auto">
            <h3 className="text-lg font-semibold mb-4">Confirm Delete</h3>
            <p className="mb-6">Are you sure you want to delete this task</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TaskList;
