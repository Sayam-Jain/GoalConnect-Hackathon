import React from 'react';

function ClubDetails({ club }) {
    return (
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <header className="flex items-center mb-6">
                <img src={club.logo} alt={`${club.name} logo`} className="w-24 h-24 mr-6" />
                <div>
                    <h1 className="text-4xl font-bold text-gray-800">{club.name}</h1>
                    <p className="text-gray-600 mt-2">{club.address}</p>
                </div>
            </header>
            <main className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                    <p className="text-gray-600 font-semibold">Founded</p>
                    <p className="text-2xl font-bold text-gray-800">{club.founded}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-semibold">President</p>
                    <p className="text-2xl font-bold text-gray-800">{club.president}</p>
                </div>
                <div>
                    <p className="text-gray-600 font-semibold">Players Registered</p>
                    <p className="text-2xl font-bold text-gray-800">{club.playersRegistered}</p>
                </div>
            </main>
            <div className="mt-6">
                <img src={club.image} alt={`${club.name} clubhouse`} className="w-full rounded-lg shadow-md" />
            </div>
        </div>
    );
}

export default ClubDetails;
