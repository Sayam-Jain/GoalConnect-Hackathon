import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';

const ClubDashboard = () => {
    const location = useLocation();
    const clubInfoReceived = location.state?.club; // Access the club data passed from ClubsMenu

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const backend = process.env.REACT_APP_BACKEND_URL
    
    // Fetch player data when the component mounts
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                // Fetch players from the backend API
                const response = await axios.get(`${backend}/players?clubId=${clubInfoReceived._id}`);
                console.log(response.data); // Log to check if data is correct
                setPlayers(response.data.players);
                setLoading(false);
            } catch (err) {
                console.error('Error fetching players:', err);
                setError('Error fetching players');
                setLoading(false);
            }
        };

        if (clubInfoReceived) {
            fetchPlayers();
        }
    }, [clubInfoReceived]);

    if (!clubInfoReceived) {
        return <div>Club information not available.</div>;
    }

    if (loading) {
        return <div>Loading player data...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Organize players by position
    const forwards = players.filter(player => player.position?.toUpperCase() === 'FORWARDS');
    const midfielders = players.filter(player => player.position?.toUpperCase() === 'MIDFIELDERS');
    const defenders = players.filter(player => player.position?.toUpperCase() === 'DEFENDERS');
    const goalkeepers = players.filter(player => player.position?.toUpperCase() === 'GOALKEEPERS');

    return (
        <div className='relative flex items-center w-full justify-center'>
            {/* Background Image with opacity */}
            <div className="absolute inset-0 bg-background-job-form bg-cover bg-center opacity-50 z-0"></div>
            <div className="mt-5 min-h-screen w-[60vw] max-[902px]:w-full bg-gray-900 bg-opacity-90 text-gray-200 p-6 relative z-2">
                {/* Header Section */}
                <header className="flex justify-center items-center mb-10 max-[541px]:flex-col max-[541px]:gap-5 ">
                    <div className="flex items-center gap-4">
                        <img src={clubInfoReceived.logoImg} alt="Club Logo" className="w-16 h-16 object-contain" />
                        <h1 className="text-4xl md:text-5xl font-bold">{clubInfoReceived.fullName}</h1>
                    </div>
                </header>

                {/* Venue Section */}
                <div className='flex flex-col justify-center items-center mb-5'>
                    <h1 className='text-3xl font-normal mb-2 text-center'>Venue</h1>
                    <img src={clubInfoReceived.bannerImg} className="border rounded-lg sm:w-1/2" alt="Venue" />
                    <h1 className='mt-1 text-sm text-center'>{clubInfoReceived.venue}</h1>
                </div>

                {/* Sponsors Section */}
                <section className="mb-10">
                    <h2 className="text-2xl font-semibold mb-4">Our Sponsors</h2>
                    <div className="flex gap-6">
                        {/* Sample sponsors */}
                        <div className="flex flex-col items-center">
                            <img src="/assets/nike.png" alt="Nike Logo" className="w-20 h-20 object-contain mb-2" />
                            <p className="text-lg">Nike</p>
                        </div>
                        <div className="flex flex-col items-center">
                            <img src="/assets/adidas.png" alt="Adidas Logo" className="w-20 h-20 object-contain mb-2" />
                            <p className="text-lg">Adidas</p>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="mb-2">
                    <h2 className="text-6xl font-semibold mb-2">Our Team</h2>

                    {/* Forwards */}
                    <div className='category flex flex-col w-full'>
                        <h1 className='text-3xl my-4 text-left'>Forwards</h1>
                        <div className='flex gap-5 flex-wrap'>
                            {forwards.length > 0 ? (
                                forwards.map(player => (
                                    <Link key={player._id} to={`/player/${encodeURIComponent(player.fullName)}`}>
                                        <div className='player-card max-w-[15rem] flex-col flex-wrap border border-gray-600 rounded p-5'>
                                            <h1 className='text-md text-center'>{player.fullName}</h1>
                                            <img src={player.imageUrl} className='text-md' alt={player.fullName}></img>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>No forwards available.</p>
                            )}
                        </div>
                    </div>

                    {/* Midfielders */}
                    <div className='category flex flex-col w-full'>
                        <h1 className='text-3xl my-4 text-left'>Midfielders</h1>
                        <div className='flex flex-wrap gap-5'>
                            {midfielders.length > 0 ? (
                                midfielders.map(player => (
                                    <Link key={player._id} to={`/player/${encodeURIComponent(player.fullName)}`}>
                                        <div className='player-card max-w-[15rem] flex-col flex-wrap border border-gray-600 rounded p-5'>
                                            <h1 className='text-md text-center'>{player.fullName}</h1>
                                            <img src={player.imageUrl} className='text-md' alt={player.fullName}></img>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>No midfielders available.</p>
                            )}
                        </div>
                    </div>

                    {/* Defenders */}
                    <div className='category flex flex-col w-full'>
                        <h1 className='text-3xl my-4 text-left'>Defenders</h1>
                        <div className='flex gap-5 flex-wrap'>
                            {defenders.length > 0 ? (
                                defenders.map(player => (
                                    <Link key={player._id} to={`/player/${encodeURIComponent(player.fullName)}`}>
                                        <div className='player-card max-w-[15rem] flex-col flex-wrap border border-gray-600 rounded p-5'>
                                            <h1 className='text-md text-center'>{player.fullName}</h1>
                                            <img src={player.imageUrl} className='text-md' alt={player.fullName}></img>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>No defenders available.</p>
                            )}
                        </div>
                    </div>

                    {/* Goalkeepers */}
                    <div className='category flex flex-col w-full'>
                        <h1 className='text-3xl my-4 text-left'>Goalkeepers</h1>
                        <div className='flex gap-5 flex-wrap'>
                            {goalkeepers.length > 0 ? (
                                goalkeepers.map(player => (
                                    <Link key={player._id} to={`/player/${encodeURIComponent(player.fullName)}`}>
                                        <div className='player-card max-w-[15rem] flex-col flex-wrap border border-gray-600 rounded p-5'>
                                            <h1 className='text-md text-center'>{player.fullName}</h1>
                                            <img src={player.imageUrl} className='text-md' alt={player.fullName}></img>
                                        </div>
                                    </Link>
                                ))
                            ) : (
                                <p>No goalkeepers available.</p>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ClubDashboard;
