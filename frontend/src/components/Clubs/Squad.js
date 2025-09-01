import React from "react";
import { useState } from "react";
import { squads } from "./Squaddata";
import { useNavigate } from "react-router-dom";

const PlayerCard = ({ player, position, clubColor }) => {
  const navigate = useNavigate();

  const getStatLabel = (position) => {
    switch (position) {
      case "GOALKEEPERS":
        return ["SAVES", "CLEAN SHEETS"];
      case "DEFENDERS":
        return ["TACKLES", "ASSISTS"];
      default:
        return ["GOALS", "ASSISTS"];
    }
  };

  const [stat1Label, stat2Label] = getStatLabel(position);

  return (
    <div className="relative w-full aspect-[3/4] max-w-sm mx-auto">
      <div className={`absolute inset-0 bg-gradient-to-br from-gray-900 via-${clubColor}-900 to-${clubColor}-700 rounded-lg shadow-lg overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black opacity-50"></div>
        <div className={`absolute top-0 right-0 text-9xl font-bold text-${clubColor}-500 opacity-10 z-10`}>
          {player.jerseyNumber}
        </div>
        <div className="relative z-2 p-4 h-full flex flex-col justify-between">
          <div>
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-56 object-cover object-top rounded-lg"
            />
            <h3 
              className="text-xl font-semibold text-white mt-4 cursor-pointer hover:underline"
              onClick={() => navigate(`/player/${encodeURIComponent(player.name)}`)}
            >
              {player.name}
            </h3>
          </div>
          <div className="grid grid-cols-3 gap-2 bg-black bg-opacity-30 p-2 rounded-lg mt-2">
            <StatBox label="MATCHES PLAYED" value={player.matchesPlayed} />
            <StatBox
              label={stat1Label}
              value={player[stat1Label.toLowerCase()]}
            />
            <StatBox
              label={stat2Label}
              value={player[stat2Label.toLowerCase()]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatBox = ({ label, value }) => (
  <div className="text-center">
    <p className="text-blue-300 font-semibold text-xs">{label}</p>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const PositionGroup = ({ title, players, clubColor }) => (
  <div className="mb-10">
    <h2 className={`text-2xl font-bold text-${clubColor}-300 mb-4`}>{title}</h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {players.map((player, index) => (
        <PlayerCard key={index} player={player} position={title} clubColor={clubColor} />
      ))}
    </div>
  </div>
);

const CoachCard = ({ coach, clubColor }) => (
  <div className={`bg-${clubColor}-800 rounded-lg shadow-lg p-4 m-2 relative overflow-hidden transform transition-all duration-300 hover:scale-105`}>
    <img
      src={coach.image}
      alt={coach.name}
      className="w-full h-64 object-cover object-top rounded-lg"
    />
    <h3 className={`text-xl font-semibold text-${clubColor}-300 mt-4`}>{coach.name}</h3>
    <p className="text-gray-400">Coach</p>
  </div>
);

const Squad = ({ clubName, clubColor }) => {
  const currentSquad = squads.find(squad => squad.name.toLowerCase() === clubName.toLowerCase());

  if (!currentSquad) {
    return <div className="text-white">No squad data available for {clubName}.</div>;
  }

  return (
    <div className={`max-w-7xl mx-auto px-4 py-8 font-sans bg-${clubColor}-900 text-white`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className={`text-4xl font-bold text-${clubColor}-300`}>
          {currentSquad.name} Squad
        </h1>
      </div>

      {currentSquad.players.goalkeepers && (
        <PositionGroup
          title="GOALKEEPERS"
          players={currentSquad.players.goalkeepers}
          clubColor={clubColor}
        />
      )}
      {currentSquad.players.defenders && (
        <PositionGroup
          title="DEFENDERS"
          players={currentSquad.players.defenders}
          clubColor={clubColor}
        />
      )}
      {currentSquad.players.midfielders && (
        <PositionGroup
          title="MIDFIELDERS"
          players={currentSquad.players.midfielders}
          clubColor={clubColor}
        />
      )}
      {currentSquad.players.forwards && (
        <PositionGroup
          title="FORWARDS"
          players={currentSquad.players.forwards}
          clubColor={clubColor}
        />
      )}

      {currentSquad.coach && (
        <div className="mb-10">
          <h2 className={`text-2xl font-bold text-${clubColor}-300 mb-4`}>COACH</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <CoachCard coach={currentSquad.coach} clubColor={clubColor} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Squad;
