import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
    // Check if user details are stored in local storage
    const userDetails = localStorage.getItem('adopterDetails');
    const isLoggedIn = userDetails !== null;
	console.log(userDetails)
	console.log(isLoggedIn)

    // Function to handle logout
    const handleLogout = () => {
        // Remove user details from local storage
        localStorage.removeItem('adopterDetails');
        // Force reload to update the UI
        window.location.reload();
    };

    return (
        <div className="sticky top-0 z-30 p-6 bg-slate-600">
            <header className="flex items-end justify-between">
                <Link to="/"><h1 className="text-3xl text-white">PetFinder</h1></Link>
                {isLoggedIn ? (
                    <div className="flex items-center">
                        <p className="mr-4 text-white">Hello, {JSON.parse(userDetails).fullname}</p>
                        <button className="p-1 text-white border-2 border-slate-700" onClick={handleLogout}>Logout</button>
                    </div>
                ) : (
                    <Link to="/login"><button className="p-1 text-white border-2 border-slate-700">Login</button></Link>
                )}
            </header>
        </div>
    );
}
