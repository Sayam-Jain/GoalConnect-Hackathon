import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); // Optional error handling
  const navigate = useNavigate(); // Use the hook correctly
  const backend = process.env.REACT_APP_BACKEND_URL;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `${backend}/auth/login`;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData), // Send the formData as a string
      });

      // Parse the response as JSON
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Login failed'); // Handle errors from the server
      }

      // Store the token
      localStorage.setItem('token', data.token);
      console.log('Login successful, token stored:', data.token);

      // Navigate to the home page
      navigate('/',{ state: { recheckLogin: true } });
      window.location.reload();
    } catch (err) {
      console.log(err.message);
      setError(err.message); // Display error to the user (optional)
    } finally {
      setFormData({
        email: '',
        password: ''
      });
    }
  };

  return (
    <div className="relative flex items-center bg-background-hero justify-center h-[92vh] bg-cover bg-center" >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative bg-card-background p-8 rounded-lg shadow-lg max-w-sm w-full border border-gray-500 z-2">
        <h2 className="text-4xl font-bold text-center text-white">Login</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Show error if exists */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-200">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your password"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
