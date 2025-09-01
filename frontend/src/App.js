import React, { useRef, useEffect, useState } from "react"; 
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.js";
import Hero from "./components/Home/Hero.js";
import MatchCenter from "./components/Home/MatchCenter.js";
import ClubDashboard from "./components/Clubs/ClubDashboard.js";
import ClubsMenu from './components/Clubs/ClubsMenu.js';
import Crowdfunding from "./components/Crowdfunding.js";
import Digitalfootballacademy from "./components/Digitalfootballacademy.js";
import RegistrationPage from "./components/registration.js";
import News from "./components/News.js";
import ProductList from './components/e-commerce/product-list.js';
import JobApplicationForm from './components/JobApplicationForm.js';
import SignUp from './components/SignUp/index.js';
import Login from './components/Login/index.js';
import MatchSummaryPage from "./components/Matches/MatchSummary.js";
import PostNews from "./components/Clubs/PostNews.js";
import CreateCampaign from "./components/Clubs/CreateCampaign.js";
import ClubPage from "./components/Clubs/ClubPage.js";
import ClubTemp from "./components/Clubs/ClubTemp.js";
import Tournament from "./components/SearchTournament/Tournament.js";
import SponsorDashboard from "./SponsorDashboard.js";
import Sessions from "./components/Sessions.js";
//import PlayerProfile from "./components/Player-Profile/profile.js";
import JobListingForm from "./components/Clubs/JobListingForm.js";
import PlayerDashboard from "./components/Clubs/PlayerDashboard.js"; // Ensure this is imported correctly
import ProtectRoute from './components/ProtectRoute/index.js';
import JobListings from './components/Clubs/JobListings.js'; // Make sure this import is correct
import ScoutPlayer from './components/Clubs/ScoutPlayer.js';
import TournamentRegistration from "./components/SearchTournament/TournamentRegistration";
import axios from 'axios';
const App = () => {
  const matchCenterRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const backend = process.env.REACT_APP_BACKEND_URL
  // Function to scroll to match center
  const scrollToMatchCenter = () => {
    if (matchCenterRef.current) {
      matchCenterRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Check for token and get user role
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Get user data using the token
          const res = await axios.get(`${backend}/auth/protected`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const { role } = res.data;
          console.log(res);
          setIsLoggedIn(true); // User is logged in
          setUserRole(role);
          console.log(isLoggedIn);
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsLoggedIn(false);
          setUserRole(null); // Token is invalid or expired
        }
      } else {
        setIsLoggedIn(false);
        setUserRole(null) // No token found
      }
    };
    
    checkLoginStatus();
  }, []);

  return (
    <>
      <Navbar scrollToMatchCenter={scrollToMatchCenter} loggedIn={isLoggedIn} userRole={userRole} />
      <Routes>
        <Route path="/" element={
          <div>
            <Hero scrollToMatchCenter={scrollToMatchCenter} loggedIn={isLoggedIn} />
            <div ref={matchCenterRef}>
              <MatchCenter />
            </div>
          </div>
        } />
        <Route path="/club-dashboard" element={
            <ClubDashboard />
        } />
        <Route path="/crowdfunding" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole}>
            <Crowdfunding />
          </ProtectRoute>
        } />
        <Route path="/digitalfootballacademy" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole}>
            <Digitalfootballacademy />
          </ProtectRoute>
        } />
        <Route path="/registration" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole}>
            <RegistrationPage />
          </ProtectRoute>
        } />
        <Route path="/news" element={<News />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/job-listings" element={<JobListings />} /> {/* Moved here */}
        <Route path="/register/:id" element={<TournamentRegistration />} />
        <Route path="/apply" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole} >
            <JobApplicationForm />
          </ProtectRoute>
        } />
        <Route path="/shop" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole}>
            <ProductList />
          </ProtectRoute>
        } />
        <Route path="/clubs" element={<ClubsMenu />} />
        <Route path="/clubs/:clubName" element={<ClubPage />} />
        <Route path="/match-summary" element={<MatchSummaryPage />} />
        <Route path="/post-news" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole}>
            <PostNews />
          </ProtectRoute>
        } />
        <Route path="/create-campaign" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole}>
            <CreateCampaign />
          </ProtectRoute>
        } />
        <Route path="/player-dashboard" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole} allowedRoles={['Player']}>
            <PlayerDashboard />
          </ProtectRoute>
        } />
        <Route path="/tournaments" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole} allowedRoles={['Club','Player']}>
            <Tournament />x``
          </ProtectRoute>
        } />
        <Route path="/sponsor-dashboard" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole} allowedRoles={['Sponsor']}>
            <SponsorDashboard />
          </ProtectRoute>
        } />
        <Route path="/sessions" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole}>
            <Sessions />
          </ProtectRoute>
        } />
        <Route path="/club-temp" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole} allowedRoles={['Club', 'Player']}>
            <ClubTemp />
          </ProtectRoute>
        } />
        
        <Route path="/form" element={
          <ProtectRoute loggedIn={isLoggedIn} role={userRole}>
            <JobListingForm />
          </ProtectRoute>
        } />
        <Route path="/scout-players" element={
          <ProtectRoute loggedIn={isLoggedIn}>
            <JobListingForm />
          </ProtectRoute>
        } />
        <Route path="/scout-players" element={
          <ProtectRoute loggedIn={isLoggedIn}>
            <ScoutPlayer />
          </ProtectRoute>
        } />
      </Routes>
    </>
  );
};

export default App;
