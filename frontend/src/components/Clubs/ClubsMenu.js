import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ClubsMenu = () => {
    const [clubsData, setClubsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const backend = process.env.REACT_APP_BACKEND_URL

    useEffect(() => {
        const fetchClubsData = async () => {
            try {
                // Adjust the API URL to match your backend route
                const response = await axios.get(`${backend}/scrape/clubs`);
                setClubsData(response.data); // Set the data fetched from the backend
                setLoading(false); // Turn off loading state
            } catch (error) {
                console.error("Error fetching clubs data:", error);
                setLoading(false);
            }
        };

        fetchClubsData();
    }, []);

    useEffect(() => {
        // Scroll to the top of the page when the component mounts
        window.scrollTo(0, 0);
    }, []); // Empty dependency array means this effect runs once on mount

    // Filter clubs based on search term
    const filteredClubs = clubsData.filter(club =>
        club.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return <div>Loading clubs...</div>;
    }

    return (
        <div className="relative min-h-[92vh] bg-gradient-to-br from-gray-900 to-blue-900">
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
            <div className="relative container mx-auto p-4 z-2">
                <h1 className='text-5xl font-bold mb-4 text-white'>Find Clubs</h1>
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search Clubs..."
                        className="w-full text-black p-2 border border-gray-300 rounded-md"
                    />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                    {filteredClubs.map((club, index) => (
                        <Link
                            key={index}
                            to={`/club-dashboard`}  // Update the route to the club-specific dashboard
                            state={{ club }}          // Pass the club data to the dashboard
                            className="flex flex-col items-center border shadow-sm bg-card-background bg-opacity-100 p-4 rounded-lg cursor-pointer transition-all duration-300 hover:scale-105"
                        >
                            <img
                                src={club.logoImg}  // Assuming logoImg is the correct field for logo
                                alt={`${club.shortName} Logo`}
                                className="w-20 h-20 object-contain mb-4"
                            />
                            <h3 className="text-white font-semibold text-lg text-center">{club.fullName}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ClubsMenu;
