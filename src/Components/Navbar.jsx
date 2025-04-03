import { Link } from 'react-router-dom';

function Navbar({ isAuthenticated, setIsAuthenticated }) {
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return (
    <nav className="bg-blue-600 p-4 flex justify-between items-center text-white">
      <h1 className="text-xl font-bold">Task Scheduler</h1>
      <div>
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="mr-4">Dashboard</Link>
            <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mr-4">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;