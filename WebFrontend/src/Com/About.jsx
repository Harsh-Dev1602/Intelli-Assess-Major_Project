import React from 'react'
import Footer from './Footer'
import Img4 from '../../public/Bg_Img/Bg_Img4.jpg'
import Img6 from '../../public/Bg_Img/Bg_Img6.jpg'

function About() {
  const team = [
    {
      name: " Jatin Rao",
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
  return (
    <>
      <div style={{ height: "calc( 100vh - 60px )" }}  className="w-full overflow-y-auto Custom_Scroll">
        <div className=' my-5  text-black flex justify-evenly flex-col lg:flex-row items-center gap-5 lg:gap-10'>
          <img src={Img4} className=' order-2 rounded-xl w-70 lg:w-100' />
          <div className="lg:w-1/2 text-center  rounded-xl p-5 lg:order-2 bg-white">
            <h1 className=' font-bold'>About Intelli Assess</h1>
            <h3 className='font-medium'>Smart, Secure, Scalable Online Examinations</h3>
            <p>Intelli Assess is an end-to-end online examination platform designed to simplify and secure the entire assessment lifecycle. From question creation and proctored live exams to instant grading and analytics, Intelli Assess helps educators and administrators create fair, flexible, and data-driven evaluations — saving time while improving assessment quality.</p>
          </div>
        </div>
        <div className="text-black p-5 text-justify rounded-xl bg-white my-5">
          <ul>
            <li className=' list-disc ml-5'>Intelli Assess was built to address common challenges in digital assessment: integrity, scalability, and meaningful feedback. Our platform supports flexible question types (MCQ, descriptive, coding, image-based), timed and scheduled exams, role-based access for admins/invigilators/candidates, and multiple proctoring options to maintain exam integrity.</li>
            <li className=' list-disc ml-5'>We combine automated scoring for objective items with tools for efficient manual review of subjective answers. Powerful reporting and dashboards provide real-time insights on performance trends, item analysis, and candidate progress — helping instructors refine content and make decisions backed by data.</li>
            <li className=' list-disc ml-5'>Security and fairness are central: secure authentication, randomized questions/answers, browser lockdown options, and audit logs reduce cheating risk while preserving candidate privacy.</li>
          </ul>
        </div>

        <div className="text-black p-1 text-justify flex flex-col lg:flex-row justify-evenly rounded-xl my-5">
          <h1 className='bg-white rounded-xl p-1 flex justify-center items-center h-20 font-bold'>Key feature</h1>
          <ul className='bg-white rounded-xl p-5'>
            <li className=' list-disc ml-5'>Flexible question types: MCQ, short answer, essay, coding, image/audio questions.</li>
            <li className=' list-disc ml-5'>Automated grading + manual review workflows.</li>
            <li className=' list-disc ml-5'>Timed exams, late-penalty rules, and multiple scheduling options.</li>
            <li className=' list-disc ml-5'>Secure access: role-based permissions, SSO / OAuth support, and audit trails.</li>
            <li className=' list-disc ml-5'>Proctoring options: live proctoring, recorded sessions, and automated behavior flags.</li>
            <li className=' list-disc ml-5'>Randomization & question pools to minimize collusion.</li>
            <li className=' list-disc ml-5'>Real-time dashboards: candidate progress, item difficulty, and grade distributions.</li>
            <li className=' list-disc ml-5'>Exportable reports: CSV/PDF, API access for LMS integration.</li>
            <li className=' list-disc ml-5'>Mobile-first responsive UI and offline-safe question delivery </li>
            <li className=' list-disc ml-5'>Accessibility compliance: keyboard navigation, screen-reader friendly layouts.</li>
          </ul>
        </div>
        <div className="flex justify-evenly flex-col lg:flex-row items-center gap-5 lg:gap-20 my-5">
          <div className=' lg:w-1/2 text-center rounded-xl p-10 bg-white text-black'>
            <h1 className=' font-bold'>Technology & security</h1>
            <p >Intelli Assess is built with modern, scalable web technologies and follows security best practices: encrypted data in transit and at rest, secure authentication, and comprehensive logging. APIs allow integration with popular LMS and HR systems.</p>
          </div>
          <img src={Img6} className='w-70 rounded-xl ' />
        </div>

        <div className=" rounded-xl py-5 text-center">
          <h2 className=" font-bold bg-white rounded-xl py-2 mb-5">
            Meet Our Development Team
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-xl p-2">
                <h3 className="text-xl font-semibold Text_Color">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">{member.role}</p>
                <p className="text-gray-500 mt-2 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default About