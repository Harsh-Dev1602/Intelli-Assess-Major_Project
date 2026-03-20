import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from "../Context/AuthProvider";
import UserMenu from './UserMenu';
import logo from '../../public/Logo_Img.png'

function Navbar() {
    const [authUser] = useAuth();

    return (
        <nav className="w-full sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 lg:px-0 h-20 flex justify-between items-center">
                
                {/* --- LOGO --- */}
                <Link to="/" className="flex items-center gap-2 group">
                    <img src={logo} alt="Logo" className="w-8 md:w-10 group-hover:rotate-12 transition-transform duration-300" />
                    <h2 className="text-[#002347] text-xl font-extrabold tracking-tight">
                        intelli<span className="text-orange-500">assess.</span>
                    </h2>
                </Link>

                

                {/* --- AUTH BUTTONS --- */}
                <div className="flex items-center gap-4">
                    {!authUser ? (
                        <>
                            <Link 
                                to="/login" 
                                className=" text-[#002347] font-bold text-sm hover:text-orange-500 transition"
                            >
                                Log in
                            </Link>
                            <Link 
                                to="/signup" 
                                className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white text-xs md:text-sm font-bold py-2.5 px-6 rounded-full shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 transition-all active:scale-95"
                            >
                                Sign up
                            </Link>
                        </>
                    ) : (
                        <UserMenu />
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar