import React, { useState } from "react";
import TournamentSearch from "./TournamentSearch";
import TournamentList from "./TournamentList";
import DiscussionForum from "./DisscussionForum";
import { tournaments } from "./TournamentData";

function Tournament() {
    const [searchResults, setSearchResults] = useState(tournaments);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (results) => {
        setSearchResults(results);
    };

    const handleSearchInputChange = (e) => {
        const term = e.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = tournaments.filter((tournament) =>
            tournament.name.toLowerCase().includes(term)
        );
        setSearchResults(filtered);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        const filtered = tournaments.filter((tournament) =>
            tournament.name.toLowerCase().includes(searchTerm)
        );
        setSearchResults(filtered);
    };

    return (
        <div className="bg-gray-900 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-white">SEARCH LOCAL TOURNAMENTS</h1>
                    <p className="text-xl text-white mb-6">Find Local tournaments & events near your home</p>
                    <div className="max-w-7xl mx-auto">
                        <form onSubmit={handleSearchSubmit} className="flex mb-4">
                            <input
                                type="text"
                                placeholder="Search tournaments..."
                                value={searchTerm}
                                onChange={handleSearchInputChange}
                                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center placeholder-center"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <h2 className="text-2xl font-bold mb-4">RECENT TOURNAMENTS LIST</h2>
                    <TournamentList tournaments={searchResults} />
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                    <DiscussionForum />
                </div>
            </div>
        </div>
    );
}

export default Tournament;
