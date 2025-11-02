import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegNewspaper } from "react-icons/fa";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast'

function SetPaper() {
  const [questionData, setQuestionData] = useState({
    question: "",
    options: { A: "", B: "", C: "", D: "" },
    correctAnswer: "A"
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["A", "B", "C", "D"].includes(name)) {
      setQuestionData({
        ...questionData,
        options: { ...questionData.options, [name]: value }
      });
    } else {
      setQuestionData({ ...questionData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {

    e.preventDefault()
    console.log(questionData)
    await axios.post("/oes-api/user/addquestions", questionData);
    toast.success("Question added successfully!");
    setQuestionData({ question: "", options: { A: "", B: "", C: "", D: "" }, correctAnswer: "A" });
  };


  return (
    <>
      <div style={{ height: "calc( 100vh - 110px )" }} className="p-5 my-5  rounded-xl Custom_Scroll overflow-y-auto ">

        <div className="flex justify-between items-center gap-2">
          <Link to="/admin-dashboard" >
            <IoIosArrowRoundBack className="text-indigo-500 text-4xl hover:bg-gray-200 rounded-xl" />
          </Link>
          <Link to="/view-ques">
            <button className="BG_Color text-white p-2 rounded-xl font-bold cursor-pointer">View all question</button>
          </Link>
        </div>
        <h2 className="Text_Color text-center font-bold my-2 gap-6 flex justify-center items-center">
          <FaRegNewspaper className="text-indigo-500 " /> Add MCQ Question
        </h2>

        <form className="w-full lg:w-1/2 mx-auto Box_Shedow rounded-xl h-auto p-5 bg-white Box_Shedow " onSubmit={handleSubmit}>
          <input required className="w-full p-2 bg-[#cccccc1f] rounded-xl outline-none my-1" type="text" name="question" placeholder="Enter Question"
            value={questionData.question} onChange={handleChange} /><br />
          <input required className="w-full p-2 bg-[#cccccc1f] rounded-xl outline-none my-1" type="text" name="A" placeholder="Option A"
            value={questionData.options.A} onChange={handleChange} /><br />
          <input required className="w-full p-2 bg-[#cccccc1f] rounded-xl outline-none my-1" type="text" name="B" placeholder="Option B"
            value={questionData.options.B} onChange={handleChange} /><br />
          <input required className="w-full p-2 bg-[#cccccc1f] rounded-xl outline-none my-1" type="text" name="C" placeholder="Option C"
            value={questionData.options.C} onChange={handleChange} /><br />
          <input required className="w-full p-2 bg-[#cccccc1f] rounded-xl outline-none my-1" type="text" name="D" placeholder="Option D"
            value={questionData.options.D} onChange={handleChange} /><br />

          <label className="w-full text-indigo-500 font-bold">Correct Answer:</label>
          <select name="correctAnswer" className="w-50 bg-indigo-100 rounded-xl cursor-pointer outline-none p-2" value={questionData.correctAnswer} onChange={handleChange}>
            <option required className="w-50" value="A">A</option>
            <option required className="w-50" value="B">B</option>
            <option required className="w-50" value="C">C</option>
            <option required className="w-50" value="D">D</option>
          </select>
          <br />
          <button className="BG_Color text-white p-2 rounded-xl font-bold cursor-pointer" type="submit">Save Question</button>
        </form>
      </div>
    </>
  )
}

export default SetPaper