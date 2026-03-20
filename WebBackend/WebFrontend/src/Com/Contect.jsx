import React from 'react';
import { IoIosMail } from "react-icons/io";
import { ImLocation } from "react-icons/im";
import { MdCall } from "react-icons/md";
import { useForm } from "react-hook-form";
import toast from 'react-hot-toast';
import Footer from './Footer';

function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      name: data.fullname,
      message: data.message,
    };
    toast.success("Message sent successfully!");
    console.log(userInfo);
  };

  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [isSubmitSuccessful, reset]);

  return (
    <div className="bg-white font-sans text-[#002347]">
      {/* --- HERO / BREADCRUMB SECTION --- */}
      <section className="bg-[#f8f9fa] py-20 px-6 lg:px-20 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-gray-500">Home / Contact</p>
      </section>

      {/* --- CONTACT CONTENT --- */}
      <section className="max-w-7xl mx-auto py-24 px-6 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          
          {/* LEFT COLUMN: CONTACT INFO */}
          <div className="lg:col-span-1 space-y-10">
            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-2xl mt-1"><ImLocation /></div>
              <div>
                <h4 className="font-bold text-lg">Indore, India</h4>
                <p className="text-gray-500 text-sm">Madhya Pradesh, 452001</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-2xl mt-1"><MdCall /></div>
              <div>
                <h4 className="font-bold text-lg">+91 98XXXXXX10</h4>
                <p className="text-gray-500 text-sm">Mon to Fri 9am to 6pm</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="text-orange-500 text-2xl mt-1"><IoIosMail /></div>
              <div>
                <h4 className="font-bold text-lg">support@intelliassess.in</h4>
                <p className="text-gray-500 text-sm">Send us your query anytime!</p>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <input 
                    {...register("fullname", { required: "Name is required" })} 
                    placeholder="Enter your name" 
                    className="w-full p-4 bg-transparent border border-gray-200 rounded-sm focus:outline-none focus:border-orange-400 text-sm"
                  />
                  {errors.fullname && <span className="text-red-500 text-xs mt-1">{errors.fullname.message}</span>}
                </div>
                <div>
                  <input 
                    {...register("email", { required: "Email is required" })} 
                    placeholder="Enter email address" 
                    className="w-full p-4 bg-transparent border border-gray-200 rounded-sm focus:outline-none focus:border-orange-400 text-sm"
                  />
                  {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email.message}</span>}
                </div>
              </div>

              <div>
                <textarea 
                  {...register("message", { required: "Message is required" })} 
                  placeholder="Enter Message" 
                  rows="6"
                  className="w-full p-4 bg-transparent border border-gray-200 rounded-sm focus:outline-none focus:border-orange-400 text-sm"
                />
                {errors.message && <span className="text-red-500 text-xs mt-1">{errors.message.message}</span>}
              </div>

              <button 
                type="submit" 
                className="bg-gradient-to-r from-orange-500 to-yellow-400 text-white font-bold py-4 px-10 rounded-sm uppercase text-xs tracking-widest hover:shadow-lg transition-all active:scale-95"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Contact;