import { Route, Routes, Navigate } from 'react-router-dom'
import 'animate.css';
import { Toaster } from 'react-hot-toast'

import Navbar from './Com/Navbar'
import Home from './Com/Home'
import Login from './Com/Login'
import Signup from './Com/Signup'
import Dashboard from './Com/Dashboard';
import StudentExam from './Com/StudentExam.jsx';
import { useAuth } from "./Context/AuthProvider.jsx";


function App() {
  const [authUser, setAuthUser] = useAuth();
  return (
    <>
      <div className="w-full h-screen BG_Color Custom_Scroll overflow-y-auto">
        <div className='w-[95%] mx-auto  min-[1700px]:w-[70%] min-[3500px]:w-[40%]'>
          <Navbar />
          <Routes>
            <Route path="/" element={authUser ? <Navigate to="/dashboard" /> : <Home />} />
            <Route path="/login" element={authUser ? <Navigate to="/dashboard" /> : <Login />} />
            <Route path="/signup" element={authUser ? <Navigate to="/dashboard" /> : <Signup />} />
            <Route path="/dashboard" element={authUser ? <Dashboard /> : <Navigate to="/" />} />
             <Route path="/start-exam" element={authUser ?   <StudentExam/> : <Navigate to="/" />} />
           
          </Routes>
        </div>
        <Toaster
          position="bottom-right"
          reverseOrder={false}
          toastOptions={{
            style: {
              border: 'none',
              fontSize: '20px',
              fontWeight: "700",
              color: "#4f39f6",
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