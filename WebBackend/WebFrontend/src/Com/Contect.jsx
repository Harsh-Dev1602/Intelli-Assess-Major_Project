import React from 'react'
import { IoIosMail } from "react-icons/io";
import { ImLocation } from "react-icons/im";
import { MdCall } from "react-icons/md";
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import axios from 'axios';


import Footer from './Footer'
import Img7 from '../../public/Bg_Img/Bg_Img7.jpg';
import Img8 from '../../public/Bg_Img/Bg_Img8.jpg';


function Contect() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const onSubmit = (data) => {
     const userInfo = {
       email: data.email,
      name: data.fullname,
      message: data.message,
    }
    toast.success("Message send successfully")
    console.log(userInfo);
  }
    React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <>
      <div style={{ height: "calc( 100vh - 60px )" }} className=' w-full overflow-y-auto  Custom_Scroll'>
        <div className="flex flex-col md:flex-row justify-evenly gap-5 items-center my-5">
          <img src={Img7} className='w-60 lg:w-70 rounded-xl Box_Shedow' />
          <div className="w-10/12 lg:w-1/2 text-center rounded-xl p-2">
            <h2 className=" font-bold mb-2 text-indigo-500">
              Get in Touch with Intelli Assess
            </h2>
            <p className='text-justify'>
              Have questions about our online examination system? Reach out to us
              — our team will respond within one business day.
            </p>
          </div>
        </div>
        <div style={{ backgroundImage: `url(${Img8})` }} className="w-full h-60 lg:h-110 flex flex-col lg:flex-row justify-evenly items-center rounded-xl bg-center bg-cover object-cover">
          <div className="w-70 Box_Shedow lg:w-100 p-2 rounded-xl bg-white">
            <span className='flex hover:underline cursor-pointer justify-start items-center'> <IoIosMail className='text-black text-2xl mr-2' /> support@intelliassess.in </span>
            <span className='flex hover:underline cursor-pointer justify-start items-center'><MdCall className='text-indigo-600 text-2xl mr-2' /> +91 98XXXXXX10 </span>
            <span className='flex hover:underline cursor-pointer justify-start items-center'><ImLocation className='text-red-600 text-2xl mr-2' /> Indore, Madhya Pradesh, India </span>
          </div>
          <p className="w-70 lg:w-100 bg-white text-center p-2 rounded-xl">
            We respect your privacy — your contact details will only be used to respond to your inquiry.
          </p>
        </div>
        <div className=" w-full my-15 flex  justify-center items-center">
          <div className="max-w-md w-full bg-white Box_Shedow rounded-xl Custom_Scroll overflow-y-auto p-5 space-y-1">
            <h2 className='Text_Color font-bold text-center'>Contact me</h2>
            <p style={{ animation: 'appear 3s ease-out' }} className="text-center text-gray-800">
              Send your message
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="relative">
                <input  {...register("email", { required: true })} placeholder="Email address" className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500" name="email" type="email" />
                <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" >Email address</label>
                {errors.email && <span className=' text-red-600 font-semibold'>This field is required</span>}
              </div>
              <div className="relative">
                <input  {...register("fullname", { required: true })} placeholder="Fullname" className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500" name="fullname" type="text" />
                <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" >Fullname</label>
                {errors.fullname && <span className=' text-red-600 font-semibold'>This field is required</span>}
              </div>
              <div className="relative">
                <textarea  {...register("message", { required: true })} placeholder="Query" className="peer min-h-10 max-h-10 hover:max-h-20  w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500" name="message" type="text" />
                <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" >Query</label>
                {errors.message && <span className=' text-red-600 font-semibold'>This field is required</span>}
              </div>

              <button className="w-full py-2 px-4 BG_Color rounded-xl shadow-lg text-white font-semibold cursor-pointer transition duration-200" type="submit">
                Send message
              </button>
            </form>
          </div>
        </div>
        <Footer />
      </div >
    </>
  )
}

export default Contect