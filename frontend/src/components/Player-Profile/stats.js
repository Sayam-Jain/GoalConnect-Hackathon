/*import React from "react";

const StatBox = ({ icon, value, label, large = false, circular = false }) => {
    if (value === undefined || value === null) return null;

    return (
        <div className={`bg-indigo-900 p-4 rounded-lg ${large ? "col-span-2" : ""}`}>
            <div className="flex items-center justify-between">
                {icon && <span className="text-white text-2xl">{icon}</span>}
                <div className={`text-right ${circular ? "relative" : ""}`}>
                    {circular && (
                        <div className="w-20 h-20 relative">
                            <svg className="w-20 h-20 transform -rotate-90">
                                <circle
                                    className="text-indigo-700"
                                    strokeWidth="5"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="30"
                                    cx="40"
                                    cy="40"
                                />
                                <circle
                                    className="text-orange-500"
                                    strokeWidth="5"
                                    strokeDasharray={2 * Math.PI * 30}
                                    strokeDashoffset={`${2 * Math.PI * 30 * (1 - value / 100)}`}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="30"
                                    cx="40"
                                    cy="40"
                                />
                            </svg>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl font-bold text-white">{value}</span>
                            </div>
                        </div>
                    )}
                    {!circular && <span className="text-4xl font-bold text-white">{value}</span>}
                    <p className="text-xs text-white mt-1">{label}</p>
                </div>
            </div>
        </div>
    );
};

function PlayerStats({ stats }) {
    return (
        <div className="bg-indigo-950 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">PLAYER STATS</h2>
                <select className="bg-indigo-900 text-white px-3 py-1 rounded">
                    <option>2024-25</option>
                </select>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <StatBox icon="⚽" value={stats.appearances} label="APPEARANCES" />
                <StatBox icon="⏱" value={stats.minutes} label="MINUTES" />
                <StatBox value={stats.cleanSheets} label="CLEAN SHEETS" />
                <StatBox value={stats.recoveries} label="RECOVERIES" />
                <StatBox circular value={stats.savesPercentage} label="SAVES PERCENTAGE" large />
                <StatBox value={stats.savesPerGame} label="SAVES/GAME" large />
                <StatBox value={stats.saves} label="SAVES" />
                <StatBox value={stats.punches} label="PUNCHES" />
                <StatBox value={stats.catches} label="CATCHES" />
                <StatBox value={stats.clearances} label="CLEARANCES" />
                <StatBox value={stats.successfulDistribution} label="GK SUCCESSFUL DISTRIBUTION" />
                <StatBox value={stats.passesPerGame} label="PASSES/GAME" large />
                <StatBox circular value={stats.passingAccuracy} label="PASSING ACCURACY PERCENTAGE" large />
                <StatBox value={stats.successfulPasses} label="SUCCESSFUL PASSES" />
                <StatBox value={stats.touches} label="TOUCHES" />
                <StatBox value={stats.shotsFaced} label="SHOTS FACED" />
                <StatBox icon="🥅" value={stats.goalsConceded} label="GOALS CONCEDED" />
                <StatBox value={stats.penaltiesSaved} label="PENALTIES SAVED" />
                <StatBox icon="🟨" value={stats.yellowCards} label="YELLOW CARDS" />
                <StatBox icon="🟥" value={stats.redCards} label="RED CARDS" />
                <StatBox value={stats.tackles} label="TACKLES" />
                <StatBox value={stats.interceptions} label="INTERCEPTIONS" />
                <StatBox value={stats.blocks} label="BLOCKS" />
                <StatBox value={stats.duelsWon} label="DUELS WON" />
                <StatBox value={stats.aerialDuelsWon} label="AERIAL DUELS WON" />
                <StatBox value={stats.fouls} label="FOULS" />
                <StatBox value={stats.goals} label="GOALS" />
                <StatBox value={stats.assists} label="ASSISTS" />
                <StatBox value={stats.chancesCreated} label="CHANCES CREATED" />
                <StatBox value={stats.shotsOnTarget} label="SHOTS ON TARGET" />
                <StatBox value={stats.shotsOffTarget} label="SHOTS OFF TARGET" />
                <StatBox value={stats.keyPasses} label="KEY PASSES" />
                <StatBox value={stats.successfulDribbles} label="SUCCESSFUL DRIBBLES" />
                <StatBox value={stats.touchesInOppositionBox} label="TOUCHES IN OPPOSITION BOX" />
                <StatBox value={stats.goalsPerGame} label="GOALS PER GAME" />
                <StatBox value={stats.goalConversionPercentage} label="GOAL CONVERSION %" />
            </div>
        </div>
    );
}

export default PlayerStats;
*/