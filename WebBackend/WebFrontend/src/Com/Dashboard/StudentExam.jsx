import React, { useEffect, useRef, useState } from "react";
import toast from 'react-hot-toast'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdSecurity } from "react-icons/md";
import Slider from "react-slick";
import axios from "axios";
import { MdPermCameraMic } from "react-icons/md";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider.jsx";

function StudentExam() {
  const [authUser] = useAuth();
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  
  // Ref for the video element and scroll container
  const videoRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // --- Fullscreen & Security Helpers ---
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setCameraStream(stream);
      setCameraReady(true);
      // Wait for the DOM to render the video element, then attach the stream
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      toast.error("Camera and microphone access is required.");
    }
  };

  useEffect(() => {
    if (!authUser || !cameraReady) return;

    axios.get("/oes-api/user/questions").then(res => setQuestions(res.data));
    axios.get("/oes-api/user/answers").then(res => setAnswers(res.data));

    enterFullScreen();

    const handleSecurityViolation = (msg) => {
      if (!finished) {
        toast.error(msg);
        setFinished(true);
      }
    };

    const handleBlur = () => handleSecurityViolation("Tab switch detected! Exam terminated.");
    const handleFullscreenChange = () => {
      if (!document.fullscreenElement) handleSecurityViolation("Fullscreen exited! Exam terminated.");
    };

    window.addEventListener("blur", handleBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [cameraReady, finished, authUser]);

  useEffect(() => {
    if (finished && cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      exitFullScreen();
    }
  }, [finished, cameraStream]);

  const handleNext = () => {
    if (selected !== null) {
      const updated = [...selectedAnswers];
      updated[currentQ] = selected;
      setSelectedAnswers(updated);

      if (selected === answers[currentQ]) setScore(s => s + 1);

      setSelected(null);
      if (currentQ + 1 < questions.length) {
        setCurrentQ(currentQ + 1);
        if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
      } else {
        setFinished(true);
      }
    } else {
      toast.error("Please select an option!");
    }
  };

  // --- 1. Camera Setup View ---
  if (!cameraReady) {
    return (
      <div className="min-h-[calc(100vh-82px)] bg-[#f8f9fa] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl text-center border-t-4 border-[#002347]">
          <MdPermCameraMic className="mx-auto text-6xl text-orange-500 mb-4" />
          <h2 className="text-2xl font-bold text-[#002347] mb-4">Hardware Check</h2>
          <p className="text-gray-500 text-sm mb-6">Monitoring is mandatory for this session.</p>
          <button onClick={startCamera} className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-bold transition-all uppercase tracking-widest text-xs">
            Allow Access
          </button>
        </div>
      </div>
    );
  }

  // --- 2. Finished State ---
  if (finished) {
    const percentage = (score / (questions.length || 1)) * 100;
    const isPassed = percentage >= 40;

    const saveData = () => {
      axios.post("/oes-api/user/results", {
        score,
        total: questions.length,
        percentage,
        status: isPassed ? "✅ Passed" : "❌ Failed",
        user: authUser.user.fullname,
      }).catch(err => console.error("Save error:", err));
    };

    return (
      <div className="min-h-[calc(100vh-82px)] bg-[#f8f9fa] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl overflow-hidden animate__animated animate__fadeIn">
        
        {/* Top Status Bar */}
        <div className={`p-6 text-center text-white ${isPassed ? 'bg-green-600' : 'bg-red-600'}`}>
          <h2 className="text-2xl font-bold uppercase tracking-wider">
            {isPassed ? "Exam Passed 🎉" : "Exam Finished"}
          </h2>
        </div>

        <div className="p-6 md:p-8 text-center">
          {/* Score Cards: Stack on mobile, side-by-side on md+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total Score</p>
              <p className="text-3xl font-bold text-[#002347]">{score} / {questions.length}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm">
              <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Percentage</p>
              <p className="text-3xl font-bold text-[#002347]">{percentage.toFixed(1)}%</p>
            </div>
          </div>

          <Link 
            onClick={saveData} 
            to="/dashboard" 
            className="w-full md:w-auto inline-block px-12 py-4 bg-[#002347] text-white font-bold rounded-xl uppercase text-xs tracking-[0.2em] mb-10 transition-all hover:bg-slate-800 active:scale-95 shadow-lg"
          >
            Go to Dashboard
          </Link>

          {/* Review Section */}
          {questions.length > 0 && (
            <div className="border-t pt-8 px-2 md:px-8">
              <h3 className="text-xs font-black text-gray-400 uppercase mb-8 tracking-widest">
                Review Your Answers
              </h3>
              
              <div className="relative px-6 md:px-10">
                <Slider speed={500} nextArrow={<NextArrow />} prevArrow={<PrevArrow />}>
                  {questions.map((q, i) => (
                    <div key={i} className="outline-none">
                      <div className="text-left bg-slate-50 p-4 md:p-6 rounded-2xl border border-gray-100">
                        <p className="font-bold text-[#002347] text-sm md:text-base mb-4 leading-relaxed">
                          <span className="text-orange-500 mr-2">Q{i + 1}.</span> {q.question}
                        </p>
                        
                        <div className="space-y-2 text-xs md:text-sm">
                          <div className={`p-3 rounded-lg flex items-start gap-2 ${selectedAnswers[i] === answers[i] ? 'bg-green-100/50 text-green-700' : 'bg-red-100/50 text-red-700'}`}>
                            <span className="font-bold shrink-0">Your Answer:</span>
                            <span>{q.options[selectedAnswers[i]] || "Not Answered"}</span>
                          </div>
                          
                          <div className="p-3 rounded-lg bg-green-100/50 text-green-800 flex items-start gap-2">
                            <span className="font-bold shrink-0">Correct Answer:</span>
                            <span>{q.options[answers[i]]}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
    );
  }

  // --- 3. Live Exam UI ---
  return (
    <div className="min-h-[calc(100vh-82px)] bg-[#f8f9fa] flex flex-col items-center py-6 px-4 relative">
      
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 items-start">
        
        {/* Exam Card */}
        <div className="w-full md:flex-1 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden flex flex-col" style={{ height: "calc(100vh - 150px)" }}>
          
          <div className="bg-[#002347] p-4 px-6 text-white flex justify-between items-center">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest">Question {currentQ + 1} of {questions.length}</h2>
            <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
              <MdSecurity className="text-orange-500 animate-pulse" />
              <span className="text-[10px] font-bold tracking-widest">SECURE</span>
            </div>
          </div>

          <div ref={scrollContainerRef} className="p-6 md:p-10 flex-1 overflow-y-auto Custom_Scroll">
            {questions[currentQ] && (
              <div className="animate__animated animate__fadeIn">
                <h3 className="text-lg md:text-xl font-bold text-[#002347] mb-6 leading-relaxed">
                  {questions[currentQ].question}
                </h3>

                {questions[currentQ].img && (
                  <img 
                    src={questions[currentQ].img} 
                    className="w-full max-h-64 object-contain rounded-lg mb-6 bg-gray-50 p-2" 
                    alt="Context" 
                  />
                )}

                <div className="space-y-3">
                  {questions[currentQ].options.map((opt, idx) => (
                    <label 
                      key={idx} 
                      className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${
                        selected === idx 
                          ? "border-orange-500 bg-orange-50 ring-1 ring-orange-500" 
                          : "border-gray-100 hover:border-gray-300 bg-gray-50/50"
                      }`}
                    >
                      <input 
                        type="radio" 
                        name="option" 
                        className="w-4 h-4 accent-orange-500" 
                        checked={selected === idx} 
                        onChange={() => setSelected(idx)} 
                      />
                      <span className={`text-sm md:text-base ${selected === idx ? "font-bold text-orange-700" : "text-gray-600"}`}>
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="p-4 md:p-6 bg-gray-50 border-t border-gray-100 flex justify-end">
            <button 
              onClick={handleNext} 
              className="w-full md:w-auto px-12 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg uppercase text-xs tracking-widest shadow-lg transition-all active:scale-95"
            >
              {currentQ + 1 === questions.length ? "Finish Exam" : "Next Question"}
            </button>
          </div>
        </div>

        {/* Proctor Sidebar */}
        <div className="w-full md:w-64 flex flex-col gap-4">
          <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-orange-500 bg-black aspect-video md:aspect-square">
            {/* CORRECTED: Using ref={videoRef} instead of id */}
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover" />
            <div className="absolute top-2 left-2 flex items-center gap-1 bg-red-600 text-white text-[8px] px-2 py-0.5 rounded-full font-bold">
              <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping" /> LIVE PROCTOR
            </div>
          </div>
          <div className="bg-[#002347] p-4 rounded-xl text-white text-center">
            <p className="text-[10px] text-orange-300 uppercase font-bold tracking-widest mb-1">Candidate</p>
            <p className="text-xs font-medium truncate">{authUser?.user?.fullname || "Student"}</p>
          </div>
        </div>

      </div>
    </div>
  );
}

const PrevArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute -left-6 md:-left-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 z-10">
    <MdKeyboardArrowLeft size={35} />
  </button>
);

const NextArrow = ({ onClick }) => (
  <button onClick={onClick} className="absolute -right-6 md:-right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-orange-500 z-10">
    <MdKeyboardArrowRight size={35} />
  </button>
);

export default StudentExam;

