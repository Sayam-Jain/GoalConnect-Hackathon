import React, { useState } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
const RegistrationPage = ({ closeRegistration }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phones: [''], 
    age: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handlePhoneChange = (index, value) => {
    const newPhones = [...formData.phones];
    newPhones[index] = value;
    setFormData((prevData) => ({ ...prevData, phones: newPhones }));
  };

  const addPhoneField = () => {
    if (formData.phones.length < 2) {
      setFormData((prevData) => ({ ...prevData, phones: [...prevData.phones, ''] }));
    }
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.age) {
      setError('All fields are required.');
      return false;
    }
    if (formData.phones.some(phone => !phone)) {
      setError('Please fill in all phone numbers.');
      return false;
    }
    if (isNaN(formData.age) || formData.age <= 0) {
      setError('Please enter a valid age.');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
    }, 500); 
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70">
      <div className="relative bg-gray-800 p-6 rounded-lg shadow-lg w-96">
        
        <button 
          onClick={closeRegistration} 
          className="absolute top-2 right-2 text-white hover:text-gray-400"
        >
          <AiOutlineClose size={24} />
        </button>

        <h1 className="text-4xl font-bold mb-6 text-center text-white">Register for the Football Course</h1>
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl mb-4 text-white">Registration Successful!</h2>
            <p className="text-white">Thank you, {formData.name}, for registering.</p>
            <button
              onClick={closeRegistration}
              className="mt-4 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-500 transition duration-300"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4">
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <div className="mb-4">
              <label className="block text-sm mb-2 text-white" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-white" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-white">Phone Numbers</label>
              {formData.phones.map((phone, index) => (
                <input
                  key={index}
                  type="tel"
                  value={phone}
                  onChange={(e) => handlePhoneChange(index, e.target.value)}
                  required
                  placeholder={`Phone #${index + 1}`}
                  className="w-full mb-2 p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              ))}
              {formData.phones.length < 2 && (
                <button
                  type="button"
                  onClick={addPhoneField}
                  className="text-blue-400 hover:underline"
                >
                  + Add Another Phone Number
                </button>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-sm mb-2 text-white" htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                required
                className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
            </div>
            <button
              type="submit"
              className={`w-full ${loading ? 'bg-gray-600' : 'bg-blue-600'} text-white py-2 rounded hover:bg-blue-500 transition duration-300`}
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RegistrationPage;
