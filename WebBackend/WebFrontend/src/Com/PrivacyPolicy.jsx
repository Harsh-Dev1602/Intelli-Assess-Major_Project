import Footer from './Footer'

function PrivacyPolicy() {
  return (
    <>
      <div style={{ height: "calc( 100vh - 60px )" }} className="w-full overflow-y-auto Custom_Scroll">
        <div className="p-5">
          <h1 className='text-center font-bold py-5 text-indigo-500'>Privacy Policy-Intelli Assess</h1>
          <div className="p-2">
            <h3 className=' font-semibold'> Effective Date: 1/10/2025</h3>
            <p className='text-justify'>
              At Intelli Assess us, we respect your privacy and are committed to protecting the personal information of students, teachers, and administrators using our online examination platform. This Privacy Policy explains what information we collect, how we use it, and how we protect it.</p>

          </div>
          <div className="p-2">
            <h3 className=' font-semibold'>1. Information We Collect</h3>
            <p className='text-justify'>We collect information to ensure the proper functioning of Intelli Assess and to provide a secure exam environment. This includes:</p>
            <ul>
              <li className='ml-6 text-justify list-disc'>Personal Information: Name, email, phone number, username, password, school/organization details.</li>
              <li className='ml-6 text-justify list-disc'>Academic Information: Exam results, test scores, answer sheets, and performance analytics.</li>
            </ul>
          </div>
          <div className="p-2">
            <h3 className=' font-semibold'>2. How We Use Your Information</h3>
            <ul>
              <li className='ml-6 text-justify list-disc'>Providing and managing your online exams.</li>
              <li className='ml-6 text-justify list-disc'>Verifying user identity during exams.</li>
              <li className='ml-6 text-justify list-disc'>Tracking performance and generating results.</li>
              <li className='ml-6 text-justify list-disc'>Sending notifications, updates, or important information related to exams.</li>
              <li className='ml-6 text-justify list-disc'>Improving system functionality, security, and user experience.</li>
            </ul>
          </div>
          <div className="p-2">
            <h3 className=' font-semibold'>3. Cookies and Tracking</h3>
            <ul>
              <li className='ml-6 text-justify list-disc'>Maintain user sessions.</li>
              <li className='ml-6 text-justify list-disc'>Analyze usage patterns and improve platform performance.</li>
              <li className='ml-6 text-justify list-disc'>Personalize content and notifications.</li>
            </ul>
          </div>
          <div className="p-2">
            <h3 className=' font-semibold'>4. Data Security</h3>
            <p className=' text-justify'>We implement strict technical and administrative measures to secure user data, including encryption and secure authentication. Only authorized personnel can access personal and academic information.</p>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default PrivacyPolicy