import { useState, useEffect } from "react";
import axios from "axios";
import TaskFormWithCalendar from "./TaskFormWithCalendar";
import TaskList from "./TaskList";

function Dashboard() {
  // State to store all tasks for the selected date
  const [tasks, setTasks] = useState([]);

  // State to keep track of the task being edited
  const [selectedTask, setSelectedTask] = useState(null);

  // State to store the currently selected date
  const [selectedDate, setSelectedDate] = useState(new Date());

  
  useEffect(() => {
    fetchTasksByDate(selectedDate);
  }, [selectedDate]);

  // Function to fetch tasks based on the selected date
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

  // Function to handle task creation or updating
  const handleTaskSubmit = async (task) => {
    try {
      if (selectedTask) {
        // If a task is selected, update it
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
        // If no task is selected, create a new one
        await axios.post("http://localhost:5000/api/tasks/", task, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
      }

      // After saving, refresh the task list and clear the selected task
      fetchTasksByDate(selectedDate);
      setSelectedTask(null);
    } catch (error) {
      console.error("Error saving task");
    }
  };

  // Function to select a task for editing
  const handleEditTask = (task) => {
    setSelectedTask(task);
  };

  // Function to delete a task by its ID
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchTasksByDate(selectedDate); // Refresh tasks after deletion
    } catch (error) {
      console.error("Error deleting task");
    }
  };

  return (
    <div className="p-4">
      {/* Title for the dashboard page */}
      <h2 className="text-2xl mb-4">Task Dashboard</h2>
      
      {/* Task form component that also includes a date picker */}
      <TaskFormWithCalendar
        onSubmit={handleTaskSubmit}
        task={selectedTask}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />

      {/* Component to display the list of tasks */}
      <TaskList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        setTasks={setTasks}
      />
    </div>
  );
}

export default Dashboard;
