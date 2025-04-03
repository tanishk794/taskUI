function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <ul className="mt-4">
      {tasks.map((task) => (
        <li key={task._id} className="bg-gray-200 p-4 mb-2 rounded shadow">
          <h3 className="text-lg font-semibold">{task.title}</h3>
          <p>{task.description}</p>
          <h1 className="">Priority: {task.priority}</h1>
          <div className="mt-2 flex gap-2">
            <button
              onClick={() => onEdit(task)}
              className="bg-yellow-500 text-white px-2 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(task._id)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
