import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Sample data for players (replace this with your actual data source)
const samplePlayers = [
    { id: 1, name: 'John Doe', position: 'Forward', age: 22, club: 'FC United' },
    { id: 2, name: 'Jane Smith', position: 'Midfielder', age: 24, club: 'City FC' },
    { id: 3, name: 'Mike Johnson', position: 'Defender', age: 21, club: 'Rovers FC' },
    { id: 4, name: 'Emily Brown', position: 'Goalkeeper', age: 26, club: 'Athletic Club' },
    { id: 5, name: 'Carlos Rodriguez', position: 'Forward', age: 23, club: 'Real FC' },
    { id: 6, name: 'Sarah Lee', position: 'Midfielder', age: 25, club: 'United City' },
    { id: 7, name: 'Tom Wilson', position: 'Defender', age: 22, club: 'Wanderers FC' },
    { id: 8, name: 'Lucy Chen', position: 'Forward', age: 20, club: 'Phoenix FC' },
    { id: 9, name: 'Ahmed Hassan', position: 'Midfielder', age: 27, club: 'Dynamo FC' },
    { id: 10, name: 'Maria Garcia', position: 'Defender', age: 23, club: 'Sporting Club' },
    { id: 11, name: 'Alex Turner', position: 'Goalkeeper', age: 29, club: 'City United' },
    { id: 12, name: 'Olivia White', position: 'Forward', age: 21, club: 'FC Royale' },
    { id: 13, name: 'Jamal Adams', position: 'Midfielder', age: 26, club: 'Metro FC' },
    { id: 14, name: 'Emma Thompson', position: 'Defender', age: 24, club: 'Atlético FC' },
    { id: 15, name: 'Liam O\'Brien', position: 'Forward', age: 22, club: 'Celtic United' }
];

const ScoutPlayer = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPlayers, setFilteredPlayers] = useState(samplePlayers);
    const [scoutedPlayers, setScoutedPlayers] = useState([]);
    const [showScoutedList, setShowScoutedList] = useState(false);

    useEffect(() => {
        // Load scouted players from local storage on component mount
        const storedScoutedPlayers = JSON.parse(localStorage.getItem('scoutedPlayers')) || [];
        setScoutedPlayers(storedScoutedPlayers);
    }, []);

    const handleSearch = (event) => {
        const term = event.target.value.toLowerCase();
        setSearchTerm(term);
        const filtered = samplePlayers.filter(player =>
            player.name.toLowerCase().includes(term) ||
            player.position.toLowerCase().includes(term) ||
            player.club.toLowerCase().includes(term)
        );
        setFilteredPlayers(filtered);
    };

    const addToScoutList = (player) => {
        if (!scoutedPlayers.some(p => p.id === player.id)) {
            const updatedScoutedPlayers = [...scoutedPlayers, player];
            setScoutedPlayers(updatedScoutedPlayers);
            localStorage.setItem('scoutedPlayers', JSON.stringify(updatedScoutedPlayers));
        }
    };

    const removeFromScoutList = (playerId) => {
        const updatedScoutedPlayers = scoutedPlayers.filter(p => p.id !== playerId);
        setScoutedPlayers(updatedScoutedPlayers);
        localStorage.setItem('scoutedPlayers', JSON.stringify(updatedScoutedPlayers));
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-8">
            <h1 className="text-3xl font-bold mb-6">Scout Players</h1>
            <div className="mb-4">
                <button 
                    onClick={() => setShowScoutedList(!showScoutedList)}
                    className="bg-green-600 hover:bg-green-500 text-white font-bold py-2 px-4 rounded transition duration-300 mr-4"
                >
                    {showScoutedList ? 'Show All Players' : 'Show Scouted Players'}
                </button>
                <span className="text-lg">Scouted Players: {scoutedPlayers.length}</span>
            </div>
            {!showScoutedList && (
                <input
                    type="text"
                    placeholder="Search players..."
                    className="w-full p-2 mb-6 bg-gray-800 text-white rounded"
                    value={searchTerm}
                    onChange={handleSearch}
                />
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {(showScoutedList ? scoutedPlayers : filteredPlayers).map(player => (
                    <div key={player.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        <h2 className="text-xl font-semibold">{player.name}</h2>
                        <p>Position: {player.position}</p>
                        <p>Age: {player.age}</p>
                        <p>Current Club: {player.club}</p>
                        {showScoutedList ? (
                            <button 
                                onClick={() => removeFromScoutList(player.id)}
                                className="mt-4 bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Remove from Scout List
                            </button>
                        ) : (
                            <button 
                                onClick={() => addToScoutList(player)}
                                className="mt-4 bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300"
                            >
                                Add to Scout List
                            </button>
                        )}
                    </div>
                ))}
            </div>
            <Link to="/club-dashboard" className="block mt-8 text-blue-400 hover:text-blue-300">
                Back to Club Dashboard
            </Link>
        </div>
    );
};

export default ScoutPlayer;
