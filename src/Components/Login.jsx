import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  // State to store user email input
  const [email, setEmail] = useState('');

  // State to store user password input
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  // Function to handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password }, { withCredentials: true });

      // Store the authentication token in local storage
      localStorage.setItem('token', response.data.token);

      // Set authentication state to true in the parent
      setIsAuthenticated(true);

      // Navigate to dashboard after successful login
      navigate('/dashboard');
    } catch (error) {
      // Show alert if login fails
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      {/* Title of the login page */}
      <h2 className="text-2xl mb-4">Login</h2>

      {/* Login form with email and password inputs */}
      <form onSubmit={handleLogin} className="bg-white p-4 rounded shadow-md">
        {/* Email input field */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border mb-2 p-2 w-full"
        />

        {/* Password input field */}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border mb-2 p-2 w-full"
        />

        {/* Submit button for login */}
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
