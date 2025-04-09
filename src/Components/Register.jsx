import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  // state to manage input values
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  // hook to navigate between pages
  const navigate = useNavigate();

  // function to handle register form submission
  const handleRegister = async (e) => {
    e.preventDefault();

    // check for empty input fields
    if (!name || !email || !password) {
      alert("Please fill in all the fields.");
      return;
    }

    try {
      // send registration request to backend
      await axios.post(
        'http://localhost:5000/api/auth/register',
        { name, email, password },
        { withCredentials: true }
      );

      // redirect user to login page after successful registration
      navigate('/login');
    } catch (error) {
      // log and show error if registration fails
      console.log(error?.response?.data?.message);
      alert(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl mb-4">Register</h2>

      {/* registration form */}
      <form onSubmit={handleRegister} className="bg-white p-4 rounded shadow-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="border mb-2 p-2 w-full"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border mb-2 p-2 w-full"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border mb-2 p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
