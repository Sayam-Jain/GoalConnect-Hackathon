import { useState } from 'react';

const JobPostingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: '',
    description: '',
    requirements: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const backend = process.env.REACT_APP_BACKEND_URL

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${backend}/apis/job-postings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('Job Listing Posted Successfully!');
        // Clear form or add further logic
      } else {
        alert('Failed to post the job');
      }
    } catch (error) {
      console.error('Error posting job:', error);
      alert('Error posting job');
    }
  };
  

  return (
    <div className="min-h-screen bg-cover bg-center bg-no-repeat relative" 
         style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505748641491-f7ee2fd6fb4d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTd8fHxlbnwwfHx8fHw%3D')" }}>
      {/* Overlay for darker background effect */}
      <div className="absolute inset-0 bg-black opacity-30"></div>
      
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="bg-green-600 bg-opacity-90 text-white p-8 rounded-lg shadow-xl w-full max-w-lg">
          <h1 className="text-3xl font-bold mb-6 text-center">Post a Job Listing</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Job Title */}
            <div>
              <label className="block mb-2 text-sm font-bold">Job Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-800 bg-opacity-80 text-white outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Head Coach"
              />
            </div>

            {/* Department */}
            <div>
              <label className="block mb-2 text-sm font-bold">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-800 bg-opacity-80 text-white outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Coaching, Management"
              />
            </div>

            {/* Location */}
            <div>
              <label className="block mb-2 text-sm font-bold">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-800 bg-opacity-80 text-white outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Stadium, Training Ground"
              />
            </div>

            {/* Job Type */}
            <div>
              <label className="block mb-2 text-sm font-bold">Job Type</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-800 bg-opacity-80 text-white outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 text-sm font-bold">Job Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-800 bg-opacity-80 text-white outline-none focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="Provide details about the job role..."
              ></textarea>
            </div>

            {/* Requirements */}
            <div>
              <label className="block mb-2 text-sm font-bold">Requirements</label>
              <textarea
                name="requirements"
                value={formData.requirements}
                onChange={handleChange}
                required
                className="w-full p-3 rounded bg-gray-800 bg-opacity-80 text-white outline-none focus:ring-2 focus:ring-blue-500 h-32"
                placeholder="List the qualifications or experience required..."
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-orange-600 hover:bg-orange-500 text-white py-3 px-6 rounded-md shadow-md transition duration-300"
              >
                Post Job
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobPostingForm;
