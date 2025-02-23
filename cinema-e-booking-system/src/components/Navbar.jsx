import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate

export default function Navbar() {
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();  // Initialize navigation

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <nav className="bg-white shadow-md p-4 sticky top-0 z-50">
            <div className="mx-auto flex justify-between items-center py-2 px-6">
                <div className="text-5xl font-bold">
                    <a href="/" className="hover:text-gray-500">Cinema E-Booking</a>
                </div>

                <div className="flex items-center border-4 border-gray-400 px-3 py-2 rounded-3xl bg-gray-200 sm:w-[200px] md:w-[300px] lg:w-[400px]">
                    <input
                        type="text"
                        placeholder="Search Movies"
                        className="bg-transparent outline-none w-full"
                        value={searchQuery}
                        onChange={handleChange}
                    />
                </div>

                <div className="right-6 top-4 flex flex-wrap justify-end gap-2 text-xl">
                    <button className="border-4 border-gray-400 px-6 py-2 rounded-full w-[120px] bg-white"
                    onClick={() => alert('Sign Up button clicked')}>Sign Up</button>
                    
                    <button className="border-4 border-gray-400 px-6 py-2 rounded-full w-[120px] bg-white"
                    onClick={() => {
                        console.log("Navigating to /login");
                        navigate('/login');
                    }}>Log In</button>
                </div>
            </div>
        </nav>
    );
}
