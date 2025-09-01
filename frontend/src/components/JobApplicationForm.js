import React, { useState } from 'react';

const JobApplicationForm = () => {
    // Sample football clubs list
    const footballClubs = [
        'BSF Football Club',
        'Punjab FC',
        'Mumbai City FC',
        'Bengaluru FC',
        'Chennaiyin FC',
    ];

    // State to hold form data
    const [formData, setFormData] = useState({
        aadharFile: null,
        resumeFile: null,
        passportPhoto: null,
        selectedClub: '',
        address: '',
        city: '',
        state: '',
        postalCode: '',
        name: '',
        email: '',
        age: '',
        gender: '',
        position: ''
    });

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file input change
    const handleFileChange = (e) => {
        const { name } = e.target;
        setFormData({ ...formData, [name]: e.target.files[0] });
    };

    // Handle form submission (for now, we'll just console log the form data)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
    };

    return (
        <div className="relative flex items-center justify-center w-full bg-cover bg-center bg-background-job-form">
            <div className="absolute inset-0 bg-black opacity-80"></div>
            <div className="relative flex-col max-w-2xl lg:mt-10 mt-4 w-[90vw] mx-auto p-6 bg-[#171c23] border border-gray-600 shadow-lg rounded-md">
                <h1 className="text-3xl font-bold mb-6 text-white">Job Application Form</h1>
                <form onSubmit={handleSubmit}>

                    {/* Aadhar Card, Resume, and Passport Photo Inputs */}
                    <div className='sm:flex-row flex flex-col sm:gap-4'>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2 text-white">Aadhar Card</label>
                            <input
                                type="file"
                                name="aadharFile"
                                accept=".pdf, .jpg, .jpeg, .png"
                                onChange={handleFileChange}
                                className="block w-full p-2 border border-gray-300 rounded-md text-white"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-lg font-semibold mb-2 text-white">Upload Resume</label>
                            <input
                                type="file"
                                name="resumeFile"
                                onChange={handleFileChange}
                                className="block w-full p-2 border border-gray-300 rounded-md text-white"
                                required
                            />
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2 text-white">Upload Passport Size Photo</label>
                        <input
                            type="file"
                            name="passportPhoto"
                            accept=".jpg, .jpeg, .png"
                            onChange={handleFileChange}
                            className="block w-full p-2 border border-gray-300 rounded-md text-white"
                            required
                        />
                    </div>

                    {/* Name and Email in a single row */}
                    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-white font-bold">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-white font-bold">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                required
                            />
                        </div>
                    </div>

                    {/* Position Applied and Age in a single row */}
                    <div className="mb-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-2 text-white font-bold">Position Applied For</label>
                            <input
                                type="text"
                                name="position"
                                value={formData.position}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                required
                            />
                        </div>
                        <div>
                            <label className="block mb-2 text-white font-bold">Age</label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded text-black"
                                min="18"
                                required
                            />
                        </div>
                    </div>

                    {/* Gender Radio Buttons */}
                    <div className="mb-4">
                        <label className="block mb-2 text-white font-bold">Gender</label>
                        <div className="flex gap-4">
                            <label className="text-white">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    onChange={handleInputChange}
                                    required
                                />
                                Male
                            </label>
                            <label className="text-white">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    onChange={handleInputChange}
                                    required
                                />
                                Female
                            </label>
                            <label className="text-white">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"
                                    onChange={handleInputChange}
                                    required
                                />
                                Other
                            </label>
                        </div>
                    </div>

                    {/* Football Club Dropdown */}
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2 text-white">Select Football Club</label>
                        <select
                            name="selectedClub"
                            value={formData.selectedClub}
                            onChange={handleInputChange}
                            className="block text-black w-full p-2 border border-gray-300 rounded-md"
                            required
                        >
                            <option value="" className='text-black'>-- Choose a Club --</option>
                            {footballClubs.map((club, index) => (
                                <option key={index} value={club} className='text-black'>{club}</option>
                            ))}
                        </select>
                    </div>

                    {/* Address Input */}
                    <div className="mb-4">
                        <label className="block text-lg font-semibold mb-2 text-white">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className="block w-full p-2 border border-gray-300 rounded-md text-black"
                            placeholder="Street Address"
                            required
                        />
                    </div>

                    {/* City, State, and Postal Code Inputs */}
                    <div className="mb-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-lg font-semibold mb-2 text-white">City</label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleInputChange}
                                className="block w-full p-2 border border-gray-300 rounded-md text-black"
                                placeholder="City"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2 text-white">State</label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={handleInputChange}
                                className="block w-full p-2 border border-gray-300 rounded-md text-black"
                                placeholder="State"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-lg font-semibold mb-2 text-white">Postal Code</label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={handleInputChange}
                                className="block w-full p-2 border border-gray-300 rounded-md text-black"
                                placeholder="Postal Code"
                                required
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="mt-6">
                        <button
                            type="submit"
                            className="bg-blue-500 w-full font-bold text-white px-6 py-2 rounded-md hover:bg-blue-600 transition-colors"
                        >
                            Submit Application
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobApplicationForm;
