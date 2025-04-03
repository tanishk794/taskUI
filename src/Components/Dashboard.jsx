import { useState, useEffect } from "react";
import axios from "axios";
import TaskFormWithCalendar from "./TaskFormWithCalendar";
import TaskList from "./TaskList";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch tasks on selectedDate change
  useEffect(() => {
    fetchTasksByDate(selectedDate);
  }, [selectedDate]);

  // Fetch tasks by selected date
  const fetchTasksByDate = async (date) => {
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const response = await axios.get(
        `http://localhost:5000/api/tasks/date/${formattedDate}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
          withCredentials: true,
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks for the selected date");
    }
  };

  // Create or Update Task
  const handleTaskSubmit = async (task) => {
    try {
      
      

      if (selectedTask) {
        await axios.put(
          `http://localhost:5000/api/tasks/${selectedTask._id}`,
          task,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } else {
        await axios.post("http://localhost:5000/api/tasks/", task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
      }

      fetchTasksByDate(selectedDate);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error saving task");
    }
  };

  // Edit Task
  const handleEditTask = (task) => {
    setSelectedTask(task);
  };

  // Delete Task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasksByDate(selectedDate);
    } catch (error) {
      console.error("Error deleting task");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Task Dashboard</h2>
      
      <TaskFormWithCalendar
        onSubmit={handleTaskSubmit}
        task={selectedTask}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
}

export default Dashboard;
