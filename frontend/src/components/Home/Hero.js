import React from 'react'
import { Link } from 'react-router-dom'

const Hero = ({ scrollToMatchCenter, loggedIn }) => {
    return (
        <div className="hero relative h-[90vh] lg:h-[92vh]">
            <div className="absolute inset-0 bg-cover bg-background-hero opacity-20 bg-center bg-no-repeat"></div>
            <div className="relative z-1 flex h-full w-full items-center justify-center gap-[6rem] flex-col p-4">
                <div className="heading flex flex-col gap-3 justify-center items-center">
                    <h1 className="text-white sm:text-6xl text-5xl font-bold text-center sm:w-[60%]">Welcome to the Indian Football Community</h1>
                    <span className="text-gray-300 sm:text-xl text-xl text-center sm:w-[60%]">Track player performances, support your favorite clubs, engage in live matches and much more all in one place.</span>
                </div>
                <div className='bottom-hero flex flex-col justify-center gap-1 md:gap-3 items-center text-xl text-slate-200 font-medium'>
                    {loggedIn ? null :
                        <>
                            <Link to="/signup" className='border border-white p-3 rounded hover:text-blue-300 hover:border-blue-300'>
                                Sign up as a coach/player
                            </Link>
                            <span className=''>or</span>
                        </>}

                    <div className='explore flex flex-col items-center cursor-pointer hover:text-blue-300 hover:border-blue-300 animate-pulse'>
                        <span className='text-blue-200 text-3xl font-normal hover:font-semibold' onClick={scrollToMatchCenter}>Explore now</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
