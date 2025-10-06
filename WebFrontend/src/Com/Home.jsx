import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import Footer from './Footer';

function Home() {
    const BG_Img = [
        {
            id: 0,
            img: "../public/Bg_Img/Bg_Img1.png",
            text: "A Secure and Scalable Online Examination System",
        },
        {
            id: 1,
            img: "../public/Bg_Img/Bg_Img2.png",
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
            <div className="w-full mx-auto bg-[#cccccc65] p-2 rounded-xl my-5">
                <Slider {...settings}>
                    {BG_Img.map(({ id, img, text }) => (
                        <div key={id} className="h-50 md:h-100 mx-auto object-contain lg:h-150  BG_Color rounded-xl bg-cover">
                            <div style={{ backgroundImage: `url(${img})` }} className="h-50 md:h-100 mx-auto object-cover bg-cover bg-center lg:h-150 flex justify-center items-center px-5 lg:px-20 rounded-xl">
                                <h3 className='bg-white text-center p-2 text-indigo-500 font-bold rounded-xl'>{text}</h3>
                            </div>
                        </div>
                    ))
                    }
                </Slider>
            </div>
            <Footer/>
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