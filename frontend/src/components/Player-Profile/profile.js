/*import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PlayerCard from './card'; 
import PlayerStats from "./stats";
//import { data } from "./data";

const PlayerProfile = () => {
    const { playerName } = useParams();
    const navigate = useNavigate();
    const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        const playerIndex = data.findIndex(p => p.name === decodeURIComponent(playerName));
        if (playerIndex !== -1) {
            setCurrentPlayerIndex(playerIndex);
            setPlayer(data[playerIndex]);
        }
    }, [playerName]);

    if (!player) {
        return <div>Player not found</div>;
    }

    const QuickOverview = () => (
        <div className="bg-indigo-900 p-4 rounded-lg mb-6">
            <h3 className="text-lg font-bold text-white mb-3">Quick Overview</h3>
            <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                    <p className="text-gray-400">Total Appearances</p>
                    <p className="text-white font-semibold">{player.stats.appearances}</p>
                </div>
                <div>
                    <p className="text-gray-400">Goals</p>
                    <p className="text-white font-semibold">{player.stats.goals || 0}</p>
                </div>
                <div>
                    <p className="text-gray-400">Assists</p>
                    <p className="text-white font-semibold">{player.stats.assists || 0}</p>
                </div>
                <div>
                    <p className="text-gray-400">Clean Sheets</p>
                    <p className="text-white font-semibold">{player.stats.cleanSheets || 0}</p>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-900 p-4 sm:p-8 flex">
            <div className="w-72 bg-indigo-950 p-6 rounded-lg mr-8 hidden lg:block">
                <QuickOverview />
                <h2 className="text-xl font-bold text-white mb-4">Players</h2>
                <ul className="space-y-3 max-h-[calc(100vh-300px)] overflow-y-auto">
                    {player.map((p, index) => (
                        <li
                            key={p.id}
                            className={`cursor-pointer text-gray-400 hover:text-white transition-colors duration-200 ${
                                index === currentPlayerIndex ? "text-white font-semibold" : ""
                            }`}
                            onClick={() => {
                                setCurrentPlayerIndex(index);
                                navigate(`/player/${encodeURIComponent(p.name)}`);
                            }}
                        >
                            {p.name}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="flex-grow flex flex-col lg:flex-row">
                <div className="lg:w-1/3 mb-8 lg:mb-0 lg:mr-8">
                    <PlayerCard player={player} />
                </div>
                <div className="lg:w-2/3 flex-grow overflow-hidden">
                    <div className="h-full overflow-y-auto">
                        <PlayerStats stats={player.stats} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerProfile;
*/