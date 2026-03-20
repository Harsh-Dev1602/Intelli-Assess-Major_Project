import React, { useState } from "react";
import { FaUserCircle, FaChevronDown } from "react-icons/fa";
import { MdLogout, MdDashboard, MdSettings } from "react-icons/md";
import toast from 'react-hot-toast'
import axios from 'axios';
import { useAuth } from "../Context/AuthProvider";
import { Link } from "react-router-dom";

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [authUser] = useAuth();

    const handleLogout = async () => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;
        try {
            await axios.post("/oes-api/user/logout");
            sessionStorage.removeItem("Online_Exam");
            toast.success("Logged out successfully");
            window.location.reload();
        } catch (error) {
            console.error("Logout Error:", error);
            toast.error("Error in logging out");
        }
    };

    return (
        <div className="relative">
            {/* Overlay to close dropdown when clicking outside */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-transparent"
                    onClick={() => setIsOpen(false)}
                ></div>
            )}

            {/* Trigger Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative z-50 flex items-center gap-2 group focus:outline-none"
            >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 group-hover:border-orange-500 transition-all">
                    <FaUserCircle className="text-2xl text-[#002347] group-hover:text-orange-500 transition-colors" />
                </div>
                <div className="hidden md:block text-left">
                    <p className="text-[#002347] text-xs font-bold leading-none">{authUser?.user?.fullname?.split(' ')[0]}</p>
                    <p className="text-gray-400 text-[10px] uppercase font-bold tracking-tighter">{authUser?.user?.role}</p>
                </div>
                <FaChevronDown className={`text-[10px] text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-lg shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                    <div className="p-4 bg-gray-50 border-b border-gray-100">
                        <p className="text-[#002347] font-extrabold text-sm">{authUser?.user?.fullname}</p>
                        <p className="text-gray-500 text-xs truncate">{authUser?.user?.email}</p>
                    </div>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-50 rounded-md transition-colors font-semibold"
                    >
                        <MdLogout size={18} /> Log out
                    </button>

                </div>
            )}
        </div>
    );
}