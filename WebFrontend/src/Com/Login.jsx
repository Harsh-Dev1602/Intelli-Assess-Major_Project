import React from 'react'
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form"
import toast from 'react-hot-toast'
import axios from 'axios';
import { useAuth } from "../Context/AuthProvider.jsx";


function Login() {
        const [authUser, setAuthUser] = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm()

    const onSubmit = (data) => {
            const userInfo = {
      email: data.email,
      password: data.pass,
    };
    // console.log(userInfo);
    axios.post("/oes-api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successfully");
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
            <div style={{ minHeight: "calc( 100vh - 60px )" }} className="animate__animated animate__flipInY w-full flex  justify-center items-center">
                <div  style={{ maxHeight: "calc( 100vh - 60px )" }} className="max-w-md w-full bg-white rounded-xl Custom_Scroll overflow-y-auto p-5 space-y-8">
                    {/* <h2 className="text-center text-4xl font-extrabold text-black">
                        Welcome
                    </h2> */}
                    <p style={{ animation: 'appear 3s ease-out' }} className="text-center text-gray-800">
                        Log In to your account
                    </p>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                        <button className="w-full py-2 px-4 BG_Color rounded-xl shadow-lg text-white font-semibold cursor-pointer transition duration-200" type="submit">
                            Log In
                        </button>
                    </form>
                    <div className="text-center">
                        <Link to="/signup" className=" text-gray-900">
                             Don't have an account?
                            <span className="text-indigo-600 pl-1 font-bold hover:underline cursor-pointer">Sign up</span>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login