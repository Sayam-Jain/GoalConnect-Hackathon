import React, { useState } from 'react';
import { FaTrophy, FaChevronUp, FaChevronDown } from 'react-icons/fa';

const initialFans = [
    { id: 1, name: 'John Doe', points: 350, rank: 1, avatar: 'https://static.vecteezy.com/system/resources/thumbnails/008/846/297/small_2x/cute-boy-avatar-png.png' },
    { id: 2, name: 'Jane Smith', points: 320, rank: 2, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_eukhvLBMQhgmyHtjhs6sUEYk5Tcps5iDC5aBsSBQ0o0x1dcKh-OZSx77MHJqhue8Nqc&usqp=CAU' },
    { id: 3, name: 'Alex Johnson', points: 310, rank: 3, avatar: 'https://www.pngarts.com/files/3/Girl-Avatar-PNG-Image-Transparent.png' },
    { id: 4, name: 'Emily Brown', points: 290, rank: 4, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPtJ1GSMcrDjNkB6Y_IZQwK4watXeN1fvgAQ&s' },
    { id: 5, name: 'Michael Lee', points: 280, rank: 5, avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWZnYDaiNSg0EpdFixaCtkUT4KekWhMBHbj1PxQKfDisriocRq8x3_nvOH3OzL-lOclEU&usqp=CAU' },
];

const FanLeaderboard = () => {
    const [fans, setFans] = useState(initialFans);
    const [sortOrder, setSortOrder] = useState('desc');

    const sortFans = () => {
        const sortedFans = [...fans].sort((a, b) => {
            return sortOrder === 'asc' ? a.points - b.points : b.points - a.points;
        });
        setFans(sortedFans);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Fan Leaderboard</h2>
            <div className="bg-card-background border border-gray-700 shadow-lg rounded-lg overflow-hidden">
                <table className="w-full table-auto">
                    <thead>
                        <tr className="bg-gray-800 text-white">
                            <th className="py-3 px-4 text-left">Rank</th>
                            <th className="py-3 px-4 text-left">Fan</th>
                            <th className="py-3 px-4 text-right cursor-pointer" onClick={sortFans}>
                                Points {sortOrder === 'asc' ? <FaChevronUp className="inline" /> : <FaChevronDown className="inline" />}
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fans.map((fan, index) => (
                            <tr key={fan.id} className={`border-b border-gray-700 hover:bg-gray-700 transition-colors ${index < 3 ? 'font-semibold' : ''}`}>
                                <td className="py-4 px-4">
                                    {index < 3 ? (
                                        <FaTrophy className={`inline mr-2 ${index === 0 ? 'text-yellow-400' : index === 1 ? 'text-gray-400' : 'text-yellow-700'}`} />
                                    ) : null}
                                    {fan.rank}
                                </td>
                                <td className="py-4 px-4 flex items-center">
                                    <img src={fan.avatar} alt={fan.name} className="w-10 h-10 rounded-full mr-3" />
                                    {fan.name}
                                </td>
                                <td className="py-4 px-4 text-right">{fan.points}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FanLeaderboard;
