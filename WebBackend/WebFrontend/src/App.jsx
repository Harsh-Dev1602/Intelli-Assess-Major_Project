import { Route, Routes, Navigate } from 'react-router-dom'
import 'animate.css';
import { Toaster } from 'react-hot-toast'
import { useEffect, useState } from 'react';

import { useAuth } from "./Context/AuthProvider.jsx";
import Loading from './Com/Loading/Loading.jsx';

import Navbar from './Com/Navbar'
import About from './Com/About.jsx'
import Contect from './Com/Contect.jsx'
import Home from './Com/Home'
import Login from './Com/Login'
import Signup from './Com/Signup'
import PrivacyPolicy from './Com/PrivacyPolicy.jsx';

import Dashboard from './Com/Dashboard/Dashboard.jsx';
import StudentExam from './Com/Dashboard/StudentExam.jsx';

import AdminDashboard from './Com/AdminDashboard/AdminDashboard.jsx';
import AllLoginStudentData from './Com/AdminDashboard/allLoginStudentData.jsx';
import SetPaper from './Com/AdminDashboard/SetPaper.jsx';
import ViewAllQues from './Com/AdminDashboard/ViewAllQues.jsx';

function App() {
  const [authUser] = useAuth();
  const [loading, setLoading] = useState(true);

  // Mock loading effect for branding
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Helper for Role-Based Access Control
  const isAdmin = authUser?.user?.role === "@dmin";

  return (
    <div className="w-full min-h-screen bg-[#f8f9fa] selection:bg-orange-100 selection:text-orange-600">
      {loading ? (
        <Loading />
      ) : (
        <>
          <Navbar />
          <div className="animate__animated animate__fadeIn">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <Home />} />
              <Route path='/about' element={<About />} />
              <Route path='/privacy-policy' element={<PrivacyPolicy />} />
              <Route path='/contact' element={<Contect />} />
              <Route path="/login" element={authUser ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/signup" element={authUser ? <Navigate to="/dashboard" /> : <Signup />} />

              {/* Student Routes */}
              <Route 
                path="/dashboard" 
                element={authUser ? (isAdmin ? <Navigate to="/admin-dashboard" /> : <Dashboard />) : <Navigate to="/login" />} 
              />
              <Route 
                path="/start-exam" 
                element={authUser && !isAdmin ? <StudentExam /> : <Navigate to="/login" />} 
              />

              {/* Admin Routes */}
              <Route path="/admin-dashboard" element={isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
              <Route path="/all-student" element={isAdmin ? <AllLoginStudentData /> : <Navigate to="/" />} />
              <Route path="/set-paper" element={isAdmin ? <SetPaper /> : <Navigate to="/" />} />
              <Route path="/view-ques" element={isAdmin ? <ViewAllQues /> : <Navigate to="/" />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to={authUser ? "/dashboard" : "/"} />} />
            </Routes>
          </div>
        </>
      )}

      {/* Theme-Synced Toaster */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: '14px',
            fontWeight: "600",
            borderRadius: "4px",
            color: "#002347", // Navy
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
          },
          success: {
            iconTheme: {
              primary: '#10b981', // Green
              secondary: '#ffffff',
            },
          },
          error: {
            iconTheme: {
              primary: '#ef4444', // Red
              secondary: '#ffffff',
            },
          },
        }}
      />
    </div>
  )
}

export default App;