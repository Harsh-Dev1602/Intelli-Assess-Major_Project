import React from 'react'
import Footer from './Footer'
import { FaShieldAlt, FaUserLock, FaCookieBite, FaDatabase } from 'react-icons/fa'

function PrivacyPolicy() {
  return (
    <div className="bg-white font-sans text-[#002347]">
      {/* --- HERO / BREADCRUMB SECTION --- */}
      <section className="bg-[#f8f9fa] py-16 px-6 lg:px-20 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Privacy Policy</h1>
        <p className="text-gray-500 text-sm tracking-widest uppercase">Intelli Assess • Effective Date: 01/10/2025</p>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="max-w-7xl mx-auto py-20 px-6 lg:px-10">
        <div className="space-y-12">
          
          {/* Introduction */}
          <div className="border-l-4 border-orange-500 pl-6 py-2">
            <p className="text-gray-600 leading-relaxed italic">
              At Intelli Assess, we respect your privacy and are committed to protecting the personal information of students, teachers, and administrators using our online examination platform. This Privacy Policy explains what information we collect, how we use it, and how we protect it.
            </p>
          </div>

          {/* 1. Information We Collect */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaDatabase className="text-orange-500 text-xl" />
              <h2 className="text-2xl font-bold">1. Information We Collect</h2>
            </div>
            <p className="text-gray-500 mb-4 leading-relaxed">
              We collect information to ensure the proper functioning of Intelli Assess and to provide a secure exam environment. This includes:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-gray-600">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong>Personal Information:</strong> Name, email, phone number, username, password, school/organization details.</span>
              </li>
              <li className="flex items-start gap-3 text-gray-600">
                <span className="text-orange-500 mt-1">•</span>
                <span><strong>Academic Information:</strong> Exam results, test scores, answer sheets, and performance analytics.</span>
              </li>
            </ul>
          </div>

          {/* 2. How We Use Your Information */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaShieldAlt className="text-orange-500 text-xl" />
              <h2 className="text-2xl font-bold">2. How We Use Your Information</h2>
            </div>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Managing online exams",
                "Verifying user identity",
                "Tracking performance results",
                "Sending system notifications",
                "Improving system functionality",
                "Ensuring platform security"
              ].map((item, index) => (
                <li key={index} className="flex items-center gap-3 bg-gray-50 p-3 rounded-sm border border-gray-100 text-sm text-gray-600">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Cookies and Tracking */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FaCookieBite className="text-orange-500 text-xl" />
              <h2 className="text-2xl font-bold">3. Cookies and Tracking</h2>
            </div>
            <p className="text-gray-500 mb-4 text-sm">We use cookies to enhance your experience:</p>
            <ul className="space-y-2 text-sm text-gray-600 ml-5 list-disc">
              <li>Maintain secure user sessions.</li>
              <li>Analyze usage patterns and improve platform performance.</li>
              <li>Personalize content and dashboard notifications.</li>
            </ul>
          </div>

          {/* 4. Data Security */}
          <div className="bg-orange-50 p-8 rounded-lg border border-orange-100">
            <div className="flex items-center gap-3 mb-4">
              <FaUserLock className="text-orange-600 text-xl" />
              <h2 className="text-2xl font-bold text-orange-900">4. Data Security</h2>
            </div>
            <p className="text-orange-800/80 leading-relaxed text-sm">
              We implement strict technical and administrative measures to secure user data, including end-to-end encryption and secure multi-factor authentication. Only authorized personnel can access personal and academic information.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  )
}

export default PrivacyPolicy