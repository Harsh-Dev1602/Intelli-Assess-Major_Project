import React from 'react';
import { FaUserLock, FaUserShield, FaClipboardCheck, FaArrowRight,FaIdCard ,FaLaptopCode ,FaFileAlt ,FaCheckCircle } from "react-icons/fa";
// Import your image correctly
import Img1 from "../../public/Bg_Img/Bg_Img1.jpeg";
import Footer from './Footer';

function Home() {

    return (
        <div className="font-sans text-[#002347] bg-white overflow-x-hidden">

            {/* --- HERO SECTION --- */}
            <section className="relative px-6 lg:px-20 py-16 lg:py-28 flex flex-col lg:flex-row items-center max-w-7xl mx-auto">
                <div className="lg:w-1/2 z-10 text-center lg:text-left">
                    <span className="text-orange-500 font-bold tracking-[0.2em] text-xs uppercase bg-orange-50 px-3 py-1 rounded-full">
                        Smart Assessment Solutions
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mt-6 mb-6 leading-[1.1] text-[#002347]">
                        Making Online Exams <br />
                        <span className="text-orange-500">Secure & Simple</span>
                    </h1>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto lg:mx-0 text-lg leading-relaxed">
                        Intelli Assess provides a seamless, scalable, and anti-cheat environment
                        for institutions to conduct high-stakes examinations globally.
                    </p>

                </div>

                <div className="lg:w-1/2 mt-16 lg:mt-0 relative group">
                    {/* Decorative Background Blob */}
                    <div className="absolute -inset-4 bg-orange-100 rounded-full blur-3xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                    <img
                        src={Img1}
                        alt="Exam Illustration"
                        className="relative w-full max-w-xl h-auto drop-shadow-2xl animate-float"
                    />
                </div>
            </section>

            {/* --- FEATURES SECTION --- */}
            <section className="py-24 px-6 lg:px-20 bg-slate-50">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
                    <div className="lg:col-span-1">
                        <h2 className="text-4xl font-black mb-4 leading-tight">Awesome <br /> Features</h2>
                        <div className="w-12 h-1 bg-orange-500 mb-6"></div>
                        <p className="text-gray-500 mb-8 text-base">
                            Our platform ensures integrity and efficiency in every digital assessment conducted.
                        </p>
                        <button className="group flex items-center gap-2 font-bold text-[#002347] hover:text-orange-500 transition-all">
                            Explore All Features <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                title: "AI Proctoring",
                                icon: <FaUserShield />,
                                color: "bg-blue-50 text-blue-600",
                                desc: "Advanced AI monitoring to detect suspicious behavior and cheating."
                            },
                            {
                                title: "Instant Grading",
                                icon: <FaClipboardCheck />,
                                color: "bg-orange-50 text-orange-600",
                                desc: "Automated results for MCQs and objective tests upon submission."
                            },
                            {
                                title: "Secure Lock",
                                icon: <FaUserLock />,
                                color: "bg-cyan-50 text-cyan-600",
                                desc: "Safe exam browser prevents students from switching tabs or apps."
                            }
                        ].map((feature, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 group">
                                <div className={`${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform`}>
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-black mb-3">{feature.title}</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- STATISTICS BAR --- */}
            <div className="relative overflow-hidden">
                <div className="w-full bg-[#002347] py-20 px-6">
                    {/* Background Pattern effect */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-orange-500 rounded-full blur-[100px]"></div>
                        <div className="absolute bottom-0 right-0 w-64 h-64 bg-blue-500 rounded-full blur-[100px]"></div>
                    </div>

                    <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 relative z-10">
                        {[
                            { val: "500+", label: "Institutions" },
                            { val: "1M+", label: "Exams Taken" },
                            { val: "99.9%", label: "Uptime Rate" },
                            { val: "24/7", label: "Live Support" }
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <h3 className="text-4xl md:text-5xl font-black text-white mb-2">{stat.val}</h3>
                                <div className="h-1 w-8 bg-orange-500 mx-auto mb-3"></div>
                                <p className="text-xs uppercase tracking-[0.2em] text-slate-400 font-bold">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <section className="py-24 px-6 lg:px-20 bg-white">
                <div className="max-w-7xl mx-auto text-center mb-16">
                    <span className="text-orange-500 font-bold tracking-widest text-xs uppercase">Process</span>
                    <h2 className="text-4xl font-black mt-3">How It Works</h2>
                    <p className="text-gray-500 mt-4 max-w-xl mx-auto">Get your examination environment ready in three simple steps.</p>
                </div>

                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                    {/* Connecting Line (Desktop Only) */}
                    <div className="hidden md:block absolute top-1/3 left-0 w-full h-0.5 bg-gray-100 -z-10"></div>

                    {[
                        { step: "01", title: "Identity Verification", icon: <FaIdCard />, desc: "Students undergo biometric or ID-based verification before the exam starts." },
                        { step: "02", title: "Secure Attempt", icon: <FaLaptopCode />, desc: "The exam environment locks down the browser and starts AI proctoring." },
                        { step: "03", title: "Detailed Analytics", icon: <FaFileAlt />, desc: "Get comprehensive reports on student performance and integrity scores." }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center text-center group">
                            <div className="w-16 h-16 bg-[#002347] text-white rounded-full flex items-center justify-center text-2xl mb-6 group-hover:bg-orange-500 transition-colors shadow-xl relative">
                                {item.icon}
                                <span className="absolute -top-2 -right-2 bg-orange-500 text-[10px] font-bold px-2 py-1 rounded-md">{item.step}</span>
                            </div>
                            <h3 className="text-xl font-black mb-3">{item.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- TRUST / TESTIMONIALS SECTION --- */}
            <section className="py-24 px-6 lg:px-20 bg-slate-50">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-4xl font-black mb-6 leading-tight">Trusted by Leading Educators Worldwide</h2>
                        <p className="text-gray-500 mb-8">We don't just provide a platform; we provide peace of mind. Our anti-cheat technology is used by top-tier universities.</p>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex items-center gap-3 text-[#002347] font-bold italic">
                                <FaCheckCircle className="text-orange-500" /> ISO Certified
                            </div>
                            <div className="flex items-center gap-3 text-[#002347] font-bold italic">
                                <FaCheckCircle className="text-orange-500" /> GDPR Compliant
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2">
                        <div className="bg-white p-10 rounded-3xl shadow-2xl relative">
                            <div className="text-orange-500 text-5xl font-serif absolute top-6 left-6 opacity-20">“</div>
                            <p className="text-lg text-gray-600 italic relative z-10">
                                "Intelli Assess transformed our mid-term examination process. The AI proctoring is remarkably accurate, and the instant grading saved our faculty hundreds of hours."
                            </p>
                           
                        </div>
                    </div>
                </div>
            </section>

            <Footer />

        </div>
    );
}

export default Home;