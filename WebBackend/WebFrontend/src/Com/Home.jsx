import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaLaptopCode, FaChartBar, FaLock } from "react-icons/fa";
import Img1 from "../../public/Bg_Img/Bg_Img1.jpeg"
import Img2 from "../../public/Bg_Img/Bg_Img2.jpeg"
import Img3 from '../../public/Bg_Img/Bg_Img3.jpg'

import Footer from './Footer';

function Home() {
    const BG_Img = [
        {
            id: 0,
            img: Img1,
            text: "A Secure and Scalable Online Examination System",
        },
        {
            id: 1,
            img: Img2,
            text: "Scalable to accommodate thousands of students simultaneously during exams.",
        },
    ]

    var settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 2000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };
    return (
        <>
            <div className="w-full mx-auto bg-[#cccccc65] p-1 rounded-xl my-5">
                <Slider {...settings}>
                    {BG_Img.map(({ id, img, text }) => (
                        <div key={id} className="h-50 md:h-100 mx-auto object-contain lg:h-150 bg-gray-100 rounded-xl bg-cover">
                            <div style={{ backgroundImage: `url(${img})` }} className="h-50 md:h-100 mx-auto object-cover bg-cover bg-center lg:h-150 flex justify-center items-center px-5 lg:px-20 rounded-xl">
                                <h2 className='bg-white text-center p-1 lg:p-5 text-indigo-500 font-bold rounded-xl'>{text}</h2>
                            </div>
                        </div>
                    ))
                    }
                </Slider>

            </div>
             <section className="h-auto xl:py-20 flex flex-col justify-end  mx-auto my-5 p-5 rounded-xl object-cover bg-cover bg-center">
                <h1 className=" font-bold text-center BG_Color mx-auto p-1 rounded-xl text-white mb-5">
                 Key Features
                </h1>

                <div className=" grid grid-cols-1 gap-1 sm:grid-cols-2 md:grid-cols-3 lg:gap-25">
                    <div className="bg-white Box_Shedow rounded-xl p-4 text-center hover:shadow-2xl transition">
                        <FaLaptopCode className="text-blue-600 text-5xl mx-auto mb-4" />
                        <h3 className=" font-semibold mb-2 Text_Color">Online Exams</h3>
                        <p className="text-gray-600">
                            Attend exams anytime, anywhere with a seamless online interface.
                        </p>
                    </div>
                    <div className="bg-white Box_Shedow rounded-xl p-4 text-center hover:shadow-2xl transition">
                        <FaChartBar className="text-purple-600 text-5xl mx-auto mb-4" />
                        <h3 className=" font-semibold mb-2 Text_Color">Instant Results</h3>
                        <p className="text-gray-600">
                            Get your results instantly after submission
                        </p>
                    </div>

                    <div className="bg-white Box_Shedow rounded-xl p-4 text-center hover:shadow-2xl transition">
                        <FaLock className="text-red-600 text-5xl mx-auto mb-4" />
                        <h3 className=" font-semibold Text_Color mb-2">Secure Login</h3>
                        <p className="text-gray-600">
                            Enjoy safe and encrypted access to all your exams and data.
                        </p>
                    </div>
                </div>
            </section>
            <div style={{ backgroundImage: `url(${Img3})` }} className="w-full mx-auto h-screen xl:h-auto xl:py-50 bg-center bg-cover object-cover rounded-xl my-5 flex justify-start lg:items-center Box_Shedow">
                <h2 className="w-100 p-5 rounded-xl text-center font-semibold text-indigo-500">
                    Intelli Assess is an advanced online examination platform designed to
                    simplify the process of conducting and managing exams digitally.
                </h2>
            </div>
           
            <Footer />
        </>
    )
}

export default Home

const PrevArrow = ({ onClick }) => (
    <div className="custom-arrow prev" onClick={onClick}>
        <MdKeyboardArrowLeft size={25} color="white" />
    </div>
);

const NextArrow = ({ onClick }) => (
    <div className="custom-arrow next" onClick={onClick}>
        <MdKeyboardArrowRight size={25} color="white" />
    </div>
);