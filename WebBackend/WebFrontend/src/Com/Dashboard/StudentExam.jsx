import { useEffect, useState } from "react";
import toast from 'react-hot-toast'
import axios from "axios";
import { MdPermCameraMic } from "react-icons/md";
import { Link } from "react-router-dom";

import { useAuth } from "../../Context/AuthProvider.jsx";

function StudentExam() {
  const [authUser, setAuthUser] = useAuth();
  const [cameraStream, setCameraStream] = useState(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  // ✅ Fullscreen functions
  const enterFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) elem.requestFullscreen();
    else if (elem.webkitRequestFullscreen) elem.webkitRequestFullscreen();
    else if (elem.mozRequestFullScreen) elem.mozRequestFullScreen();
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) document.exitFullscreen();
    else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
    else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
  };

  // ✅ Start Camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      setCameraStream(stream);
      setCameraReady(true);
      const video = document.getElementById("examVideo");
      if (video) {
        video.srcObject = stream;
        video.play();
      }
    } catch (err) {
      toast.error("Camera and microphone access is required.");
    }
  };
  // ✅ Load questions & answers when camera ready
  useEffect(() => {
    if (!authUser) return;
    if (!cameraReady) return;

    axios.get("oes-api/user/questions").then(res => setQuestions(res.data));
    axios.get("oes-api/user/answers").then(res => setAnswers(res.data));

    enterFullScreen(); // ✅ enter fullscreen

    const handleBlur = () => {
      if (!finished) {
        toast.error("Tab switch detected! Exam will end.");
        setFinished(true);
      }
    };

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && !finished) {
        toast.error("Fullscreen exited! Exam will end.");
        setFinished(true);
      }
    };
    window.addEventListener("blur", handleBlur);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, [cameraReady, finished]);
  // ✅ Stop camera & exit fullscreen when finished
  useEffect(() => {
    if (finished && cameraStream) {
      cameraStream.getTracks().forEach(track => track.stop());
      exitFullScreen();
    }
  }, [finished, cameraStream]);

  const handleNext = () => {
    if (selected !== null) {
      if (selected === answers[currentQ]) setScore(score + 1);
      setSelected(null);
      if (currentQ + 1 < questions.length) setCurrentQ(currentQ + 1);
      else setFinished(true);
    } else toast.error("Select an option!");
  };


  if (!cameraReady) {
    return (
      <div className="w-[90%] sm:w-130 text-center absolute Box_Shedow bg-white rounded-xl  top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 p-6">
        <h2 className="text-xl font-bold Text_Color">Enable Camera & Microphone</h2>
        <video id="examVideo" className="w-0 h-0"></video>
        <div className="w-30 BG_Color my-5 mx-auto p-1 rounded-xl">
          <div className="bg-white p-6 rounded-xl">
            <MdPermCameraMic className="BG_Color mx-auto   text-white text-6xl p-1 rounded-xl" />
          </div>
        </div>
        <button
          onClick={startCamera}
          className="px-4 py-2 BG_Color font-bold cursor-pointer text-white rounded-xl"
        >Allow</button>
      </div>
    );
  }


  // ✅ Render finished exam
  if (finished) {
    const percentage = (score / questions.length) * 100;
    const status = percentage >= 40 ? "✅ Passed" : "❌ Failed";

    const saveData = () => {
      if (status !== "✅ Passed") return;
      axios.post("oes-api/user/results", {
        score,
        total: questions.length,
        percentage,
        status,
        user: authUser.user.fullname,
      }).then(console.log("Go dashboard")).catch((err) => {
        console.log("Error saving result:", err)
      })
    }


    return (
      <div className="w-[90%] sm:w-130 text-center absolute Box_Shedow bg-white rounded-xl  top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 p-6 flex justify-center items-center flex-col gap-1">
        <h2 className="text-2xl font-bold "><span className="Text_Color">Exam Finished</span>  🎉</h2>
        <p>Your Score: {score}/{questions.length}</p>
        <p> Percentage: {percentage.toFixed(2)}% </p>
        <p className={`p-2 px-5  text-white font-semibold rounded-xl ${percentage >= 40 ? "bg-green-800" : "bg-red-800"}`} > {status}</p>
        <Link onClick={saveData} to="/dashboard" className="BG_Color p-2 text-white font-bold rounded-xl"> Go dashboard</Link>
      </div>
    );
  }

  return (
    <>
      <div className=" w-[95%] Box_Shedow bg-white rounded-xl absolute  top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2 select-none p-4 lg:max-w-lg mx-auto flex justify-center items-start flex-col gap-4 Custom_Scroll overflow-y-auto">

        <h2 className="text-xl font-bold Text_Color">
          Question {currentQ + 1} of {questions.length}
        </h2>

        <video id="examVideo" autoPlay muted className="w-50 h-auto rounded-xl bg-white Box_Shedow p-1"></video>

        {questions.length > 0 && (
          <>
            <div style={{ minHeight: "300px" }}>
              <div style={{ maxHeight: "300px" }} className="overflow-y-auto Custom_Scroll">
                <p className="text-justify">{questions[currentQ].question}</p>

                {questions[currentQ].img && (
                  <img
                    src={questions[currentQ].img}
                    className="w-full h-auto rounded-xl bg-cover my-1 object-cover"
                  />
                )}

                {questions[currentQ].options.map((opt, idx) => (
                  <label key={idx} className={`block w-full rounded-xl p-2 my-2 cursor-pointer ${selected === idx ? "BG_Color  text-white" : "bg-[#cccccc50]"}`}
                  >
                    <input type="radio" name="option" value={idx} checked={selected === idx} onChange={() => setSelected(idx)} className=" mr-5" />{opt} </label>
                ))}

              </div>
            </div>
            <button
              onClick={handleNext}
              className=" p-1 px-4 cursor-pointer BG_Color text-white rounded"
            >
              {currentQ + 1 === questions.length ? "Finish Exam" : "Next"}
            </button>
          </>
        )}

      </div>
    </>
  )
}

export default StudentExam;
