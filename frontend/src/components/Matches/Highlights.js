import React, { useState } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa';

const highlights = [
    { id: 1, title: "Goal by Player A", videoId: "102wy13RhbM", thumbnailUrl: "https://i.ytimg.com/vi/102wy13RhbM/hqdefault.jpg" },
    { id: 2, title: "Amazing Save by Goalkeeper", videoId: "-hnj58VFUYA", thumbnailUrl: "https://i.ytimg.com/vi/-hnj58VFUYA/hqdefault.jpg" },
    { id: 3, title: "Goal by Player B", videoId: "2c-7V3jFAwA", thumbnailUrl: "https://i.ytimg.com/vi/2c-7V3jFAwA/hqdefault.jpg" },
];

const Highlights = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [error, setError] = useState(null);

    const openVideo = (videoId) => {
        setSelectedVideo(videoId);
        setError(null);
    };

    const closeVideo = () => {
        setSelectedVideo(null);
        setError(null);
    };

    return (
        <section className="mb-8 max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-6 text-center text-primary">Match Highlights</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {highlights.map((highlight) => (
                    <div key={highlight.id} className="bg-card-background border border-gray-700 shadow-lg rounded-lg overflow-hidden transition-transform duration-300 hover:scale-105">
                        <div className="relative">
                            <img src={highlight.thumbnailUrl} alt={highlight.title} className="w-full h-48 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => openVideo(highlight.videoId)}
                                    className="bg-primary text-white rounded-full p-3 hover:bg-primary-dark transition-colors duration-300"
                                >
                                    <FaPlay />
                                </button>
                            </div>
                        </div>
                        <div className="p-4">
                            <h3 className="font-semibold text-lg mb-2">{highlight.title}</h3>
                            <button
                                onClick={() => openVideo(highlight.videoId)}
                                className="text-blue-500 hover:underline"
                            >
                                Watch Video
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {selectedVideo && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="relative w-full max-w-4xl bg-card-background rounded-lg overflow-hidden">
                        <button
                            onClick={closeVideo}
                            className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 z-10"
                        >
                            <FaTimes />
                        </button>
                        <div className="aspect-w-16 aspect-h-9">
                            <iframe
                                src={`https://www.youtube.com/embed/${selectedVideo}`}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                className="w-full h-full"
                                onError={() => setError("Failed to load video. Please try again later.")}
                            ></iframe>
                        </div>
                        {error && (
                            <div className="p-4 text-red-500 text-center">{error}</div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
};

export default Highlights;
