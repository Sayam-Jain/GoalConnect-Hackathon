import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User' // Default role
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const backend = process.env.REACT_APP_BACKEND_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    };
    
    const url = `${backend}/auth/signup`;
    try {
      const res = await fetch(url, options);
      const data = await res.json();
  
      if (data.token) {
        // Store the JWT token in localStorage
        localStorage.setItem('token', data.token);
        console.log('Login successful, token stored:', data.token);
      }
  
      navigate("/",{ state: { recheckLogin: true } });
      window.location.reload(); // Navigate to home or dashboard after successful login
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="relative flex items-center bg-background-hero justify-center h-[92vh] bg-cover bg-center" >
      <div className="absolute inset-0 bg-black opacity-70"></div>
      <div className="relative bg-card-background p-8 rounded-lg shadow-lg max-w-sm w-full border border-gray-500 z-2">
        <h2 className="text-4xl font-bold text-center text-white">Sign up</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-200">Username</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your username"
              required
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium text-gray-200">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="User">User</option>
              <option value="Player">Player</option>
              <option value="Club">Club</option>
              <option value="Sponsor">Sponsor</option>
            </select>
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

export default SignUp;
