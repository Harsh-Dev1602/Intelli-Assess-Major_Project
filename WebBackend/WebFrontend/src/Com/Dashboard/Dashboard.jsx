import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../../Context/AuthProvider";
import axios from 'axios';
import toast from 'react-hot-toast';
import { FaExclamationTriangle, FaCamera, FaExpand, FaLock, FaCheckCircle } from 'react-icons/fa';

function Dashboard() {
  const [authUser] = useAuth();
  const navigate = useNavigate();
  const [hasConsented, setHasConsented] = useState(false);

  const handleStartExam = async () => {
    if (!hasConsented) {
      toast.error("Please acknowledge the instructions first.");
      return;
    }

    try {
      const res = await axios.get(`/oes-api/user/results/check/${authUser.user.fullname}`);
      if (res.data.taken === true) {
        toast.error("You have already completed this exam!");
      } else {
        toast.success("Initializing secure environment...");
        navigate("/start-exam");
      }
    } catch (err) {
      toast.error("Error checking exam status");
      console.error(err);
    }
  };

  return (
    <div style={{minHeight:"calc(100vh - 82px)"}} className=" bg-[#f8f9fa] flex flex-col items-center py-2 px-4 font-sans">
      <div style={{maxHeight:"calc(100vh - 82px)"}} className="max-w-3xl w-full bg-white shadow-xl rounded-sm border border-gray-100 flex flex-col overflow-hidden" style={{ maxHeight: "calc(100vh - 180px)" }}>
        
        {/* --- FIXED HEADER --- */}
        <div className="bg-[#002347] p-5 text-white text-center flex-shrink-0">
          <h2 className="text-xl md:text-2xl font-extrabold uppercase tracking-widest flex justify-center items-center gap-3">
            <FaLock className="text-orange-500 text-lg" /> Examination Portal
          </h2>
          <p className="text-orange-300 text-[10px] font-bold mt-1 uppercase tracking-tighter">Candidate: {authUser?.user?.fullname}</p>
        </div>

        {/* --- SCROLLABLE CONTENT --- */}
        <div className="p-6 md:p-10 overflow-y-auto Custom_Scroll">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-100 pb-4">
            <FaExclamationTriangle className="text-orange-500 text-xl" />
            <h3 className="text-[#002347] font-bold text-lg">Mandatory Instructions</h3>
          </div>

          <div className="space-y-6 text-gray-600">
            {/* Instruction 1 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm border border-orange-100">1</div>
              <div>
                <p className="font-bold text-[#002347] text-sm mb-1 flex items-center gap-2">
                  <FaCamera className="text-xs" /> Proctored Environment
                </p>
                <p className="text-xs leading-relaxed text-justify text-gray-500">Continuous audio/video monitoring is active. Do not cover your webcam or mute your microphone.</p>
              </div>
            </div>

            {/* Instruction 2 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm border border-orange-100">2</div>
              <div>
                <p className="font-bold text-[#002347] text-sm mb-1 flex items-center gap-2">
                  <FaExpand className="text-xs" /> Single Tab Restriction
                </p>
                <p className="text-xs leading-relaxed text-justify text-gray-500 italic">
                  <strong>Strict Policy:</strong> Opening new tabs, windows, or using keyboard shortcuts to switch apps will trigger an instant "Malpractice Termination."
                </p>
              </div>
            </div>

            {/* Instruction 3 */}
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 bg-orange-50 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm border border-orange-100">3</div>
              <div>
                <p className="font-bold text-[#002347] text-sm mb-1">Session Stability</p>
                <p className="text-xs leading-relaxed text-justify text-gray-500">Do not refresh the page or use the 'Back' button. Ensure you have at least 60 minutes of uninterrupted power and internet.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- FIXED FOOTER ACTION --- */}
        <div className="p-6 bg-gray-50 border-t border-gray-100 flex-shrink-0">
          <label className="flex items-center justify-center gap-3 cursor-pointer group mb-6">
            <input 
              type="checkbox" 
              className="w-5 h-5 accent-orange-500 rounded border-gray-300"
              checked={hasConsented}
              onChange={(e) => setHasConsented(e.target.checked)}
            />
            <span className="text-[11px] text-[#002347] font-bold uppercase tracking-wide group-hover:text-orange-600 transition-colors">
              I understand that switching tabs will end my exam immediately.
            </span>
          </label>
          
          <div className="text-center">
            <button 
              onClick={handleStartExam} 
              disabled={!hasConsented}
              className={`w-full md:w-72 py-4 font-bold rounded-sm uppercase text-xs tracking-widest transition-all shadow-lg ${
                hasConsented 
                ? "bg-gradient-to-r from-orange-500 to-yellow-400 text-white hover:shadow-orange-200 active:scale-95" 
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
              }`}
            >
              Start Secure Session
            </button>
          </div>
        </div>
      </div>

      {/* Warning Box */}
      <div className="max-w-3xl w-full mt-6 bg-red-50 border-l-4 border-red-500 p-4 flex-shrink-0 shadow-sm">
        <div className="flex gap-3 items-center">
          <FaExclamationTriangle className="text-red-500 text-sm" />
          <p className="text-red-700 text-[11px] font-bold">
            SYSTEM NOTICE: All navigation events are logged.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;