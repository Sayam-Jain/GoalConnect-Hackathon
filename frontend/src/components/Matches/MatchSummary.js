import React, { useEffect } from 'react';
import MatchStatistics from './MatchStatistics.js';
import DiscussionForum from './DiscussionForum';
import Polls from './Polls';
import Highlights from './Highlights';
import FanLeaderboard from './FanLeaderboard';
import { useLocation } from 'react-router-dom';
import manImage from '../../assets/messi.png';

const MatchSummaryPage = () => {
    const location = useLocation();
    const matchState = location.state || 'No day provided'; // Fallback if state is null

    useEffect(() => {
        console.log('Match state:', matchState); // Log the passed state
    }, [matchState]);

    const matchData = {
        teams: {
            home: 'Siphir Venglun FC',
            away: 'Aizawl FC'
        },
        score: {
            home: 0,
            away: 1
        },
        date: '11 October 2024',
        time: '08:00 PM',
        stadium: 'RG Stadium',
        events: [
            { time: 72, playerIn: 'Liansanglura', playerOut: 'Malsawmfela', team: 'Siphir Venglun FC' },
            { time: 90, goal: true, player: 'Augustine Lalrochana', team: 'Aizawl FC' },
            { time: 88, yellowCard: true, player: 'Augustine Lalrochana', team: 'Aizawl FC' },
        ],
        lineup: [
            { number: 1, name: 'Player 1' },
            { number: 2, name: 'Player 2' },
            { number: 3, name: 'Player 3' },
            // Add the rest of the lineup players here
        ],
        bench: [
            'Bench Player 1', 'Bench Player 2', 'Bench Player 3'
        ],
        playerOfTheMatch: {
            name: 'Lalchhawnkima',
            image: manImage
        }
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="text-white relative w-full min-h-screen bg-cover bg-center bg-background-match-summary overflow-hidden">
            {/* Background overlay */}
            <div className="absolute inset-0 bg-black opacity-80"></div>

            <div className="relative z-2 flex flex-col min-h-screen">
                {/* Header */}
                <header className="bg-gray-900 p-4 text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold">Match Summary</h1>
                </header>

                {/* Main content area */}
                <div className="flex flex-col md:flex-row flex-grow overflow-hidden">
                    {/* Left sidebar */}
                    <aside className="w-full md:w-1/4 flex flex-col bg-gray-800 overflow-y-auto p-4">
                        <FanLeaderboard />
                        {
                            matchState.status === "past" ? (
                                <div className="mt-4">
                                    <div className="bg-blue-700 w-full text-white shadow-lg p-4 rounded-lg">
                                        <h3 className="text-lg font-semibold text-center mb-4">Player of the Match</h3>
                                        <div className="text-center">
                                            <img
                                                src={matchData.playerOfTheMatch.image}
                                                alt={matchData.playerOfTheMatch.name}
                                                className="mx-auto w-[8rem] sm:w-[10rem] h-[8rem] sm:h-[10rem] object-contain mb-2"
                                            />
                                            <p className="font-bold">{matchData.playerOfTheMatch.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ) : null
                        }
                    </aside>

                    {/* Center content */}
                    <main className="flex-1 flex flex-col p-4 overflow-y-auto">
                        <div className="mb-6">
                            <MatchStatistics matchData={matchData} matchPassed={matchState} />
                        </div>
                        {
                            matchState.status === "past" ? (
                                <div className="mb-6">
                                    <Highlights />
                                </div>
                            ) : null
                        }
                        {
                            matchState.status === "live" ? (
                                <div className="mt-auto">
                                    <DiscussionForum />
                                </div>
                            ) : null
                        }
                    </main>

                    {/* Right sidebar */}
                    <aside className="w-full md:w-1/4 bg-gray-800 p-4 overflow-y-auto mt-4 md:mt-0">
                        <Polls />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default MatchSummaryPage;
