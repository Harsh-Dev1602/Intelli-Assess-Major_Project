import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from "../Context/AuthProvider";
import UserMenu from './UserMenu';

function Navbar() {
    const [authUser, setAuthUser] = useAuth();
    // const NavText = [
    //     {
    //         id: 0,
    //         text: "Home",
    //         link:"/"
    //     }, {
    //         id: 1,
    //         text: "About Us",
    //     }, {
    //         id: 2,
    //         text: "Contect Us",
    //     },
    // ]
    return (
        <>
            <div className=" w-full mx-auto h-15 py-1 md:px-10 px-2 rounded-b-xl  bg-white flex justify-between 
            items-center ">
                <Link to="/">
                    <h2 className=' font-bold text-gray-900'>Intelli-Assess</h2>
                </Link>
                {/* <ul className=' hidden lg:flex  items-center justify-center gap-5'>
                    {
                        NavText.map(({ id, text,link }) => (
                            <Link to={link} key={id} className=' font-bold  hover:bg-[#cccccc94] p-1 rounded-xl text-black cursor-pointer'>{text}</Link>
                        ))
                    }
                </ul> */}
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