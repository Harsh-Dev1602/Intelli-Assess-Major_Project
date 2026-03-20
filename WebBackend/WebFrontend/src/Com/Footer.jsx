import React from 'react'
import { Link } from 'react-router-dom'
import { BsTwitter } from "react-icons/bs";
import { FaFacebookF, FaInstagram, FaGithub, FaPaperPlane } from "react-icons/fa";
import logo from '../../public/Logo_Img.png'

function Footer() {

    
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
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
            text: "Privacy policy",
            link: "/privacy-policy"

        }
    ]
    return (
        <footer className="w-full bg-[#f8f9fa] pt-20 pb-10 px-6 lg:px-20 border-t border-gray-100">
            <div className=" mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24 mb-16">
                
                <div className="flex flex-col gap-6">
                    <Link to="/" className="flex items-center gap-2">
                        <img src={logo} alt="Logo" className="w-8" />
                        <h2 className="text-[#002347] text-2xl font-extrabold">intelli<span className="text-orange-500">assess.</span></h2>
                    </Link>
                    <p className="text-gray-500 text-sm leading-relaxed">
                        But when shot real her, Chamber her one make removal six sending himself boys sect corporate car sold un. <br/><br/>
                        But when shot real her her her.
                    </p>
                    <div className="flex gap-4">
                        {[
                            { icon: <FaFacebookF />, link: "#" },
                            { icon: <BsTwitter />, link: "#" },
                            { icon: <FaInstagram />, link: "#" },
                            { icon: <FaGithub />, link: "#" },
                        ].map((social, idx) => (
                            <a key={idx} href={social.link} className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                                {social.icon}
                            </a>
                        ))}
                    </div>
                </div>

                {/* --- COLUMN 2: NEWSLETTER --- */}
                <div>
                    <h3 className="text-[#002347] text-xl font-bold mb-8">Newsletter</h3>
                    <p className="text-gray-500 text-sm mb-6">Stay updated with our latest trends. Seed heaven so said place winged over given forth fruit.</p>
                    <div className="relative flex items-center">
                        <input 
                            type="email" 
                            placeholder="Enter email address" 
                            className="w-full bg-white border border-gray-200 py-3 px-4 rounded-sm focus:outline-none focus:border-orange-400 text-sm"
                        />
                        <button className="absolute right-0 top-0 h-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-5 rounded-r-sm hover:opacity-90 transition">
                            <FaPaperPlane size={14}/>
                        </button>
                    </div>
                </div>

                {/* --- COLUMN 3: CONTACT --- */}
                <div>
                    <h3 className="text-[#002347] text-xl font-bold mb-8">Contact us</h3>
                    <div className="flex flex-col gap-4 text-sm text-gray-500">
                        <p><span className="text-[#002347] font-semibold block">Address :</span> Indore (M.P.)</p>
                        <p><span className="text-[#002347] font-semibold block">Phone :</span> +2 35 245 (3333)</p>
                        <p><span className="text-[#002347] font-semibold block">Email :</span> info@intelli-assess.in</p>
                    </div>
                </div>

            </div>

            {/* --- BOTTOM BAR --- */}
            <div className="max-w-7xl mx-auto pt-8 border-t border-gray-200 text-center space-y-5">
                <div className="flex justify-center items-center gap-4">
                        {NavText.map(({id,text,link}) => (
                            <Link onClick={scrollTop} key={id} to={link} className="text-gray-400 hover:text-orange-500 transition-colors text-sm">
                                {text}
                            </Link>
                        ))}
                    </div>
                <p className="text-gray-400 text-xs">
                    Copyright ©{new Date().getFullYear()} All rights reserved
                </p>
            </div>
        </footer>
    )
}

export default Footer