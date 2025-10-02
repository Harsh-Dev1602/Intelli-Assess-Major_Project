import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import Footer from './Footer.jsx'



function Home() {
    const BG_Img = [
        {
            id: 0,
            img: "BG_Img1",
            text: "A Secure and Scalable Online Examination System",
        },
        {
            id: 1,
            img: "BG_Img2",
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
            <div className="w-full my-5">

                <Slider {...settings}>
                    {BG_Img.map(({ id, img, text }) => (
                        <div key={id} className={`${img} w-full h-50  lg:h-100 bg-[#cccccc65] my-1 rounded-xl py-15 lg:py-50 text-center`}>
                            <h2>{text}</h2>
                        </div>))
                    }
                </Slider>
            </div>

            <p className='bg-[#cccccc40] p-5 rounded-xl text-justify text-white'>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Asperiores nulla saepe necessitatibus velit repellat impedit natus cum? Architecto, similique nulla! Molestias temporibus, quidem qui voluptates eum dolore omnis reiciendis voluptatum.
                Nostrum beatae nesciunt placeat iure quasi, saepe cupiditate, aspernatur minus omnis magnam minima. Optio, praesentium nulla! Ut error molestiae neque voluptate dolores eius accusamus consectetur harum aliquam delectus. Nihil, vero?
                Voluptatibus autem praesentium, placeat incidunt eos accusantium quod ipsam deserunt tempore maiores aut pariatur, odio molestias maxime blanditiis eum ex temporibus numquam provident delectus facilis eaque ut esse possimus. Labore?
                Doloremque accusantium enim beatae? Deleniti officia rem accusantium quas magnam eaque non facilis velit, fugiat voluptatibus aut aperiam dolorem numquam ratione quae ipsa libero fugit itaque, repellat odit, assumenda dicta?
                Labore ipsa similique quisquam repellat omnis ipsum ex. Iste illum labore exercitationem alias, numquam sequi optio sapiente natus cumque dolor nesciunt possimus sed eaque voluptas quidem amet nam ullam. Aliquam?
                Repudiandae facilis id provident maxime reiciendis natus nisi nihil saepe! Asperiores illo excepturi quia quaerat? Libero id animi quaerat recusandae dignissimos, pariatur magni officia est! Impedit omnis amet recusandae accusamus?
                Porro eveniet voluptates recusandae omnis ratione soluta laudantium placeat, neque, quo dicta repudiandae qui! Fuga officiis nam eos optio nostrum ratione sequi porro? Reiciendis unde quaerat sed aliquid atque est.
                Quisquam, est! Id, eligendi cupiditate quos atque ad molestias nobis adipisci officiis illum necessitatibus recusandae non mollitia, possimus deserunt harum voluptates dolore voluptatem fuga facere. Quidem necessitatibus nobis odit ratione!
                Cupiditate natus magnam, officiis illo debitis ducimus necessitatibus nihil iure eius qui aperiam, ratione architecto saepe! Atque, ut eaque corporis repellat natus ab repellendus quia rerum officiis harum corrupti labore!
                Numquam, hic eaque! Voluptatibus a molestiae voluptatum aliquid explicabo odit, molestias architecto eaque inventore necessitatibus quos reiciendis totam quisquam alias aperiam eum suscipit perferendis cumque dicta itaque. Illum, ex corporis!
                Nemo quo temporibus minus soluta vitae possimus sequi eligendi, maiores quam, suscipit ex debitis perferendis dolores est vel culpa consectetur porro incidunt provident? Qui inventore, reprehenderit consequatur provident architecto minima!
                Sed suscipit voluptatibus quasi, aliquid distinctio quod? Ipsam obcaecati optio autem, assumenda ipsum soluta impedit non! Quaerat illo, dolor saepe repellendus, sed quam, fuga labore iusto repellat eveniet similique illum?
                Eaque quibusdam temporibus aut saepe veniam autem praesentium fugit quos explicabo, aperiam velit alias debitis, culpa vero. Accusantium molestias quibusdam ad, ipsum, sapiente hic voluptatum sint assumenda, est amet vitae.
                Molestias fugit quasi tempore ullam magnam libero modi! Est dolor beatae exercitationem, tempore odio libero at! Deleniti, soluta suscipit aut id dolorum illum veritatis sapiente cum, facere dolore eum atque.
                A illo, perspiciatis error atque maiores minima voluptatibus totam ea aliquam eveniet maxime culpa esse omnis odio vitae distinctio ullam! Optio impedit quod temporibus est eligendi tenetur tempore. Repudiandae, earum?
                Id, totam. Facere architecto necessitatibus alias, doloremque maiores quisquam explicabo quibusdam animi, incidunt distinctio natus officia veritatis illo sunt magni unde eos velit quam nostrum. Tempora ut facilis neque quam.
                Numquam officia asperiores quibusdam error maxime vel odit necessitatibus, atque placeat autem in magni esse molestias unde a fuga aliquid dolore, distinctio quae deserunt tempore aut! Eligendi veniam rem perspiciatis.
                Facilis laudantium ipsum rerum obcaecati, odit aliquid eaque sint omnis nam rem aut magnam temporibus doloremque quibusdam corrupti totam quaerat facere saepe pariatur ipsam repudiandae mollitia deleniti eum consequuntur. Voluptatum!
                Ad rerum fuga nam, harum et placeat accusamus omnis, libero pariatur odio molestias deserunt ipsa reiciendis repudiandae, perspiciatis minima non cum beatae repellendus commodi possimus. Ullam minus soluta nesciunt saepe!
                Repudiandae saepe voluptates alias consectetur eos placeat facere nemo cum reiciendis deserunt! Nisi ducimus in id possimus ratione amet minus neque nihil ipsam accusantium atque nostrum, nulla dicta quibusdam odio.
            </p>

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