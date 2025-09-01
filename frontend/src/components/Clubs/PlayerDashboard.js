import React, { useState } from "react";
import { Bar } from "react-chartjs-2"; 
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js"; 
import { Link } from 'react-router-dom';

// Register the components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function PlayerDashboard() {
    const [totalEarnings, setTotalEarnings] = useState(10000);
    const [lastMonthEarnings, setLastMonthEarnings] = useState(2500);
    const [upcomingEventsEarnings, setUpcomingEventsEarnings] = useState(1000);

    // Mock data for the bar chart
    const chartData = {
        labels: ['Total', 'Last Month', 'Upcoming Events'],
        datasets: [
            {
                label: 'Earnings ($)',
                data: [totalEarnings, lastMonthEarnings, upcomingEventsEarnings],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(75, 192, 192, 0.8)',
                ],
                borderColor: [
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(75, 192, 192, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    // Chart options with dark theme
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: 'white',
                },
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: 'white',
                bodyColor: 'white',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
            y: {
                ticks: {
                    color: 'white',
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.2)',
                },
            },
        },
    };

    // Handle form submission for updating earnings
    const handleSubmit = (e) => {
        e.preventDefault();
        const newTotal = parseFloat(e.target.totalEarnings.value);
        const newLastMonth = parseFloat(e.target.lastMonthEarnings.value);
        const newUpcoming = parseFloat(e.target.upcomingEventsEarnings.value);

        if (!isNaN(newTotal)) setTotalEarnings(newTotal);
        if (!isNaN(newLastMonth)) setLastMonthEarnings(newLastMonth);
        if (!isNaN(newUpcoming)) setUpcomingEventsEarnings(newUpcoming);
    };

    return (
        <div className="p-8 text-white">
            <header className="flex justify-between items-center mb-8">
                <div className="flex items-center">
                    <img src="https://placehold.co/50x50" alt="Club Logo" className="mr-4" />
                    <h1 className="text-2xl font-bold">Player Name</h1>
                </div>
            </header>

            {/* My Earnings Section */}
            <section className="mb-8">
                <h2 className="text-xl font-semibold mb-4">My Earnings</h2>
                <div className="flex flex-col bg-gray-800 p-6 rounded mb-4">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex justify-between">
                            <label>Total Earnings:</label>
                            <input
                                type="number"
                                name="totalEarnings"
                                value={totalEarnings}
                                onChange={(e) => setTotalEarnings(parseFloat(e.target.value))}
                                className="bg-gray-700 text-white border border-gray-600 rounded p-1 w-1/2"
                            />
                        </div>
                        <div className="flex justify-between">
                            <label>Last Month:</label>
                            <input
                                type="number"
                                name="lastMonthEarnings"
                                value={lastMonthEarnings}
                                onChange={(e) => setLastMonthEarnings(parseFloat(e.target.value))}
                                className="bg-gray-700 text-white border border-gray-600 rounded p-1 w-1/2"
                            />
                        </div>
                        <div className="flex justify-between">
                            <label>Upcoming Events:</label>
                            <input
                                type="number"
                                name="upcomingEventsEarnings"
                                value={upcomingEventsEarnings}
                                onChange={(e) => setUpcomingEventsEarnings(parseFloat(e.target.value))}
                                className="bg-gray-700 text-white border border-gray-600 rounded p-1 w-1/2"
                            />
                        </div>
                        <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
                            Update Earnings
                        </button>
                    </form>
                </div>

                {/* Earnings Chart */}
                <div className="bg-gray-800 p-6 rounded h-64">
                    <Bar data={chartData} options={chartOptions} />
                </div>
            </section>

            {/* Job Listings Section */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="bg-gray-800 p-6 rounded">
                    <h3 className="text-lg font-semibold mb-2">View Job Listings</h3>
                    <p className="mb-4">Browse available job listings for all the clubs.</p>
                    <Link to="/job-listings">
                        <button className="bg-purple-600 text-white py-2 px-4 rounded">View Listings</button>
                    </Link>
                </div>

                {/* Search for Nearby Tournaments Section */}
                <div className="bg-gray-800 p-6 rounded">
                    <h3 className="text-lg font-semibold mb-2">Search for Nearby Tournaments</h3>
                    <Link to="/tournaments" className="bg-green-600 text-white py-2 px-4 rounded">Search Tournaments</Link>
                </div>
            </section>

            {/* Define Routes */}
            
        </div>
    );
}

export default PlayerDashboard;
