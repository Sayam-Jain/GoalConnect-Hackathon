import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';


const ClubDashboard = () => {
    const location = useLocation();
    const clubInfoReceived = location.state?.club;

    const [players, setPlayers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const backend = process.env.REACT_APP_BACKEND_URL
    // Fetch player data when the component mounts
    useEffect(() => {
        const fetchPlayers = async () => {
            try {
                // Fetch players from the backend API with club ID
                const response = await axios.get(`${backend}/scrape/players/${clubInfoReceived._id}`);
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

    const forwards = players.filter(player => player.position === 'FORWARDS');
    const midfielders = players.filter(player => player.position === 'MIDFIELDERS');
    const defenders = players.filter(player => player.position === 'DEFENDERS');
    const goalkeepers = players.filter(player => player.position === 'GOALKEEPERS');

    return (
        <div className='relative flex items-center w-full justify-center'>
            <div className="absolute inset-0 bg-background-job-form bg-cover bg-center opacity-50 z-0"></div>
            <div className="mt-5 min-h-screen w-[60vw] max-[902px]:w-full bg-gray-900 bg-opacity-90 text-gray-200 p-6 relative z-2">
                <header className="flex justify-center items-center mb-10 max-[541px]:flex-col max-[541px]:gap-5 ">
                    <div className="flex items-center gap-4">
                        <img
                            src={clubInfoReceived.logoImg}
                            alt="Club Logo"
                            className="w-16 h-16 object-contain"
                        />
                        <h1 className="text-4xl md:text-5xl font-bold">{clubInfoReceived.fullName}</h1>
                    </div>
                </header>

                <div className='flex flex-col justify-center items-center mb-5'>
                    <h1 className='text-3xl font-normal mb-2 text-center'>Venue</h1>
                    <img src={clubInfoReceived.bannerImg} className="border rounded-lg sm:w-1/2" alt="not loading" />
                    <h1 className='mt-1 text-sm text-center'>{clubInfoReceived.venue}</h1>
                </div>

                <section className="mb-2">
                    <h2 className="text-6xl font-semibold mb-2">Our Team</h2>
                    
                    <div className='category flex flex-col w-full'>
                        <h1 className='text-3xl my-4 text-left'>Forwards</h1>
                        <div className='flex gap-5 flex-wrap'>
                            {forwards.map(player => (
                                <Link key={player._id} to={`/player/${encodeURIComponent(player.fullName)}`}>
                                    <div className='player-card max-w-[15rem] flex-col flex-wrap border border-gray-600 rounded p-5'>
                                        <h1 className='text-md text-center'>{player.fullName}</h1>
                                        <img src={player.imageUrl} className='text-md' alt={player.fullName}></img>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className='category flex flex-col w-full'>
                        <h1 className='text-3xl my-4 text-left'>Midfielders</h1>
                        <div className='flex flex-wrap gap-5'>
                            {midfielders.map(player => (
                                <Link key={player._id} to={`/player/${encodeURIComponent(player.fullName)}`}>
                                    <div className='player-card max-w-[15rem] flex-col flex-wrap border border-gray-600 rounded p-5'>
                                        <h1 className='text-md text-center'>{player.fullName}</h1>
                                        <img src={player.imageUrl} className='text-md' alt={player.fullName}></img>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className='category flex flex-col w-full'>
                        <h1 className='text-3xl my-4 text-left'>Defenders</h1>
                        <div className='flex gap-5 flex-wrap'>
                            {defenders.map(player => (
                                <Link key={player._id} to={`/player/${encodeURIComponent(player.fullName)}`}>
                                    <div className='player-card max-w-[15rem] flex-col flex-wrap border border-gray-600 rounded p-5'>
                                        <h1 className='text-md text-center'>{player.fullName}</h1>
                                        <img src={player.imageUrl} className='text-md' alt={player.fullName}></img>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    <div className='category flex flex-col w-full'>
                        <h1 className='text-3xl my-4 text-left'>Goalkeepers</h1>
                        <div className='flex gap-5 flex-wrap'>
                            {goalkeepers.map(player => (
                                <Link key={player._id} to={`/player/${encodeURIComponent(player.fullName)}`}>
                                    <div className='player-card max-w-[15rem] flex-col flex-wrap border border-gray-600 rounded p-5'>
                                        <h1 className='text-md text-center'>{player.fullName}</h1>
                                        <img src={player.imageUrl} className='text-md' alt={player.fullName}></img>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ClubDashboard;
