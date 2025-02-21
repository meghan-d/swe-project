import React, { useState } from "react";
import { ReactComponent as SearchIcon} from '../svg/SearchIcon.svg';

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
  };
 
  
    return (
    <nav className="bg-white shadow-md p-4">
        <div className="mx-auto flex justify-between items-center py-2 px-6">
            
            {/* Website Name */}
            <div className="text-5xl font-bold">
                <a href="/" className="hover:text-gray-500">Cinema E-Booking</a>
            </div>

            {/* Search Bar */}
            <div className="flex items-centered border-4 border-gray-400 px-3 py-2 rounded-3xl bg-gray-200 sm:w-[200px] md:w-[300px] lg:w-[400px]">
                <input
                    type="text"
                    placeholder="Search Movies"
                    className="bg-transparent outline-none w-full"
                    value={searchQuery}
                    onChange={handleChange}
                />
                <button 
                    className="bg-white px-3 py-2 rounded-2xl border-2 border-gray-400 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-400 ml-2"
                    onClick={() => alert('Search button clicked')}> 
                    <SearchIcon className="w-7 h-7"/>
                </button>
            </div>

            {/* Sign Up & Log In Buttons */}
            <div className="right-6 top-4 flex flex-wrap justify-end gap-2 text-xl">
                <button className="border-4 border-gray-400 px-6 py-2 rounded-full w-[120px] bg-white focus:outlin-none focus:ring-2 focus:ring-gray-400"
                onClick={() => alert('Sign Up button clicked')}>Sign Up</button>
                <button className="border-4 border-gray-400 px-6 py-2 rounded-full w-[120px] bg-white focus:outlin-none focus:ring-2 focus:ring-gray-400"
                onClick={() => alert('Log In button clicked')}>Log In</button>
            </div>
        </div>
    </nav>
  );
}