import React, { useState, useEffect } from 'react';
import { FaVoteYea, FaChartBar, FaUndo, FaPlus, FaMinus } from 'react-icons/fa';

const initialPollsData = [
    {
        id: 1,
        question: "Who was the man of the match?",
        options: [
            { label: 'Player A', votes: 20 },
            { label: 'Player B', votes: 40 },
            { label: 'Player C', votes: 30 },
            { label: 'Player D', votes: 10 },
        ],
    },
    {
        id: 2,
        question: "Will Team A win the next match?",
        options: [
            { label: 'Yes', votes: 60 },
            { label: 'No', votes: 40 },
        ],
    },
];

const Polls = () => {
    const [pollsData, setPollsData] = useState(initialPollsData);
    const [selectedPoll, setSelectedPoll] = useState({});
    const [pollSubmitted, setPollSubmitted] = useState({});
    const [showResults, setShowResults] = useState({});
    const [newPollQuestion, setNewPollQuestion] = useState('');
    const [newPollOptions, setNewPollOptions] = useState(['', '']);

    useEffect(() => {
        const savedVotes = JSON.parse(localStorage.getItem('pollVotes')) || {};
        setPollSubmitted(savedVotes);
    }, []);

    const getTotalVotes = (pollOptions) => {
        return pollOptions.reduce((total, option) => total + option.votes, 0);
    };

    const handlePollChange = (pollId, option) => {
        setSelectedPoll({ ...selectedPoll, [pollId]: option.label });
    };

    const handlePollSubmit = (pollId) => {
        if (!selectedPoll[pollId]) return;

        const updatedPollsData = pollsData.map(poll => {
            if (poll.id === pollId) {
                return {
                    ...poll,
                    options: poll.options.map(opt =>
                        opt.label === selectedPoll[pollId] ? { ...opt, votes: opt.votes + 1 } : opt
                    )
                };
            }
            return poll;
        });

        setPollsData(updatedPollsData);
        setPollSubmitted({ ...pollSubmitted, [pollId]: true });
        setShowResults({ ...showResults, [pollId]: true });

        const newVotes = { ...pollSubmitted, [pollId]: true };
        localStorage.setItem('pollVotes', JSON.stringify(newVotes));
    };

    const toggleResults = (pollId) => {
        setShowResults({ ...showResults, [pollId]: !showResults[pollId] });
    };

    const resetPoll = (pollId) => {
        setSelectedPoll({ ...selectedPoll, [pollId]: '' });
        setPollSubmitted({ ...pollSubmitted, [pollId]: false });
        setShowResults({ ...showResults, [pollId]: false });

        const newVotes = { ...pollSubmitted };
        delete newVotes[pollId];
        localStorage.setItem('pollVotes', JSON.stringify(newVotes));
    };

    const addNewPollOption = () => {
        setNewPollOptions([...newPollOptions, '']);
    };

    const removeNewPollOption = (index) => {
        if (newPollOptions.length > 2) {
            const updatedOptions = newPollOptions.filter((_, i) => i !== index);
            setNewPollOptions(updatedOptions);
        }
    };

    const handleNewPollOptionChange = (index, value) => {
        const updatedOptions = newPollOptions.map((option, i) =>
            i === index ? value : option
        );
        setNewPollOptions(updatedOptions);
    };

    const submitNewPoll = () => {
        if (newPollQuestion && newPollOptions.every(option => option.trim() !== '')) {
            const newPoll = {
                id: Date.now(),
                question: newPollQuestion,
                options: newPollOptions.map(option => ({ label: option, votes: 0 })),
            };
            setPollsData([...pollsData, newPoll]);
            setNewPollQuestion('');
            setNewPollOptions(['', '']);
        }
    };

    return (
        <section className="w-full mb-8 mt-4 sm:mt-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Fan Polls</h2>
            <div className="space-y-6">
                {pollsData.map((poll) => {
                    const totalVotes = getTotalVotes(poll.options);
                    return (
                        <div key={poll.id} className="bg-card-background border border-gray-700 shadow-lg rounded-lg p-6">
                            <h3 className="text-xl font-semibold mb-4">{poll.question}</h3>
                            {poll.options.map((option, index) => {
                                const percentage = Math.round((option.votes / totalVotes) * 100) || 0;
                                return (
                                    <div key={index} className="mb-4">
                                        <label className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    type="radio"
                                                    name={`poll-${poll.id}`}
                                                    value={option.label}
                                                    checked={selectedPoll[poll.id] === option.label}
                                                    onChange={() => handlePollChange(poll.id, option)}
                                                    disabled={pollSubmitted[poll.id]}
                                                    className="mr-3 accent-blue-500 w-5 h-5"
                                                />
                                                <span className="text-lg">{option.label}</span>
                                            </div>
                                            {showResults[poll.id] && (
                                                <span className="text-lg font-medium">{percentage}%</span>
                                            )}
                                        </label>
                                        {showResults[poll.id] && (
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                                                <div
                                                    className="bg-blue-500 h-2.5 rounded-full transition-all duration-500"
                                                    style={{ width: `${percentage}%` }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                            <div className="flex flex-col sm:flex-row justify-between mt-4 space-y-2 sm:space-y-0 sm:space-x-2">
                                {!pollSubmitted[poll.id] ? (
                                    <button
                                        onClick={() => handlePollSubmit(poll.id)}
                                        className="bg-blue-500 text-white w-full sm:w-auto px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center justify-center"
                                        disabled={!selectedPoll[poll.id]}
                                    >
                                        <FaVoteYea className="mr-2" /> Submit Vote
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => resetPoll(poll.id)}
                                        className="bg-gray-500 text-white w-full sm:w-auto px-4 py-2 rounded hover:bg-gray-600 transition-colors flex items-center justify-center"
                                    >
                                        <FaUndo className="mr-2" /> Reset Vote
                                    </button>
                                )}
                                <button
                                    onClick={() => toggleResults(poll.id)}
                                    className="bg-green-500 text-white w-full sm:w-auto px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center justify-center"
                                >
                                    <FaChartBar className="mr-2" /> {showResults[poll.id] ? 'Hide' : 'Show'} Results
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-8 bg-card-background border border-gray-700 shadow-lg rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Create a New Poll</h3>
                <input
                    type="text"
                    value={newPollQuestion}
                    onChange={(e) => setNewPollQuestion(e.target.value)}
                    placeholder="Enter your poll question"
                    className="w-full p-2 mb-4 border border-gray-300 rounded text-black"
                />
                {newPollOptions.map((option, index) => (
                    <div key={index} className="flex mb-2">
                        <input
                            type="text"
                            value={option}
                            onChange={(e) => handleNewPollOptionChange(index, e.target.value)}
                            placeholder={`Option ${index + 1}`}
                            className="flex-grow p-2 border border-gray-300 rounded-l text-black"
                        />
                        <button
                            onClick={() => removeNewPollOption(index)}
                            className="bg-red-500 text-white px-3 py-2 rounded-r hover:bg-red-600 transition-colors"
                        >
                            <FaMinus />
                        </button>
                    </div>
                ))}
                <div className="flex justify-between mt-4">
                    <button
                        onClick={addNewPollOption}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors flex items-center"
                    >
                        <FaPlus className="mr-2" /> Add Option
                    </button>
                    <button
                        onClick={submitNewPoll}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors flex items-center"
                    >
                        <FaVoteYea className="mr-2" /> Create Poll
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Polls;
