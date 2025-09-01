import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const Crowdfunding = () => {
  const [clubsData, setClubsData] = useState([]);
  const location = useLocation();
  const { customMessage } = location.state || {};
  const [contributionAmount, setContributionAmount] = useState('');
  const [selectedClub, setSelectedClub] = useState(null);
  
  const backend = process.env.REACT_APP_BACKEND_URL
  // Fetch campaigns from the backend
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${backend}/apis/campaigns`); // Adjust the API URL if necessary
        if (response.ok) {
          const data = await response.json();
          setClubsData(data); // Set the fetched campaigns
        } else {
          console.error('Failed to fetch campaigns');
        }
      } catch (error) {
        console.error('Error fetching campaigns:', error);
      }
    };

    fetchCampaigns();
  }, []); // Empty dependency array ensures this runs only once on mount

  const handleContributeClick = (club) => {
    setSelectedClub(club);
    const amount = prompt(`Enter the amount you want to contribute to ${club.title}`);
    if (amount && !isNaN(amount)) {
      setContributionAmount(amount);
      initiateRazorpayPayment(amount, club);
    } else {
      alert('Please enter a valid amount.');
    }
  };

  const initiateRazorpayPayment = async (amount, club) => {
    const amountInPaise = amount * 100; // Convert to paise

    try {
      // Call backend to create the Razorpay order
      const response = await fetch(`${backend}/razorpay/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amountInPaise }),
      });

      const orderData = await response.json();

      // Open Razorpay payment modal
      const options = {
        key: 'rzp_test_iVFlHfIHXJjTX9', // Replace with your Razorpay key
        amount: amountInPaise,
        currency: 'INR',
        name: club.title,
        description: 'Support the club!',
        order_id: orderData.id, // The order ID returned from the backend
        handler: function (response) {
          alert(`Payment successful for ${club.title}!`);
          updateFunding(club, amount); // Update funding after payment
        },
        prefill: {
          name: 'Customer Name',
          email: 'customer@example.com',
          contact: '9999999999',
        },
        theme: {
          color: '#F37254',
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error('Payment failed', error);
      alert('Something went wrong with the payment.');
    }
  };

  const updateFunding = (club, amount) => {
    const updatedClubsData = clubsData.map((c) => {
      if (c._id === club._id) {
        // Update the club's current funding
        const newFunding = parseInt(c.currentFunding.replace(/₹|,/g, '')) + parseInt(amount);
        return { ...c, currentFunding: `₹${newFunding.toLocaleString('en-IN')}` };
      }
      return c;
    });

    // Update the state with the new funding data
    setClubsData(updatedClubsData);
  };

  return (
    <div className="flex flex-col items-center py-10 bg-black min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-white">Support Your Favorite Football Clubs</h1>
      <p className="text-sm mb-10 text-gray-400">CONTRIBUTE TO CLUB DEVELOPMENT AND JOIN THE JOURNEY</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-7xl px-4">
        {clubsData.map((club, index) => {
          const fundingGoal = parseInt(club.fundingGoal.replace(/₹|,/g, ''));
          const currentFunding = parseInt(club.currentFunding.replace(/₹|,/g, ''));

          if (isNaN(fundingGoal) || isNaN(currentFunding)) {
            console.error(`Invalid funding data for ${club.title}`);
            return null;
          }

          return (
            <div
              key={index}
              className="border border-gray-600 p-6 flex flex-col justify-between bg-gray-800 rounded-lg shadow-lg hover:shadow-xl cursor-pointer transition-all ease-in-out duration-300 transform hover:scale-105"
            >
              <div>
                <img src={club.logo} alt={`${club.title} logo`} className="w-24 h-24 mx-auto mb-4 object-cover" />
                <h2 className="text-xl font-bold mb-3 text-white text-center">{club.title}</h2>
                <p className="text-sm text-gray-300 mb-2 text-center">{customMessage}</p>
                <div className="text-center mb-4">
                  <p className="text-sm text-gray-400">Funding Goal: {club.fundingGoal}</p>
                  <div className="relative w-full bg-gray-600 rounded-full h-3 mb-2">
                    <div
                      className="bg-green-400 h-3 rounded-full"
                      style={{ width: `${(currentFunding / fundingGoal) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-green-400">{club.currentFunding} raised</p>
                </div>
              </div>
              <button
                className="bg-orange-600 text-white py-2 px-5 rounded mt-4 hover:bg-orange-500 transition duration-300"
                onClick={() => handleContributeClick(club)}
              >
                Contribute
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Crowdfunding;
