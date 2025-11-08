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
            text: "Contact us",
            link: "/contact"

        }, {
            id: 3,
            text: "Privacy Policy",
            link: "/privacy-policy"

        }
    ]
    const Icon = [
        {
            id: 0,
            icon: <FaGithub />,
            link: "https://github.com/Harsh-Dev1602/Intelli-Assess-Major_Project"
        },
        {
            id: 1,
            icon: <FaSquareFacebook />,
            link: "https://www.facebook.com/"
        },
        {
            id: 2,
            icon: <FaSquareInstagram />,
            link: "https://www.instagram.com/"
        },
        {
            id: 3,
            icon: <BsYoutube />,
            link: "https://www.youtube.com/"
        },
    ]
    return (
        <>
            <div className="w-full rounded-t-xl h-120 lg:h-80 font-bold mt-2 flex flex-col lg:flex-row justify-evenly items-center bg-gray-950 ">
                <ul className='flex flex-col w-[80%] lg:w-auto items-center lg:items-start justify-center p-1 lg:px-15'>
                    {
                        NavText.map(({ id, text, link }) => (
                            <Link to={link} key={id} className='text-white hover:text-indigo-200 hover:underline transition-all duration-500 font-bold hover:bg-[#cccccc1c]  rounded-xl cursor-pointer py-1 px-5'>{text}</Link>
                        ))
                    }
                </ul>
                <div className='lg:w-1/2 p-5'>
                    <div className="w-full max-w-70 mx-auto Box_Shedow p-2 rounded-xl flex justify-center items-center flex-col gap-2 bg-white mb-10">
                        <h3 className="Text_Color ">FOLLOW US</h3>
                        <ul className=" flex  justify-center items-center gap-5">
                            {
                                Icon.map(({ id, icon, link }) => (
                                    <Link to={link} key={id} target="_blank"
                                        rel="noopener noreferrer" className="text-black bg-white cursor-pointer duration-200 hover:bg-[#0000002b] border-2 rounded-xl p-2 text-2xl">{icon}
                                    </Link>
                                ))
                            }
                        </ul>
                    </div>
                    <div className="w-full text-white text-center">© 2025 Intelli Assess, <span className='px-2'>All Rights Reserved.</span>  <br />             Empowering education through smart, secure, and scalable online assessments.
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer