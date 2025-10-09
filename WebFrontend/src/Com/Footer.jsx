import React from 'react'
import { Link } from 'react-router-dom'
import { BsYoutube } from "react-icons/bs";
import { FaSquareFacebook } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";

function Footer() {
    const NavText = [
        {
            id: 0,
            text: "Home",
            link: "/"
        }, {
            id: 1,
            text: "About us",
            link: "/about"

        }, {
            id: 2,
            text: "Contect us",
            link: "/contect"

        },
    ]
    const Icon = [
        {
            id: 0,
            icon: <FaGithub />,
            link:"https://github.com/Harsh-Dev1602/Intelli-Assess-Major_Project"
        },
        {
            id: 1,
            icon: <FaSquareFacebook />,
            link:"https://www.facebook.com/"
        },
        {
            id: 2,
            icon: <FaSquareInstagram />,
            link:"https://www.instagram.com/"
        },
        {
            id: 3,
            icon: <BsYoutube />,
            link:"https://www.youtube.com/"
        },
    ]
    return (
        <>
            <div className="w-full rounded-t-xl h-100 lg:h-70 font-bold mt-2 flex flex-col lg:flex-row justify-evenly items-center bg-gray-800 ">
                <div className="text-white text-center">© 2025 Intelli Assess. All Rights Reserved.</div>
                <ul className='flex flex-col w-[80%] lg:w-auto  items-center justify-center border-2 border-transparent border-y-white lg:border-y-transparent lg:border-x-white p-5 lg:px-20'>
                    {
                        NavText.map(({ id, text, link }) => (
                            <Link to={link} key={id} className='text-white hover:text-indigo-500 hover:underline transition-all duration-500 font-bold  rounded-xl cursor-pointer'>{text}</Link>
                        ))
                    }
                </ul>

                <div className="Box_Shedow p-4 rounded-xl flex justify-center items-center flex-col gap-2">
                    <h3 className="text-white font-bold ">FOLLOW US</h3>
                    <ul className=" flex  justify-center items-center gap-5">
                        {
                            Icon.map(({ id, icon,link }) => (
                                <Link to={link} key={id}>
                                <li  className="text-black bg-white cursor-pointer duration-200 hover:bg-[#fff4f4c1] rounded-xl p-2 text-2xl">{icon}</li>
                                </Link>
                            ))
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Footer