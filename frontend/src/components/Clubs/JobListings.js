import React, { useState, useEffect } from 'react';

const JobListings = () => {
    const [jobListings, setJobListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const backend = process.env.REACT_APP_BACKEND_URL

    // Fetch job postings from the backend API
    useEffect(() => {
        const fetchJobListings = async () => {
            try {
                const response = await fetch(`${backend}/apis/job-postings`);
                if (response.ok) {
                    const data = await response.json();
                    setJobListings(data);  // Set the fetched data into state
                } else {
                    setError('Failed to fetch job listings');
                }
            } catch (err) {
                setError('An error occurred while fetching job listings');
            } finally {
                setLoading(false);  // Set loading to false after the data is fetched
            }
        };

        fetchJobListings();
    }, []);  // Empty dependency array ensures this runs once on component mount

    // Render loading state, error, or job listings
    return (
        <div className="p-8 text-white">
            <header className="mb-8">
                <h1 className="text-3xl font-bold">Job Listings</h1>
            </header>

            {loading ? (
                <p>Loading job listings...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {jobListings.map((job) => (
                        <div key={job._id} className="bg-gray-800 p-6 rounded-lg transition-transform transform hover:scale-105">
                            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
                            <p className="mb-4">{job.description}</p>
                            <h3 className="font-semibold">Requirements:</h3>
                            <p>{job.requirements}</p>
                        </div>
                    ))}
                </section>
            )}
        </div>
    );
};

export default JobListings;
