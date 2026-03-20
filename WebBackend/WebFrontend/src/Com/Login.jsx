import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from "../Context/AuthProvider.jsx";

function Login() {
    const [authUser, setAuthUser] = useAuth();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful },
    } = useForm();

    const onSubmit = async (data) => {
        const userInfo = {
            email: data.email,
            password: data.pass,
        };

        try {
            const response = await axios.post("/oes-api/user/login", userInfo);
            if (response.data) {
                toast.success("Welcome back!");
                sessionStorage.setItem("Online_Exam", JSON.stringify(response.data));
                setAuthUser(response.data);
                navigate("/"); // Redirect to home/dashboard
            }
        } catch (error) {
            if (error.response) {
                toast.error("Error: " + error.response.data.error);
            } else {
                toast.error("Invalid credentials or server error.");
            }
        }
    };

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div style={{minHeight:"calc(100vh - 82px)"}} className=" flex items-center justify-center font-sans">
            <div style={{maxHeight:"calc(100vh - 82px)"}} className="max-w-md w-full bg-white p-10 rounded-lg shadow-xl border border-gray-100">
                
                {/* --- HEADER --- */}
                <div className="text-center mb-10">
                    <h2 className="text-[#002347] text-3xl font-extrabold mb-3">Welcome Back</h2>
                    <p className="text-gray-500 text-sm">Log in to your account to continue.</p>
                </div>

                {/* --- FORM --- */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div>
                        <label className="block text-[#002347] text-xs font-bold uppercase tracking-wider mb-2">Email Address</label>
                        <input 
                            {...register("email", { required: "Email is required" })} 
                            type="email" 
                            placeholder="email@example.com"
                            className={`w-full p-3 bg-gray-50 border ${errors.email ? 'border-red-500' : 'border-gray-200'} rounded-sm focus:outline-none focus:border-orange-400 text-sm transition-all`}
                        />
                        {errors.email && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.email.message}</p>}
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="block text-[#002347] text-xs font-bold uppercase tracking-wider">Password</label>
                        </div>
                        <input 
                            {...register("pass", { required: "Password is required" })} 
                            type="password" 
                            placeholder="••••••••"
                            className={`w-full p-3 bg-gray-50 border ${errors.pass ? 'border-red-500' : 'border-gray-200'} rounded-sm focus:outline-none focus:border-orange-400 text-sm transition-all`}
                        />
                        {errors.pass && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.pass.message}</p>}
                    </div>

                    <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-4 rounded-sm uppercase text-xs tracking-widest hover:shadow-lg transition-all active:scale-95 mt-4"
                    >
                        Log In
                    </button>
                </form>

                {/* --- FOOTER --- */}
                <div className="text-center pt-6 border-t border-gray-100">
                    <p className="text-gray-500 text-sm">
                        Don't have an account? 
                        <Link to="/signup" className="text-orange-500 font-bold ml-1 hover:underline">Sign up now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;