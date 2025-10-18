import { Route, Routes, Navigate } from 'react-router-dom'
import 'animate.css';
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react';

import Navbar from './Com/Navbar'
import About from './Com/About.jsx'
import Contect from './Com/Contect.jsx'
import Home from './Com/Home'
import Login from './Com/Login'
import Signup from './Com/Signup'
import Dashboard from './Com/Dashboard/Dashboard.jsx';
import StudentExam from './Com/Dashboard/StudentExam.jsx';
import AdminDashboard from './Com/AdminDashboard/AdminDashboard.jsx';
import AllLoginStudentData from './Com/AdminDashboard/allLoginStudentData.jsx';
import { useAuth } from "./Context/AuthProvider.jsx";
import Loading from './Com/Loading/Loading.jsx';
import SetPaper from './Com/AdminDashboard/SetPaper.jsx';
import PrivacyPolicy from './Com/PrivacyPolicy.jsx';


function App() {
  const [authUser, setAuthUser] = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  return (
    <>
      <div className="w-full Font_Text h-screen bg-[#dff2fe70] Custom_Scroll overflow-y-auto">
        <div className='w-[95%] mx-auto  min-[1700px]:w-[70%] min-[3500px]:w-[40%]'>
          {loading ? (
            <Loading />
          ) : (<>
            <Navbar />
            <Routes>
              <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <Home />} />
              <Route path='/about'  element={<About/>}/>
              <Route path='/privacy-policy'  element={<PrivacyPolicy/>}/>

              <Route path='/contect' element={<Contect/>}/>
              <Route path="/login" element={authUser ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/signup" element={authUser ? <Navigate to="/dashboard" /> : <Signup />} />
              <Route path="/dashboard" element={authUser ? (authUser?.user?.role === "@dmin" ? <Navigate to="/admin-dashboard" /> : <Dashboard />) : (<Navigate to="/" />)} />
              <Route path="/start-exam" element={authUser ? <StudentExam /> : <Navigate to="/" />} />
              <Route path="/admin-dashboard" element={authUser?.user?.role === "@dmin" ? <AdminDashboard /> : <Navigate to="/" />} />
              <Route path="/all-student" element={authUser?.user?.role === "@dmin" ? <AllLoginStudentData /> : <Navigate to="/" />} />
              <Route path="/set-paper" element={authUser?.user?.role === "@dmin" ? <SetPaper/> : <Navigate to="/" />} />

              <Route path="*" element={authUser ? <Dashboard /> : <Navigate to="/" />} />
            </Routes>
            
          </>
          )}
        </div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: '20px',
              fontWeight: "700",
              borderRadius: "12px",
              color: "#4f39f6",
              border: "solid 2px #4f39f6",
              backgroundColor: "white"
            },
            iconTheme: {
              secondary: 'white',
            },
          }}
        />
      </div>
    </>
  )
}

export default App