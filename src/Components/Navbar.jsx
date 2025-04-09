import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  // Function to handle logout by removing token and updating authentication state
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      {/* Application title */}
      <h1 className="text-xl font-bold">Task Scheduler</h1>

      {/* Conditional rendering based on authentication status */}
      <div>
        {isAuthenticated ? (
          <>
            {/* Link to dashboard if authenticated */}
            <Link to="/dashboard" className="mr-4">Dashboard</Link>

            {/* Logout button */}
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            {/* Links to login and register if not authenticated */}
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
