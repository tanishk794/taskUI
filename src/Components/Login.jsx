import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login({ setIsAuthenticated }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password },{withCredentials:true});
      localStorage.setItem('token', response.data.token);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } catch (error) {
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl mb-4">Login</h2>
      <form onSubmit={handleLogin} className="bg-white p-4 rounded shadow-md">
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="border mb-2 p-2 w-full" />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="border mb-2 p-2 w-full" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Login</button>
      </form>
    </div>
  );
}

export default Login;