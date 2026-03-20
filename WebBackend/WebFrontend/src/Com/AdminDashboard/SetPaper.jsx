import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import toast from 'react-hot-toast';
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaRegNewspaper, FaCheckCircle, FaListOl } from "react-icons/fa";

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
    e.preventDefault();
    try {
      await axios.post("/oes-api/user/addquestions", questionData);
      toast.success("Question added successfully!");
      setQuestionData({ 
        question: "", 
        options: { A: "", B: "", C: "", D: "" }, 
        correctAnswer: "A" 
      });
    } catch (error) {
      toast.error("Failed to add question.");
    }
  };

  return (
    <div className="bg-[#f8f9fa] min-h-[calc(100vh-80px)] p-6 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- TOP NAVIGATION --- */}
        <div className="flex justify-between items-center mb-8">
          <Link to="/admin-dashboard" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 flex items-center justify-center rounded-full text-[#002347] group-hover:text-orange-500 transition-all">
              <IoIosArrowRoundBack size={30} />
            </div>
            <span className="text-[#002347] font-bold text-sm group-hover:text-orange-500">Back to Dashboard</span>
          </Link>
          
          <Link to="/view-ques">
            <button className="flex items-center gap-2 bg-white text-[#002347] border border-gray-200 px-5 py-2 rounded-sm font-bold text-xs uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all shadow-sm">
              <FaListOl /> View All Questions
            </button>
          </Link>
        </div>

        {/* --- FORM SECTION --- */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-[#002347] p-6 text-white flex items-center gap-3">
            <FaRegNewspaper className="text-orange-400 text-xl" />
            <h2 className="text-lg font-bold uppercase tracking-wider">Add MCQ Question</h2>
          </div>

          <form className="p-8 space-y-6" onSubmit={handleSubmit}>
            {/* Question Text */}
            <div>
              <label className="block text-[#002347] text-xs font-bold uppercase tracking-widest mb-3">Question Description</label>
              <textarea 
                required 
                name="question"
                rows="3"
                placeholder="What is the main concept of..." 
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-orange-400 text-sm"
                value={questionData.question} 
                onChange={handleChange} 
              />
            </div>

            {/* Options Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['A', 'B', 'C', 'D'].map((opt) => (
                <div key={opt}>
                  <label className="block text-gray-400 text-[10px] font-bold uppercase mb-2">Option {opt}</label>
                  <input 
                    required 
                    type="text" 
                    name={opt}
                    placeholder={`Enter choice ${opt}`}
                    className="w-full p-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-orange-400 text-sm"
                    value={questionData.options[opt]} 
                    onChange={handleChange} 
                  />
                </div>
              ))}
            </div>

            {/* Correct Answer Selection */}
            <div className="pt-4 border-t border-gray-100 flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" />
                <label className="text-[#002347] text-xs font-bold uppercase">Set Correct Answer:</label>
              </div>
              <div className="flex gap-2">
                {['A', 'B', 'C', 'D'].map((val) => (
                  <button
                    key={val}
                    type="button"
                    onClick={() => setQuestionData({...questionData, correctAnswer: val})}
                    className={`w-10 h-10 rounded-sm font-bold text-sm transition-all ${
                      questionData.correctAnswer === val 
                      ? "bg-orange-500 text-white shadow-md" 
                      : "bg-gray-100 text-gray-400 hover:bg-gray-200"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-6">
              <button 
                className="w-full md:w-auto bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-10 py-4 rounded-sm font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all active:scale-95" 
                type="submit"
              >
                Save Question to Bank
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SetPaper;