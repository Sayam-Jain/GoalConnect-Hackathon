import React, { useState } from 'react'; 
import { useNavigate } from 'react-router-dom';

const CreateCampaign = () => {
    const navigate = useNavigate();
    const [clubName, setClubName] = useState('');
    const [clubLogo, setClubLogo] = useState(null); // Add state for club logo
    const [amount, setAmount] = useState('');
    const [customMessage, setCustomMessage] = useState('');
    const backend = process.env.REACT_APP_BACKEND_URL

    // Handle club logo upload
    const handleClubLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setClubLogo(reader.result); // Convert file to base64 string
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure all fields are filled
        if (!clubName || !clubLogo || !amount || !customMessage) {
            alert("Please fill out all fields.");
            return;
        }

        const campaignData = {
            title: clubName,
            logo: clubLogo,
            description: "This is a custom crowdfunding campaign.",
            fundingGoal: `₹${amount}`,
            currentFunding: "₹0",
            customMessage: customMessage,
        };

        try {
            const response = await fetch(`${backend}/apis/campaigns`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(campaignData),
            });

            if (response.ok) {
                alert('Campaign created successfully!');
                navigate('/crowdfunding', { state: { clubName: clubName, clubLogo: clubLogo } });
            } else {
                alert('Failed to create campaign.');
            }
        } catch (error) {
            console.error('Error creating campaign:', error);
            alert('An error occurred while creating the campaign.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="w-full max-w-md bg-gray-800 text-white p-6 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold mb-4">Create Crowdfunding Campaign</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2" htmlFor="clubName">
                            Club Name
                        </label>
                        <input
                            type="text"
                            id="clubName"
                            value={clubName}
                            onChange={(e) => setClubName(e.target.value)}
                            placeholder="Enter club name"
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2" htmlFor="clubLogo">
                            Club Logo
                        </label>
                        <input
                            type="file"
                            id="clubLogo"
                            accept="image/*"
                            onChange={handleClubLogoChange}
                            className="w-full px-3 py-2 bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    {clubLogo && (
                        <div className="mb-4">
                            <img src={clubLogo} alt="Club Logo Preview" className="w-24 h-24 object-contain mx-auto" />
                        </div>
                    )}

                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2" htmlFor="amount">
                            Contribution Amount
                        </label>
                        <input
                            type="number"
                            id="amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-300 text-sm mb-2" htmlFor="customMessage">
                            Custom Message
                        </label>
                        <textarea
                            id="customMessage"
                            value={customMessage}
                            onChange={(e) => setCustomMessage(e.target.value)}
                            placeholder="Write a message for your supporters"
                            className="w-full px-3 py-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-600"
                            rows="4"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300"
                    >
                        Submit Campaign
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateCampaign;
