/*import React from "react";

const PlayerCard = ({ player }) => {
    const { name, fullImage, club, position, age, height, jerseyNumber, country } = player;

    return (
        <div className="w-full h-full bg-gradient-to-br from-red-700 to-red-900 rounded-3xl overflow-hidden shadow-2xl">
            <div className="relative h-2/3">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-red-900 z-10"></div>
                <img src={fullImage} alt={name} className="w-full h-full object-cover object-top" />
                <div className="absolute bottom-0 left-0 p-6 z-20">
                    <h2 className="text-4xl font-bold text-white mb-1">{name}</h2>
                    <p className="text-xl text-red-200">{position}</p>
                </div>
            </div>
            <div className="p-6 flex justify-between items-center">
                <div>
                    <p className="text-red-200 mb-1">Club</p>
                    <p className="text-white font-semibold">{club}</p>
                </div>
                <div className="text-center">
                    <p className="text-6xl font-bold text-white">{jerseyNumber}</p>
                    <p className="text-red-200">Jersey</p>
                </div>
            </div>
            <div className="px-6 pb-6 flex justify-between text-white">
                <div>
                    <p className="text-red-200 text-sm">Age</p>
                    <p className="font-semibold">{age}</p>
                </div>
                <div>
                    <p className="text-red-200 text-sm">Height</p>
                    <p className="font-semibold">{height} cm</p>
                </div>
                <div>
                    <p className="text-red-200 text-sm">Country</p>
                    <p className="font-semibold">{country}</p>
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
*/