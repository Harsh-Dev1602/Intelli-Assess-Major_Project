import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import axios from 'axios';
import { useAuth } from "../Context/AuthProvider.jsx";

function Signup() {
    const [authUser, setAuthUser] = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const onSubmit = async (data) => {
          const userInfo = {
            fullname: data.fullname,
            email: data.email,
            password: data.pass,
        }; 
        
        await axios.post("/oes-api/user/register", userInfo)
            .then((response) => {
                if (response.data) {
                    toast.success("Register successfully..");
                }
                sessionStorage.setItem("Online_Exam", JSON.stringify(response.data));
                setAuthUser(response.data);
            })
            .catch((error) => {
                if (error.response) {
                    toast.error("Error: " + error.response.data.error);
                }
            });

    }
    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);
    return (
        <>
            <div style={{ minHeight: "calc( 100vh - 60px )" }} className="animate__animated animate__flipInY w-full  flex justify-center items-center">
                <div style={{ maxHeight: "calc( 100vh - 60px )" }} className="max-w-md w-full bg-white rounded-xl Box_Shedow overflow-y-auto Custom_Scroll p-5 space-y-1">
                    <h2 className='Text_Color font-bold text-center'>Create your account</h2>
                    <p style={{ animation: 'appear 3s ease-out' }} className="text-center text-gray-800">
                       Join our smart and secure online examination system today.
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div className="relative">
                            <input  {...register("fullname", { required: true })} placeholder="Full Name" className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500" name="fullname" type="text" />
                            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" >Full Name</label>
                            {errors.fullname && <span className=' text-red-600 font-semibold'>This field is required</span>}
                        </div>
                        <div className="relative">
                            <input  {...register("email", { required: true })} placeholder="Email address" className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500" name="email" type="email" />
                            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" >Email address</label>
                            {errors.email && <span className=' text-red-600 font-semibold'>This field is required</span>}
                        </div>
                        <div className="relative">
                            <input  {...register("pass", { required: true })} placeholder="Password" className="peer h-10 w-full border-b-2 border-gray-300 bg-transparent placeholder-transparent focus:outline-none focus:border-purple-500" name="pass" type="password" />
                            <label className="absolute left-0 -top-3.5 text-gray-500 text-sm transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-2 peer-focus:-top-3.5 peer-focus:text-purple-500 peer-focus:text-sm" >Password</label>
                            {errors.pass && <span className=' text-red-600 font-semibold'>This field is required</span>}
                        </div>

                        <button className="w-full py-2 px-4  BG_Color rounded-xl shadow-lg cursor-pointer text-white font-semibold transition duration-200" type="submit">
                            Sign Up
                        </button>
                    </form>
                    <div className="text-center">
                        <Link to="/login" className=" text-gray-900">
                            Have an account?
                            <span className="text-indigo-600 pl-1 font-bold hover:underline cursor-pointer">Log in now</span>
                        </Link>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Signup