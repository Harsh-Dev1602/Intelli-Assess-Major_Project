import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../Context/AuthProvider";
import UserMenu from './UserMenu';
import logo from '../../public/Logo_Img.png'

function Navbar() {
    const [authUser, setAuthUser] = useAuth();

    return (
        <>
            <div className=" w-full mx-auto h-15 py-1 md:px-10 px-2 rounded-b-xl  bg-white flex justify-between 
            items-center ">
                <Link to="/" className='flex justify-center items-center'>
                    <img src={logo} className='w-5 min-[375px]:w-15'/>
                    <h2 className='Text_Color font-bold'>Intelli Assess</h2>
                </Link>

                <div className={`${authUser ? "hidden" : " "} font-bold rounded-xl  flex gap-2`}>
                    <Link to="/login" className='BG_Color  text-white cursor-pointer rounded-xl p-1 '>Log In</Link>
                    <Link to="/signup" className='Text_Color  border-2 border-[#4f39f6] cursor-pointer  rounded-xl p-1 '>Sign Up</Link>
                </div>

                <div className={`${authUser ? "block" : "hidden"}`}>
                    <UserMenu />
                </div>
            </div>
        </>
    )
}

export default Navbar