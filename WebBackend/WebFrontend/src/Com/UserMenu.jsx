import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import toast from 'react-hot-toast'
import axios from 'axios';
import { MdLogout } from "react-icons/md";
import { useAuth } from "../Context/AuthProvider";

export default function UserMenu() {
    const [isOpen, setIsOpen] = useState(false);
    const [authUser, setAuthUser] = useAuth();

    const handleLogout = async (res) => {
        const confirmLogout = window.confirm("Are you sure you want to log out?");
        if (!confirmLogout) return;
        try {
            const res = await axios.post("/oes-api/user/logout");
            sessionStorage.removeItem("Online_Exam");
            toast.success("Log out successfully..");
            window.location.reload();
        }
        catch (error) {
            console.log("Error in Logout", error);
            toast.error("Error in logging out");
        }
    };
    return (
        <>  <span onClick={() => setIsOpen(false)} className={`${isOpen ? "fixed" : "hidden"} top-0 right-0 w-full cursor-pointer h-screen z-40 bg-transparent`}></span>
            <div className="relative inline-block text-left" onClick={() => setIsOpen(true)}  >
                {/* User Icon */}
                <button className="flex items-center space-x-2">
                    <FaUser className="text-4xl hover:border-2 hover:p-1 border-indigo-700 cursor-pointer text-indigo-700 bg-white rounded-xl p-1 transition" />
                </button>

                {/* Dropdown */}
                {isOpen && (
                    <div className="absolute z-50 w-40 transition-all duration-200 right-[5%] mt-2  BG_Color rounded-xl p-1 ">
                        <div className="bg-white rounded-xl  p-3">
                        <p className="font-bold text-xl text-center text-indigo-900">{authUser.user.fullname}</p>
                        <p className="text-center Text_Color font-bold">{authUser?.user?.role}</p>
                        <button
                            className="w-full font-bold cursor-pointer text-xl mt-2 bg-red-600 text-white flex gap-1 justify-center items-center  rounded-md hover:bg-red-700 p-1 transition"
                           onClick={handleLogout}
                        >
                          <MdLogout />  Log out
                        </button>
                    </div>
                    </div>
                )}
            </div>
        </>
    );
}
