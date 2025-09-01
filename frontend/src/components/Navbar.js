import React from 'react';  
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as FootballLogo } from "../assets/football-logo.svg";
import { ReactComponent as ProfilePic } from "../assets/profile-pic.svg";
import { ReactComponent as Hamburger } from "../assets/hamburger.svg";

const Navbar = ({ scrollToMatchCenter, loggedIn, userRole }) => {
    const [menu, setMenu] = React.useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenu(prev => !prev);
    };

    const handleClubsClick = () => {
        navigate('/clubs'); 
    };

    const handleLogout = () => {
        // Clear the token from localStorage
        localStorage.removeItem('token');
        
        // Refresh the page to reset state
        window.location.reload();
    };

    const Menu = () => (
        <div className="menu absolute text-white bg-background-dark bg-opacity-[0.98] top-[20vh] w-[65vw] left-[20%] flex flex-col items-center justify-around rounded-lg">
            <Link
                to="/"
                className="text-xl border-b border-b-gray-500 text-center py-6 w-full flex items-center justify-center border-t-gray-500"
                onClick={scrollToMatchCenter}
            >
                Match hub
            </Link>
            <Link
                to="/crowdfunding"
                className="text-xl border-b border-b-gray-500 text-center py-6 w-full flex items-center justify-center border-t-gray-500"
            >
                Crowdfunding
            </Link>
            <Link
                to="/news"
                className="text-xl border-b border-b-gray-500 text-center py-6 w-full flex items-center justify-center border-t-gray-500"
            >
                News
            </Link>
            <Link to="/clubs" className="text-xl border-b border-b-gray-500 text-center py-6 w-full flex items-center justify-center border-t-gray-500">
                Clubs
            </Link>

            {loggedIn && (
                <>
                    <Link to="/DigitalFootballAcademy" className="text-xl border-b border-b-gray-500 text-center py-6 w-full flex items-center justify-center">Digital Football Academy</Link>
                    <Link to="/shop" className="text-xl text-center border-b border-b-gray-500 py-6 w-full flex items-center justify-center">Shop</Link>
                </>
            )}

            {loggedIn && userRole !== "User" && (
                <Link 
                    to={userRole === "Club" ? "/club-dashboard" : userRole === "Sponsor" ? "/sponsor-dashboard" : "/player-dashboard"} 
                    className="text-xl text-center py-6 w-full flex items-center justify-center border-t-gray-500"
                >
                    {userRole} Dashboard
                </Link>
            )}

            {loggedIn && (
                <button
                    onClick={handleLogout}
                    className="text-xl text-center py-6 w-full flex items-center justify-center border-t-gray-500 bg-red-500 text-white rounded-md"
                >
                    Logout
                </button>
            )}
        </div>
    );

    return (
        <nav className="sticky top-0 w-full flex justify-between items-center py-3 px-3 sm:px-10 bg-background-dark shadow-2xl shadow-slate-800/200 border-b border-b-gray-500 z-10 bg-opacity-[0.95]">
            <Link to="/">
                <div className="left flex justify-center items-center gap-3 text-white">
                    <FootballLogo className="w-9 h-9" />
                    <span className="text-xl max-[1074px]:text-[0.8rem] max-[363px]:hidden">Goal Connect</span>
                </div>
            </Link>

            <div className="right flex justify-center items-center gap-4 sm:gap-7 text-white">
                <Link to="/" className="hidden md:block text-xl hover:text-blue-300 transition-all duration-75 cursor-pointer" onClick={scrollToMatchCenter}>Match hub</Link>
                <Link to="/news" className="hidden md:block text-xl hover:text-blue-300 transition-all duration-75 cursor-pointer">News</Link>
                <Link to="/clubs" className="hidden md:block text-xl hover:text-blue-300 transition-all duration-75 cursor-pointer" onClick={handleClubsClick}>Clubs</Link>

                {loggedIn && (
                    <>
                        <Link to="/DigitalFootballAcademy" className="hidden md:block text-xl hover:text-blue-300 transition-all duration-75 cursor-pointer">Digital Football Academy</Link>
                        <Link to="/shop" className="hidden md:block text-xl hover:text-blue-300 transition-all duration-75 cursor-pointer">Shop</Link>
                    </>
                )}

                {loggedIn && userRole !== "User" && (
                    <Link 
                        to={userRole === "Club" ? "/club-dashboard" : userRole === "Sponsor" ? "/sponsor-dashboard" : "/player-dashboard"} 
                        className="hidden md:block text-xl hover:text-blue-300 transition-all duration-75 cursor-pointer"
                    >
                        {userRole} Dashboard
                    </Link>
                )}

                {loggedIn ? (
                    <>
                        <div className="login py-4 gap-2 rounded flex items-center justify-center cursor-pointer transition-all duration-75">
                            <ProfilePic className="h-8 w-10" />
                        </div>
                        {/* Add Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition-all"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login">
                            <div className="login hover:border-gray-400 border border-gray-500 py-1 px-3 gap-2 rounded flex items-center justify-center cursor-pointer transition-all duration-75">
                                <span className="text-xl max-[1074px]:text-[0.8rem]">Login</span>
                            </div>
                        </Link>
                        <Link to="/signup">
                            <div className="login hover:border-gray-400 border border-gray-500 py-1 px-3 gap-2 rounded flex items-center justify-center cursor-pointer transition-all duration-75">
                                <span className="text-xl max-[1074px]:text-[0.8rem]">Sign up</span>
                            </div>
                        </Link>
                    </>
                )}

                <div className="hamburger md:hidden block border border-gray-500 py-1 px-3 gap-2 rounded flex items-center justify-center cursor-pointer">
                    <Hamburger onClick={toggleMenu} className="md:hidden block h-8 w-6" />
                </div>
            </div>

            {menu && <Menu />}
        </nav>
    );
};

export default Navbar;
