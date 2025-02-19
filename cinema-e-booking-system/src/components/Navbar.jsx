import React from 'react';
import { ReactComponent as SearchIcon} from '../svg/SearchIcon.svg';

export default function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-600 via-blue-950 to-gray-600 p-5">
        <div className="container mx-auto flex justify-between items-center">
            
            {/* Website Name - stays aligned to the left */}
            <div className="text-white text-5xl font-semibold">
                <a href="/HomePage.jsx" className="hover:text-gray-200">Cinema E-Booking</a>
            </div>

            {/* Search Bar Container */}
            <div className="flex items-center space-x-1 mr-2 ml-2">

                {/* Search Bar */}
                <input
                    type="text"
                    placeholder="Search Movies"
                    className="w-80 pt-2 pb-2 pl-3 pr-3 rounded-2xl text-black border-2 border-white focus:outline-none focus:ring-2 focus:ring-gray-200" 
                />

                {/* Search Button */}
                <button 
                    className="bg-white px-3 py-2 rounded-2xl hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
                    onClick={() => alert('Search button clicked')} // Replace with actual search logic
                >
                    <SearchIcon className="w-7 h-7"/>
                </button>

            </div>

            {/* Registration and Login Button Container */}
            <div className="flex items-center space-x-2">

                {/* Registration Button */}
                <button
                    className="border-2 border-white text-white px-5 py-3 rounded-2xl hover:bg-white hover:text-gray-700"
                    onClick={() => window.location.href = '/Registration.jsx'} // Navigate to Registration page
                >
                    Register
                </button>

                {/* Login Button */}
                <button 
                    className="border-2 border-white text-white px-5 py-3 rounded-2xl hover:bg-white hover:text-gray-700"
                    onClick={() => window.location.href = '/LoginPage.jsx'} // Navigate to Login page
                >
                    Login
                </button>
            </div>
        </div>
    </nav>
  );
}
