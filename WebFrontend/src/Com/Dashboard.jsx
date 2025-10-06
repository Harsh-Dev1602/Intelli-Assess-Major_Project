import { useNavigate  } from 'react-router-dom';
import { useAuth } from "../Context/AuthProvider";
import axios from 'axios';
import toast from 'react-hot-toast'

function Dashboard() {
  const [authUser, setAuthUser] = useAuth();
  const navigate = useNavigate();
  
  const handleStartExam = async () => {
  try {
    const res = await axios.get(`/oes-api/user/results/check/${authUser.user.fullname}`);
    
    if (res.data.taken === true) {
      toast.error("You have already completed this exam!");
    } else {
      navigate("/start-exam");
    }
  } catch (err) {
    toast.error("Error checking exam status");
    console.error(err);
  }
};

  return (
    <>
      <div style={{ minHeight: "calc( 100vh - 60px )" }} className=" w-full flex flex-col justify-center items-center">
        <div style={{ maxHeight: "calc( 100vh - 60px )" }} className=" md:w-96 p-5 rounded-xl inline bg-white overflow-y-auto">
          <div className='container'>
            <h2 className='title text-light text-center text-indigo-500 font-bold'>Exam Instructions</h2>
            <ol className='p-5 h-80 Custom_Scroll overflow-y-auto text-justify'>
              <li className='list-disc mb-2'>Camera & Microphone: Your camera and microphone will be active during the  exam. This is required for monitoring purposes and to maintain exam integrity.</li>
              <li className='list-disc mb-2'>Starting the Exam: Click the “Start Exam” button after reading the instructions to move to the exam questions. You will not be able to go back to the instructions once the exam starts.</li>
              <li className='list-disc mb-2'>Tab Switching & Fullscreen Exit: Switching tabs or exiting fullscreen mode during the exam will automatically end your exam. Stay focused on the exam window at all times.</li>
              <li className='list-disc'>Ending the Exam: Once the exam is finished, your camera and microphone will turn off automatically, and fullscreen mode will exit. You will then be able to view your results or exit the exam.</li>

            </ol>

            <div className='text-center p-5 '>
              <button  onClick={handleStartExam} className='px-5 py-2 BG_Color rounded-xl font-semibold cursor-pointer text-white' >Start Exam</button>
            </div>

          </div>
        </div>
          <span className='text-red-600 mt-5 text-center rounded-xl bg-white font-bold p-1'>*⚠️ Important: Read all instructions carefully before starting. Not following the rules may result in automatic submission or termination of the exam.*</span>

      </div>
    </>
  )
}

export default Dashboard