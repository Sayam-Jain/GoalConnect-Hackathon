import React, { useEffect, useState } from 'react';
import MatchContainer from '../../components/Home/MatchContainer.js';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios'


const MatchCenter = () => {
    let [showPast, setShowPast] = React.useState(true);

    const toggleShowPast = () => {
        setShowPast(prev => !prev);
    };

    const [matchData, setmatchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [liveMatches, setLiveMatches] = useState([]);
    const [upcomingMatches, setUpcomingMatches] = useState([]);
    const [pastMatches, setPastMatches] = useState([]);
    const [isUpdating, setIsUpdating] = useState(false);
    const backend = process.env.REACT_APP_BACKEND_URL
    // const navigate = useNavigate();
    const handleUpdateMatches = async () => {
        setIsUpdating(true);
        try {
            const response = await axios.get(`${backend}/scrape/scrape-fixtures`);
            setmatchData(response.data); // Update state with new data
            alert('Matches updated successfully!');
        } catch (error) {
            console.error("Update failed:", error);
            alert(`Update failed: ${error.response?.data?.message || error.message}`);
        } finally {
            setIsUpdating(false);
        }
    };
    useEffect(() => {
        const fetchmatchData = async () => {
            try {
                const response = await axios.get(`${backend}/apis/matches/fixtures`); // Adjust the URL as necessary
                setmatchData(response.data); // Set the data fetched from the backend
                setLoading(false); // Turn off loading state
            } catch (error) {
                console.error("Error fetching clubs data:", error);
                setLoading(false);
            }
        };

        fetchmatchData();
    }, []); // This will only run once, when the component mounts

    // Filter and set live matches when match data changes
    useEffect(() => {
        if (!loading && matchData.length > 0) { // Ensure that data has been fetched and is not empty
            const pastMatches = matchData.filter(match => match.status === "past");
            const liveMatches = matchData.filter(match => match.status === "live");
            const upcomingMatches = matchData.filter(match => match.status === "upcoming");

            console.log("Past Matches:", pastMatches);
            console.log("Live Matches:", liveMatches);
            console.log("Upcoming Matches:", upcomingMatches);

            // Set live matches to state
            setLiveMatches(liveMatches);
            setPastMatches(pastMatches);
            setUpcomingMatches(upcomingMatches);
        }
    }, [matchData, loading]);

    console.log(liveMatches)
    console.log(pastMatches)
    console.log(upcomingMatches)

    return (
        <div className='p-10 flex flex-col'>
            <div className="flex flex-row justify-between items-center">


            <h1 className='border-b border-b-gray-600 text-white text-6xl font-bold pb-4 mb-3'>Match Center</h1>
            <button 
                        onClick={handleUpdateMatches}
                        disabled={isUpdating}
                        style={{
                            padding: '0.5rem 1rem',
                            backgroundColor: '#22c55e',
                            display:'flex',
                            flexDirection:'column',
                            justifyContent:'space-between',
                            color: 'white',
                            borderRadius: '0.375rem',
                            cursor: isUpdating ? 'not-allowed' : 'pointer',
                            opacity: isUpdating ? 0.7 : 1
                        }}
                        >Update</button>
            </div>
            <div className='ongoing flex flex-col pb-4 mb-4 border-b border-b-gray-600'>
                <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 bg-red-600 rounded-full'></div>
                    <h1 className='text-3xl sm:text-4xl text-white font-semibold'>Ongoing matches</h1>
                    
                </div>
                
                {
                    liveMatches.map((match) => {
                        return (<MatchContainer
                            day={match.day}
                            date={match.date}
                            month={match.month}
                            team1Logo={match.team1Logo}
                            team1Name={match.team1Name}
                            team2Name={match.team2Name}
                            team2Logo={match.team2Logo}
                            team1Score={match.team1Score}
                            team2Score={match.team2Score}
                            time={match.time}
                            venue={match.venue}
                            tournamentName={match.tournamentName}
                            status = "live"
                            live={true} />)
                    })
                }
            </div>
            <div className='upcoming flex flex-col pb-4 mb-4 border-b border-b-gray-600'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-3xl sm:text-4xl text-white font-semibold' onClick={toggleShowPast}>Upcoming matches</h1>
                </div>
                {showPast ? (
                    <div>
                        {
                            upcomingMatches.map((match) => {
                                return (<MatchContainer
                                    day={match.day}
                                    date={match.date}
                                    month={match.month}
                                    team1Logo={match.team1Logo}
                                    team1Name={match.team1Name}
                                    team2Name={match.team2Name}
                                    team2Logo={match.team2Logo}
                                    team1Score={match.team1Score}
                                    team2Score={match.team2Score}
                                    time={match.time}
                                    venue={match.venue}
                                    tournamentName={match.tournamentName}
                                    status = "upcoming"
                                    live={false} />)
                            })
                        }
                    </div>
                ) : null}
            </div>
            <div className='ongoing flex flex-col pb-4 mb-4 border-b border-b-gray-600'>
                <div className='flex items-center gap-3'>
                    <h1 className='text-3xl sm:text-4xl text-white font-semibold' onClick={toggleShowPast}>Past matches</h1>
                </div>
                {showPast ? (
                    <div>
                        {
                            pastMatches.map((match) => {
                                return (<MatchContainer
                                    day={match.day}
                                    date={match.date}
                                    month={match.month}
                                    team1Logo={match.team1Logo}
                                    team1Name={match.team1Name}
                                    team2Name={match.team2Name}
                                    team2Logo={match.team2Logo}
                                    team1Score={match.team1Score}
                                    team2Score={match.team2Score}
                                    time={match.time}
                                    venue={match.venue}
                                    tournamentName={match.tournamentName}
                                    status = "past"
                                    live={false} />)
                            })
                        }
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default MatchCenter;
