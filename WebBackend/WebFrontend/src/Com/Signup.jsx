import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAuth } from "../Context/AuthProvider.jsx";

function Signup() {
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
            fullname: data.fullname,
            email: data.email,
            password: data.pass,
        };

        try {
            const response = await axios.post("/oes-api/user/register", userInfo);
            if (response.data) {
                toast.success("Account created successfully!");
                sessionStorage.setItem("Online_Exam", JSON.stringify(response.data));
                setAuthUser(response.data);
                // Navigate to dashboard or home after successful signup
                navigate("/");
            }
        } catch (error) {
            if (error.response) {
                toast.error("Error: " + error.response.data.error);
            } else {
                toast.error("Something went wrong. Please try again.");
            }
        }
    };

    React.useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
        }
    }, [isSubmitSuccessful, reset]);

    return (
        <div style={{minHeight:"calc(100vh - 82px)"}} className="w-full flex items-center justify-center p-6 font-sans">
            <div style={{maxHeight:"calc(100vh-82px)"}} className="max-w-md w-full bg-white p-10 rounded-lg shadow-xl border border-gray-100">
                
                {/* --- HEADER --- */}
                <div className="text-center mb-10">
                    <h2 className="text-[#002347] text-3xl font-extrabold mb-3">Create Account</h2>
                    <p className="text-gray-500 text-sm">Join the Intelli Assess community today.</p>
                </div>

                {/* --- FORM --- */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-[#002347] text-xs font-bold uppercase tracking-wider mb-2">Full Name</label>
                        <input 
                            {...register("fullname", { required: "Full name is required" })} 
                            type="text" 
                            placeholder="John Doe"
                            className={`w-full p-3 bg-gray-50 border ${errors.fullname ? 'border-red-500' : 'border-gray-200'} rounded-sm focus:outline-none focus:border-orange-400 text-sm transition-all`}
                        />
                        {errors.fullname && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.fullname.message}</p>}
                    </div>

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
                        <label className="block text-[#002347] text-xs font-bold uppercase tracking-wider mb-2">Password</label>
                        <input 
                            {...register("pass", { 
                                required: "Password is required",
                                minLength: { value: 6, message: "Minimum 6 characters" }
                            })} 
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
                        Sign Up
                    </button>
                </form>

                {/* --- FOOTER --- */}
                <div className="text-center pt-6 border-t border-gray-100">
                    <p className="text-gray-500 text-sm">
                        Already have an account? 
                        <Link to="/login" className="text-orange-500 font-bold ml-1 hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Signup;