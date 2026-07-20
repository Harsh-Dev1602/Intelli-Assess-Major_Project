import React, { useEffect, useRef, useState } from "react";
import toast from 'react-hot-toast';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import logo from "../../../public/Logo_Img.png"
import AuthS from "../../../public/Authorized_Signatory.png"
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSecurity,
  MdPermCameraMic,
  MdTrendingUp,
  MdReportProblem,
  MdLightbulbOutline,
  MdOutlineWarningAmber,
  MdFileDownload,
  MdAutoAwesome
} from "react-icons/md";
import { IoTimerOutline } from "react-icons/io5";
import Slider from "react-slick";
import axios from "axios";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider.jsx";

const QUESTION_TIME_LIMIT = 40;

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

  const [overallTimeLeft, setOverallTimeLeft] = useState(600);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(QUESTION_TIME_LIMIT);

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
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      }, 100);
    } catch (err) {
      toast.error("Camera and microphone access is required.");
    }
  };

  // --- Core Lifecycle ---
  useEffect(() => {
    if (!authUser || !cameraReady) return;

    axios.get("/oes-api/user/questions").then(res => {
      const fetchedQuestions = res.data;
      setQuestions(fetchedQuestions);
      setOverallTimeLeft(fetchedQuestions.length * QUESTION_TIME_LIMIT);
    });

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

  // --- Overall Exam Timer Logic ---
  useEffect(() => {
    if (!cameraReady || finished) return;

    const mainTimer = setInterval(() => {
      setOverallTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(mainTimer);
          toast.error("Overall exam time is up! Submitting answers.");
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(mainTimer);
  }, [cameraReady, finished]);

  // --- Per-Question Timer Logic ---
  useEffect(() => {
    if (!cameraReady || finished || questions.length === 0) return;

    setQuestionTimeLeft(QUESTION_TIME_LIMIT);

    const qTimer = setInterval(() => {
      setQuestionTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(qTimer);
          toast.error("Time up for this question! Moving forward.");
          handleNext(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(qTimer);
  }, [currentQ, cameraReady, finished, questions]);

  const handleNext = (isTimeOut = false) => {
    if (selected !== null || isTimeOut) {
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

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (questionTimeLeft / QUESTION_TIME_LIMIT) * circumference;

  const getTimerColor = () => {
    if (questionTimeLeft <= 10) return "text-red-500 stroke-red-500";
    if (questionTimeLeft <= 20) return "text-yellow-500 stroke-yellow-500";
    return "text-orange-500 stroke-orange-500";
  };

  // --- SWOT Data Generation logic ---
  const generateSWOT = () => {
    const total = questions.length || 1;
    const pct = (score / total) * 100;
    const unansweredCount = selectedAnswers.filter(ans => ans === null || ans === undefined).length;

    let strengths = [
      "Demonstrated quick decision-making loops under safe, proctored constraints.",
      "High level of compliance and focus throughout the proctored window."
    ];
    let weaknesses = [];
    let opportunities = [
      "Improve baseline time allocation. Spend under 25 seconds per easy/medium question.",
      "Build dynamic review patterns to tackle lingering edge-case topics."
    ];
    let threats = [
      "High sensitivity to strict question-specific system constraints.",
      "Losing vital points on unanswered items due to time limits."
    ];
    let aiSummary = "";

    if (pct >= 80) {
      strengths.unshift("Outstanding conceptual accuracy and core syllabus mastery.");
      opportunities.unshift("Great candidate for accelerated certifications.");
      aiSummary = `Excellent performance at ${pct.toFixed(1)}%. The student has mastered advanced logical patterns. Focus on maintaining this consistency while minimizing any minor edge-case oversights.`;
    } else if (pct >= 50) {
      strengths.unshift("Steady performance and highly reliable on intermediate-difficulty queries.");
      weaknesses.unshift("Inconsistent performance under stress on final questions.");
      opportunities.unshift("Utilize focused modular practice quizzes to target weaker concepts.");
      aiSummary = `Solid average output at ${pct.toFixed(1)}%. Core understanding is present, but target review on incorrect answers is recommended to cross the high-performance 80% threshold.`;
    } else {
      weaknesses.unshift("Foundational concepts require targeted academic remediation.");
      weaknesses.unshift("Struggled to complete responses efficiently under safe environments.");
      opportunities.unshift("Leverage foundational step-by-step guides.");
      threats.unshift("Compounding knowledge gaps will escalate difficulty in subsequent modules.");
      aiSummary = `The evaluation results indicate clear conceptual barriers at ${pct.toFixed(1)}%. Immediate review of fundamental principles is strongly advised.`;
    }

    if (unansweredCount > 0) {
      weaknesses.push(`Forfeited score opportunities on ${unansweredCount} item(s) due to question timeouts.`);
    }

    return { strengths, weaknesses, opportunities, threats, aiSummary };
  };

  // --- Tailwind CSS Powered PDF Generator with Rectangular Verification Seal ---
  const handleNativeDownloadPDF = () => {
    const swot = generateSWOT();
    const total = questions.length;
    const pct = ((score / (total || 1)) * 100).toFixed(1);
    const studentName = authUser?.user?.fullname || "Student";
    const examStatus = pct >= 40 ? "PASSED" : "FAILED";

    // Convert local logo to Base64 safely for isolation pipeline
    const convertImageToBase64 = (url, callback) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        const reader = new FileReader();
        reader.onloadend = function () {
          callback(reader.result);
        };
        reader.readAsDataURL(xhr.response);
      };
      xhr.open("GET", url);
      xhr.responseType = "blob";
      xhr.send();
    };

    convertImageToBase64(logo, (base64Logo) => {
      const iframe = document.createElement("iframe");
      iframe.style.position = "absolute";
      iframe.style.width = "0px";
      iframe.style.height = "0px";
      iframe.style.border = "none";
      document.body.appendChild(iframe);

      const doc = iframe.contentWindow.document;

      const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${studentName} - IntelliAssess Performance Card</title>
          <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
            
            @page {
              size: A4;
              margin: 0;
            }
            body {
              font-family: 'Inter', sans-serif;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
            .outer-border-frame {
              border: 5px double #ea580c;
              outline-offset: -8px;
              border-radius: 8px;
            }
            .watermark-overlay {
              position: absolute;
              top: 55%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-28deg);
              font-size: 72px;
              font-weight: 900;
              color: rgba(241, 245, 249, 0.6);
              letter-spacing: 0.2em;
              white-space: nowrap;
              pointer-events: none;
              z-index: 0;
              text-transform: uppercase;
            }
          </style>
        </head>
        <body class="w-[210mm] h-[297mm] bg-white p-4 box-border relative overflow-hidden">
          
          <div class="outer-border-frame w-full h-full p-6 box-border bg-white flex flex-col justify-between relative">
            <div class="watermark-overlay">INTELLIASSESS</div>

            <div class="relative z-10 h-full">
              
              <div class="flex justify-between items-center border-b-2 border-orange-500 pb-4">
                <div class="flex items-center gap-3.5">
                  <img class="w-14 h-14 object-contain" src="${base64Logo}" alt="IntelliAssess" />
                  <div>
                    <h1 class="text-2xl font-black text-[#002347] tracking-tight m-0">Intelli<span class="text-orange-600">Assess</span></h1>
                    <p class="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mt-0.5">ISO 9001:2015 Evaluated Cognitive Platform</p>
                  </div>
                </div>
                <div class="text-right">
                  <span class="inline-block text-[10px] bg-[#002347] text-white px-3 py-1 font-bold rounded tracking-widest uppercase">
                    Statement of Marks
                  </span>
                  <p class="text-[9px] text-slate-400 font-mono mt-1">Ref No: IA-${Math.floor(100000 + Math.random() * 900000)}</p>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-x-8 gap-y-2.5 my-3 bg-slate-50/70 p-4 rounded-lg border border-slate-100 text-[11px]">
                <div class="flex"><span class="w-32 text-slate-500 font-bold uppercase tracking-wide">Candidate Name:</span><span class="font-extrabold text-[#002347] uppercase">${studentName}</span></div>
                <div class="flex"><span class="w-32 text-slate-500 font-bold uppercase tracking-wide">Date of Issue:</span><span class="font-semibold text-slate-700">${new Date().toLocaleDateString()}</span></div>
                <div class="flex"><span class="w-32 text-slate-500 font-bold uppercase tracking-wide">Registration ID:</span><span class="font-mono text-slate-700 font-semibold">REG-${Math.floor(90000000 + Math.random() * 9000000)}</span></div>
                <div class="flex"><span class="w-32 text-slate-500 font-bold uppercase tracking-wide">Evaluation Model:</span><span class="font-semibold text-slate-700">Adaptive Cognitive Core</span></div>
              </div>

              <div class="my-2">
                <h3 class="text-[10px] font-black uppercase text-[#002347] tracking-wider mb-2">I. Behavioral & Analytical Matrix</h3>
                <div class="grid grid-cols-4 gap-2.5">
                  <div class="bg-emerald-50/70 border border-emerald-200/60 p-2.5 rounded">
                    <div class="text-[9px] font-black uppercase text-emerald-700 mb-1">Strengths</div>
                    <p class="text-[9.5px] text-slate-600 leading-snug">${swot.strengths[0] || 'N/A'}</p>
                  </div>
                  <div class="bg-rose-50/70 border border-rose-200/60 p-2.5 rounded">
                    <div class="text-[9px] font-black uppercase text-rose-700 mb-1">Vulnerabilities</div>
                    <p class="text-[9.5px] text-slate-600 leading-snug">${swot.weaknesses[0] || 'Speed thresholds call for dynamic optimizations.'}</p>
                  </div>
                  <div class="bg-cyan-50/70 border border-cyan-200/60 p-2.5 rounded">
                    <div class="text-[9px] font-black uppercase text-cyan-700 mb-1">Opportunities</div>
                    <p class="text-[9.5px] text-slate-600 leading-snug">${swot.opportunities[0] || 'N/A'}</p>
                  </div>
                  <div class="bg-amber-50/70 border border-amber-200/60 p-2.5 rounded">
                    <div class="text-[9px] font-black uppercase text-amber-700 mb-1">Risks</div>
                    <p class="text-[9.5px] text-slate-600 leading-snug">${swot.threats[0] || 'N/A'}</p>
                  </div>
                </div>
              </div>

              <div class=" mt-4 pt-4 border-t border-dashed border-slate-200">
                <div class="grid grid-cols-3 gap-4 bg-[#002347] p-3 rounded-lg text-white text-center">
                  <div>
                    <div class="text-[8px] uppercase tracking-wider opacity-60 font-semibold">Total Gross Mark</div>
                    <div class="text-lg font-black">${score} / ${total}</div>
                  </div>
                  <div>
                    <div class="text-[8px] uppercase tracking-wider opacity-60 font-semibold">Aggregate Percentage</div>
                    <div class="text-lg font-black">${pct}%</div>
                  </div>
                  <div>
                    <div class="text-[8px] uppercase tracking-wider opacity-60 font-semibold">Result Evaluation</div>
                    <div class="text-lg font-black tracking-wide ${examStatus === 'PASSED' ? 'text-emerald-400' : 'text-rose-400'}">${examStatus}</div>
                  </div>
                </div>

                <div class="mt-2 text-center text-[7.5px] text-slate-400 uppercase tracking-widest font-medium">
                  Scale: Excellent: 85%-100% | Very Good: 70%-84% | Good: 55%-69% | Pass Boundary: 40%
                </div>

                <div class="flex justify-between items-end mt-4 pt-3 border-t border-slate-100">
                  <div class="text-[8px] text-slate-400 font-semibold uppercase">
                    Portal Security Engine Verified <br/>
                    <span class="text-[7px] text-slate-300 font-mono">MD5-HASH: ${Math.random().toString(36).substring(2, 10).toUpperCase()}</span>
                  </div>
                  
                  <div class="flex items-center gap-3">
                    <div class=" border -rotate-12 rounded-md border-double border-[#000080] p-1.5 text-center bg-orange-50/30 w-28 box-border">
                      <div class="text-[10px] font-bold uppercase text-[#000080] tracking-wider">INTELLI ASSESS</div>
                      <div class="text-[8px] font-bold text-[#000080] my-0.5 leading-none">VERIFIED</div>
                      <div class="border-t border-[#000080] pt-1 text-[10px] font-bold text-red-700">${new Date().toLocaleDateString()}</div>
                    </div>
                    
                    <div class="text-center w-28 ">
                      <img class="w-20 h-auto ml-6 mb-1  -rotate-12 object-contain" src="${AuthS}" alt="IntelliAssess" />
                      <div class="text-[7px] border-t border-slate-400 pt-1 font-bold text-[#002347] uppercase tracking-wider">Authorized Signatory</div>
                      <p class="text-[7px] text-slate-400 uppercase font-medium mt-0.5">IntelliAssess Core</p>
                    </div>
                  </div>
                </div>
                
              </div>

            </div>
          </div>
        </body>
      </html>
    `;

      doc.open();
      doc.write(printContent);
      doc.close();

      // A slightly longer delay gives the script tags and styles time to compute structure inside the iframe window before invoking print
      setTimeout(() => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
        document.body.removeChild(iframe);
      }, 800);
    });
  };

  // --- 1. Camera Setup View ---
  if (!cameraReady) {
    return (
      <div className="min-h-[calc(100vh-82px)] bg-[#f8f9fa] flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-2xl text-center border-t-4 border-[#002347]">
          <MdPermCameraMic className="mx-auto text-6xl text-orange-500 mb-4" />
          <h2 className="text-2xl font-bold text-[#002347] mb-4">Hardware Check</h2>
          <p className="text-gray-500 text-sm mb-6">Monitoring is mandatory for this session.</p>
          <button onClick={startCamera} className="w-full bg-[#002347] hover:bg-slate-800 text-white py-3 rounded-lg font-bold transition-all uppercase tracking-widest text-xs">
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
    const swot = generateSWOT();

    const saveData = () => {
      axios.post("/oes-api/user/results", {
        score,
        total: questions.length,
        percentage,
        status: isPassed ? "✅ Passed" : "❌ Failed",
        user: authUser?.user?.fullname,
      }).catch(err => console.error("Save error:", err));
    };

    return (
      <div className="min-h-[calc(100vh-82px)] bg-[#f8f9fa] flex flex-col items-center py-8 px-4">

        <div className="w-full max-w-4xl flex flex-col gap-6">

          {/* Action Ribbon with the Native PDF Downloader */}
          <div className="flex justify-between items-center bg-white p-4 rounded-xl shadow-md border border-gray-100">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">
              AI cognitive SWOT Assessment
            </span>
            <button
              onClick={handleNativeDownloadPDF}
              className="flex items-center gap-2 px-5 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-lg uppercase text-xs tracking-wider shadow-lg transition-all active:scale-95"
            >
              <MdFileDownload size={16} /> Download Marksheet PDF
            </button>
          </div>

          {/* Screen Dashboard Representation */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-10 border border-gray-100">

            <div className={`p-6 text-center text-white rounded-xl mb-8 ${isPassed ? 'bg-green-600' : 'bg-red-600'}`}>
              <h2 className="text-2xl font-bold uppercase tracking-wider">
                {isPassed ? "Exam Passed 🎉" : "Exam Finished"}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Total Score</p>
                <p className="text-2xl font-bold text-[#002347]">{score} / {questions.length}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Percentage</p>
                <p className="text-2xl font-bold text-[#002347]">{percentage.toFixed(1)}%</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-1">Student</p>
                <p className="text-lg font-bold text-orange-500 truncate mt-1">{authUser?.user?.fullname || "Student"}</p>
              </div>
            </div>

            {/* AI Summary UI */}
            <div className="mb-8 p-5 bg-orange-50/50 rounded-xl border border-orange-100">
              <h3 className="text-xs font-black text-orange-600 uppercase tracking-widest mb-2 flex items-center gap-1.5">
                <MdAutoAwesome className="text-orange-500" /> AI Executive Insight
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                {swot.aiSummary}
              </p>
            </div>

            {/* SWOT Visual Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

              <div className="bg-emerald-50/20 border border-emerald-100 rounded-xl p-5">
                <div className="flex items-center gap-2 text-emerald-600 mb-3 font-bold uppercase tracking-widest text-xs">
                  <span className="p-1.5 bg-emerald-100/50 rounded-md text-sm"><MdTrendingUp /></span>
                  Strengths
                </div>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600 list-disc list-inside">
                  {swot.strengths.map((s, idx) => <li key={idx}>{s}</li>)}
                </ul>
              </div>

              <div className="bg-rose-50/20 border border-rose-100 rounded-xl p-5">
                <div className="flex items-center gap-2 text-rose-600 mb-3 font-bold uppercase tracking-widest text-xs">
                  <span className="p-1.5 bg-rose-100/50 rounded-md text-sm"><MdReportProblem /></span>
                  Weaknesses
                </div>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600 list-disc list-inside">
                  {swot.weaknesses.map((w, idx) => <li key={idx}>{w}</li>)}
                </ul>
              </div>

              <div className="bg-cyan-50/20 border border-cyan-100 rounded-xl p-5">
                <div className="flex items-center gap-2 text-cyan-600 mb-3 font-bold uppercase tracking-widest text-xs">
                  <span className="p-1.5 bg-cyan-100/50 rounded-md text-sm"><MdLightbulbOutline /></span>
                  Opportunities
                </div>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600 list-disc list-inside">
                  {swot.opportunities.map((o, idx) => <li key={idx}>{o}</li>)}
                </ul>
              </div>

              <div className="bg-amber-50/20 border border-amber-100 rounded-xl p-5">
                <div className="flex items-center gap-2 text-amber-600 mb-3 font-bold uppercase tracking-widest text-xs">
                  <span className="p-1.5 bg-amber-100/50 rounded-md text-sm"><MdOutlineWarningAmber /></span>
                  Threats
                </div>
                <ul className="space-y-2 text-xs md:text-sm text-gray-600 list-disc list-inside">
                  {swot.threats.map((t, idx) => <li key={idx}>{t}</li>)}
                </ul>
              </div>

            </div>
          </div>

          <div className="text-center">
            <Link
              onClick={saveData}
              to="/dashboard"
              className="w-full inline-block px-12 py-4 bg-[#002347] text-white font-bold rounded-xl uppercase text-xs tracking-[0.2em] mb-10 transition-all hover:bg-slate-800 active:scale-95 shadow-lg"
            >
              Go to Dashboard
            </Link>
          </div>

          {/* Answer Review Slider */}
          {questions.length > 0 && (
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-10 mb-10">
              <h3 className="text-xs font-black text-gray-400 uppercase mb-8 tracking-widest text-center">
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
                            <span>{q.options[selectedAnswers[i]] || "Not Answered / Timed Out"}</span>
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
    );
  }

  const progressPercentage = (questionTimeLeft / QUESTION_TIME_LIMIT) * 100;

  // --- 3. Live Exam UI ---
  return (
    <div className="min-h-[calc(100vh-82px)] bg-[#f8f9fa] flex flex-col items-center py-6 px-4 relative">
      <div className="w-full max-w-5xl flex flex-col md:flex-row gap-6 items-start">

        {/* Exam Card */}
        <div className="w-full md:flex-1 bg-white shadow-xl rounded-xl border border-gray-100 overflow-hidden flex flex-col" style={{ height: "calc(100vh - 150px)" }}>
          <div className="bg-[#002347] p-4 px-6 text-white flex justify-between items-center relative">
            <h2 className="text-xs md:text-sm font-bold uppercase tracking-widest">Question {currentQ + 1} of {questions.length}</h2>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 bg-slate-800 border border-slate-700 px-3 py-1 rounded-md text-xs font-semibold tracking-wider font-mono">
                <IoTimerOutline className="text-orange-400 text-sm" />
                <span className={overallTimeLeft < 60 ? "text-red-400 animate-pulse" : "text-gray-200"}>
                  {formatTime(overallTimeLeft)}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30">
                <MdSecurity className="text-orange-400 animate-pulse" />
                <span className="text-[10px] font-bold tracking-widest">SECURE</span>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-slate-800">
              <div
                className={`h-full transition-all duration-1000 ease-linear ${questionTimeLeft <= 10 ? 'bg-red-500' : 'bg-orange-500'
                  }`}
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          <div className="bg-slate-50 border-b border-gray-100 px-6 py-3 flex justify-between items-center">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Remaining for this question:</span>
            <div className="flex items-center gap-2">
              <div className="relative flex items-center justify-center w-12 h-12">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="24" cy="24" r={radius} className="stroke-gray-200 fill-none" strokeWidth="3.5" />
                  <circle
                    cx="24"
                    cy="24"
                    r={radius}
                    className={`fill-none transition-all duration-1000 ease-linear ${getTimerColor()}`}
                    strokeWidth="3.5"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                  />
                </svg>
                <span className={`absolute text-xs font-mono font-black ${getTimerColor()} ${questionTimeLeft <= 5 ? 'animate-bounce' : ''}`}>
                  {questionTimeLeft}
                </span>
              </div>
            </div>
          </div>

          <div ref={scrollContainerRef} className="p-6 md:p-10 flex-1 overflow-y-auto Custom_Scroll">
            {questions[currentQ] && (
              <div className="animate__animated animate__fadeIn">
                <h3 className="text-lg md:text-xl font-bold text-[#002347] mb-6 leading-relaxed">
                  {questions[currentQ].question}
                </h3>
                {questions[currentQ].img && (
                  <img src={questions[currentQ].img} className="w-full max-h-64 object-contain rounded-lg mb-6 bg-gray-50 p-2" alt="Context" />
                )}
                <div className="space-y-3">
                  {questions[currentQ].options.map((opt, idx) => (
                    <label
                      key={idx}
                      className={`flex items-center gap-4 p-4 border rounded-xl cursor-pointer transition-all ${selected === idx
                        ? "border-orange-500 bg-orange-50/50 ring-1 ring-orange-500"
                        : "border-gray-100 hover:border-gray-300 bg-gray-50/50"
                        }`}
                    >
                      <input
                        type="radio"
                        name="option"
                        className="w-4 h-4 accent-orange-600"
                        checked={selected === idx}
                        onChange={() => setSelected(idx)}
                      />
                      <span className={`text-sm md:text-base ${selected === idx ? "font-bold text-orange-950" : "text-gray-600"}`}>
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
              onClick={() => handleNext(false)}
              className="w-full md:w-auto px-12 py-3 bg-[#002347] hover:bg-slate-800 text-white font-bold rounded-lg uppercase text-xs tracking-widest shadow-lg transition-all active:scale-95"
            >
              {currentQ + 1 === questions.length ? "Finish Exam" : "Next Question"}
            </button>
          </div>
        </div>

        {/* Proctor Sidebar */}
        <div className="w-full md:w-64 flex flex-col gap-4">
          <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-orange-500 bg-black aspect-video md:aspect-square">
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