import React from "react";
import { Link } from 'react-router-dom';

function TournamentList({ tournaments }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {tournaments.map((tournament) => (
                <div key={tournament.id} className="bg-white shadow rounded-lg overflow-hidden flex flex-col h-full">
                    <img src={tournament.image} alt={tournament.name} className="w-full h-48 object-cover" />
                    <div className="p-4 flex-grow">
                        <h3 className="text-lg font-semibold mb-2">{tournament.name}</h3>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                            <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                ></path>
                            </svg>
                            {tournament.date}
                        </div>
                        <div className="flex items-center text-sm text-gray-600 mb-1">
                            <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                ></path>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                ></path>
                            </svg>
                            {tournament.location}
                        </div>
                        <div className="flex items-center text-sm text-gray-600">
                            <svg
                                className="w-4 h-4 mr-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                ></path>
                            </svg>
                            {tournament.organizer}
                        </div>
                    </div>
                    <div className="bg-gray-100 px-4 py-2 mt-auto">
                        <Link
                            to={`/register/${tournament.id}`}
                            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 inline-block text-center"
                        >
                            Participate
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TournamentList;
