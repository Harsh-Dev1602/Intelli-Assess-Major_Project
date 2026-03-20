import React from 'react'
import Footer from './Footer'
import { FaCheckCircle, FaCode, FaServer, FaShieldAlt, FaUserTie } from 'react-icons/fa'

// Assuming your assets are in these paths
import Img4 from '../../public/Bg_Img/Bg_Img4.jpg' 
import Img6 from '../../public/Bg_Img/Bg_Img6.jpg'

function About() {
  const team = [
    {
      name: "Jatin Rao",
      role: "Project Leader",
      desc: "Led the entire Intelli Assess project, managing design, backend, and deployment.",
    },
    {
      name: "Harsh Suryavanshi",
      role: "Frontend Developer",
      desc: "Developed responsive UI with React.js and Tailwind CSS.",
    },
    {
      name: "Atharva Patil",
      role: "Backend Developer",
      desc: "Built secure APIs and database logic using Node.js and MongoDB.",
    },
    {
      name: "Abhishek Rathore",
      role: "Tester & Documentation",
      desc: "Handled system testing, debugging, and project documentation."
    },
  ];

  const features = [
    "Flexible question types (MCQ, Coding, Essay)",
    "Automated grading + manual review workflows",
    "Timed exams & late-penalty rules",
    "Secure access & SSO support",
    "Proctoring & automated behavior flags",
    "Real-time analytics dashboards"
  ];

  return (
    <div className="bg-white font-sans text-[#002347]">
      {/* --- SECTION 1: ABOUT HERO --- */}
      <section className="py-16 lg:py-24 px-6 lg:px-20 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
        <div className="lg:w-1/2 relative">
          <img src={Img4} alt="About" className="rounded-lg shadow-2xl relative z-10" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-orange-100 rounded-lg -z-0"></div>
        </div>
        
        <div className="lg:w-1/2">
          <span className="text-orange-500 font-bold uppercase tracking-widest text-xs">Our Mission</span>
          <h2 className="text-4xl lg:text-5xl font-extrabold mt-3 mb-6 leading-tight">
            Smart, Secure, Scalable <br/> Online Examinations
          </h2>
          <p className="text-gray-500 leading-relaxed mb-6">
            Intelli Assess is an end-to-end online examination platform designed to simplify and secure the entire assessment lifecycle. From proctored live exams to instant grading, we help educators create fair and flexible evaluations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-2 text-sm font-semibold">
                <FaCheckCircle className="text-orange-500" /> {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 2: TECHNOLOGY & SECURITY --- */}
      <section className="bg-gray-50 py-20 px-6 lg:px-20">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row-reverse items-center gap-16">
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <img src={Img6} className="w-80 h-80 object-cover rounded-full border-8 border-white shadow-xl" alt="Technology" />
              <div className="absolute top-0 right-0 bg-gradient-to-r from-orange-500 to-yellow-400 p-4 rounded-full text-white shadow-lg">
                <FaShieldAlt size={30} />
              </div>
            </div>
          </div>
          
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold mb-6">Technology & Security</h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Built with modern, scalable web technologies, Intelli Assess follows security best practices: encrypted data in transit and at rest, secure authentication, and comprehensive logging. Our APIs allow seamless integration with popular LMS and HR systems.
            </p>
            <div className="flex gap-8">
              <div className="text-center">
                <div className="text-orange-500 text-3xl font-bold">100%</div>
                <div className="text-xs uppercase font-bold text-gray-400">Secure</div>
              </div>
              <div className="text-center">
                <div className="text-orange-500 text-3xl font-bold">99.9%</div>
                <div className="text-xs uppercase font-bold text-gray-400">Uptime</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TEAM --- */}
      <section className="py-24 px-6 lg:px-20 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-orange-500 font-bold uppercase text-xs tracking-widest">Experts</span>
          <h2 className="text-4xl font-bold mt-2 relative inline-block">
            Meet Our Developers
            <div className="w-12 h-1 bg-orange-500 mx-auto mt-2"></div>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div key={index} className="group bg-white border border-gray-100 p-8 rounded-xl hover:shadow-2xl transition-all duration-300 text-center">
              <div className="w-20 h-20 bg-orange-50 text-orange-500 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                <FaUserTie size={32} />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-orange-500 transition-colors">
                {member.name}
              </h3>
              <p className="text-orange-500 text-xs font-bold uppercase mb-4 tracking-tighter">{member.role}</p>
              <p className="text-gray-500 text-sm leading-snug">{member.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}

export default About