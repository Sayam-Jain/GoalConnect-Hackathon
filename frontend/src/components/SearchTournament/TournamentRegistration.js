import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { tournaments } from "./TournamentData"; // Import tournament data

function TournamentRegistration() {
    const { id } = useParams(); // Get the tournament ID from the URL
    const navigate = useNavigate();
    const [tournament, setTournament] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        team: "",
        agreeToTerms: false,
    });

    useEffect(() => {
        const foundTournament = tournaments.find((t) => t.id === parseInt(id));
        if (foundTournament) {
            setTournament(foundTournament);
        } else {
            // Redirect to a 404 page or back to the tournament list if not found
            navigate("/tournaments");
        }
    }, [id, navigate]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({ 
            ...formData, 
            [name]: type === 'checkbox' ? checked : value 
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.agreeToTerms) {
            console.log("Form submitted:", formData);
            alert(`You have successfully registered for ${tournament.name}!`);
            navigate("/tournaments"); // Redirect back to tournament list
        } else {
            alert("Please agree to the terms and conditions.");
        }
    };

    if (!tournament) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-900 text-gray-200 p-6 flex justify-center">
            <div className="max-w-lg w-full bg-gray-800 p-6 rounded-lg shadow-lg">
                <h2 className="text-3xl font-bold mb-4">Register for {tournament.name}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="name">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded-md text-gray-900"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full p-2 rounded-md text-gray-900"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-bold mb-2" htmlFor="team">
                            Team Name (Optional)
                        </label>
                        <input
                            type="text"
                            id="team"
                            name="team"
                            value={formData.team}
                            onChange={handleChange}
                            className="w-full p-2 rounded-md text-gray-900"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="mr-2"
                            />
                            <span className="text-sm">I agree to the terms and conditions</span>
                        </label>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md font-bold transition duration-300"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TournamentRegistration;
