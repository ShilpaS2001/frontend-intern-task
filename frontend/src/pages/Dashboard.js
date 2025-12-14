import axios from "axios";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      window.location.href = "/";
      return;
    }

    const fetchTasks = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/tasks", {
          headers: { Authorization: token }
        });
        setTasks(res.data);
      } catch (error) {
        alert("Session expired. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/";
      }
    };

    fetchTasks();
  }, [token]);

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks",
        { title },
        { headers: { Authorization: token } }
      );
      setTasks([...tasks, res.data]);
      setTitle("");
    } catch {
      alert("Error adding task");
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { Authorization: token }
      });
      setTasks(tasks.filter(t => t._id !== id));
    } catch {
      alert("Error deleting task");
    }
  };

  const logout = () => {
  localStorage.removeItem("token");
  window.location.href = "/";
};


  return (
  <div className="container">
    <h2>Dashboard</h2>

    <button className="logout" onClick={logout}>
      Logout
    </button>

    <input
      value={title}
      onChange={e => setTitle(e.target.value)}
      placeholder="Enter new task"
    />

    <button onClick={addTask}>Add Task</button>

    <div>
      {tasks.map(task => (
        <div className="task" key={task._id}>
          <span>{task.title}</span>
          <button onClick={() => deleteTask(task._id)}>Delete</button>
        </div>
      ))}
    </div>
  </div>
);


}
