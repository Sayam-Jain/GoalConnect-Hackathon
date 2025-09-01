import React, { useState } from "react";
import { tournaments } from "./TournamentData";

function TournamentSearch({ onSearch }) {
    const [filters, setFilters] = useState({
        searchTerm: "",
        location: "",
        date: "",
        ageGroup: "",
        skillLevel: "",
        tournamentType: "",
        minPrice: "",
        maxPrice: "",
    });

    const handleChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const filteredResults = tournaments.filter(
            (t) =>
                (!filters.minPrice || parseFloat(t.registrationFee.slice(1)) >= parseFloat(filters.minPrice)) &&
                (!filters.maxPrice || parseFloat(t.registrationFee.slice(1)) <= parseFloat(filters.maxPrice)) &&
                t.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) &&
                (!filters.location || t.location.toLowerCase().includes(filters.location.toLowerCase())) &&
                (!filters.date || t.date === filters.date) &&
                (!filters.ageGroup || t.ageGroup === filters.ageGroup) &&
                (!filters.skillLevel || t.skillLevel === filters.skillLevel) &&
                (!filters.tournamentType || t.type === filters.tournamentType),
        );

        onSearch(filteredResults);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex space-x-2">
                    <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleChange}
                        placeholder="Min price (₹)"
                        className="px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                    <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleChange}
                        placeholder="Max price (₹)"
                        className="px-4 py-2 border border-gray-300 rounded-md w-full"
                    />
                </div>
                <input
                    type="text"
                    name="location"
                    value={filters.location}
                    onChange={handleChange}
                    placeholder="Location (city, venue)"
                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                />
                <input
                    type="date"
                    name="date"
                    value={filters.date}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                />
                <select
                    name="ageGroup"
                    value={filters.ageGroup}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                >
                    <option value="">Select Age Group</option>
                    <option value="U12">Under 12</option>
                    <option value="U15">Under 15</option>
                    <option value="U18">Under 18</option>
                    <option value="Adult">Adult</option>
                </select>
                <select
                    name="skillLevel"
                    value={filters.skillLevel}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                >
                    <option value="">Select Skill Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                </select>
                <select
                    name="tournamentType"
                    value={filters.tournamentType}
                    onChange={handleChange}
                    className="px-4 py-2 border border-gray-300 rounded-md w-full"
                >
                    <option value="">Select Tournament Type</option>
                    <option value="Amateur">Amateur</option>
                    <option value="Semi-Pro">Semi-Pro</option>
                </select>
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                    />
                </svg>
                Filter Tournaments
            </button>
        </form>
    );
}

export default TournamentSearch;
