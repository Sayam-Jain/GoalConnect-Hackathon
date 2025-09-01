import React, { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { propfind } from '../../../../backend/src/routes/scrape';

const MatchContainer = (props) => {

    // const navigate = useNavigate();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className='flex flex-col mt-4'>
            <div className='date text-gray-400'>{props.date} {props.month}</div>
            <div className='match-container'>
                <div className='score flex flex-col md:flex-row items-center gap-3 justify-center'>
                    <div className='team flex gap-1 items-center justify-center'>
                        <img src={props.team1Logo} className='w-8' alt="Team 1 Logo" />
                        <h1 className='text-[#a8b2ce] text-md text-center'>{props.team1Name}</h1>
                    </div>

                    {/* Center the score and dash */}
                    <h1 className='score-text text-5xl text-white md:text-3xl flex items-center justify-center'>
                        <span className="align-middle">{props.team1Score}</span>
                        <span className="mx-2 align-middle leading-none">-</span> {/* The dash centered */}
                        <span className="align-middle">{props.team2Score}</span>
                    </h1>

                    <div className='team flex gap-1 items-center justify-center'>
                        <img src={props.team2Logo} className='w-8' alt="Team 2 Logo" />
                        <h1 className='text-[#a8b2ce] text-md text-center'>{props.team2Name}</h1>
                    </div>
                </div>

                <div>
                    <h1 className='font-bold text-gray-200'>{props.tournamentName}</h1>
                </div>

                <div>
                    {
                        props.status === "live" ?
                            <Link to="/match-summary" state={{ day: props.day, venue: props.venue, team1Score: props.team1Score, team2Score: props.team2Score, team1Name: props.team1Name, team2Name: props.team2Name, date: props.date, month: props.month, status: props.status }}>
                                <button className='border border-gray-400 p-3 rounded hover:text-blue-300 text-white hover:border-blue-300'>
                                    Join live discussion
                                </button>
                            </Link>
                            : 
                            props.status === "past" ? 
                            <Link to="/match-summary" state={{ day: props.day, venue: props.venue, team1Score: props.team1Score, team2Score: props.team2Score, team1Name:props.team1Name, team2Name: props.team2Name, date: props.date, month:props.month, status:props.status}}>
                             <button className='border border-gray-400 p-3 rounded hover:text-blue-300 text-white hover:border-blue-300'>
                                 see details
                             </button>
                         </Link> : null
                    }
                </div>
            </div>
        </div>
    );
};

export default MatchContainer;
// {/*<Link to="/match-summary" state={{ day: props.day, venue: props.venue, team1Score: props.team1Score, team2Score: props.team2Score, team1Name:props.team1Name, team2Name: props.team2Name, date: props.date, month:props.month, status:props.status}}>
//                              <button className='border border-gray-400 p-3 rounded hover:text-blue-300 text-white hover:border-blue-300'>
//                                  Join live discussion
//                              </button>
//                          </Link> /*}
