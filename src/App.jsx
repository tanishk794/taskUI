import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom"; 
import { useState, useEffect } from "react";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Login from "./Components/Login";
import Register from "./Components/Register";
import { ToastContainer } from "react-toastify"; // toast notifications container
import "react-toastify/dist/ReactToastify.css"; // toast styles

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true); // tracks if user is logged in

  // check for token in local storage when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // set to true if token exists, otherwise false
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* top navigation bar */}
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />

        {/* define routes for navigation */}
        <Routes>
          {/* when path is /, redirect based on login status */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          {/* login route passes setter to update auth status */}
          <Route
            path="/login"
            element={<Login setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* registration page */}
          <Route path="/register" element={<Register />} />

          {/* dashboard route is protected – redirects to login if not logged in */}
          <Route
            path="/dashboard"
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
          />
        </Routes>

        {/* Toast container to show alert messages throughout the app */}
        <ToastContainer
          position="top-right"
          autoClose={8000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
    </Router>
  );
}

export default App;
