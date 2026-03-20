import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaDatabase, FaCheckCircle } from "react-icons/fa";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Link } from 'react-router-dom';
import axios from "axios";
import toast from 'react-hot-toast';

function ViewAllQues() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    axios.get("/oes-api/user/showQuestion")
      .then(res => setQuestions(res.data))
      .catch(err => console.log(err));
  };

  const deleteQuestion = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) return;
    try {
      await axios.delete(`oes-api/user/deletequestion/${id}`);
      toast.success("Question deleted");
      fetchQuestions();
    } catch (error) {
      toast.error("Failed to delete question");
    }
  };

  const optionLabels = ["A", "B", "C", "D"];

  return (
    <div className="bg-[#f8f9fa] min-h-[calc(100vh-80px)] p-6 lg:p-10 font-sans text-[#002347]">
      <div className="max-w-6xl mx-auto">
        
        {/* --- HEADER & NAVIGATION --- */}
        <div className="flex items-center gap-4 mb-10">
          <Link to="/set-paper">
            <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 flex items-center justify-center rounded-full text-[#002347] hover:text-orange-500 transition-all">
              <IoIosArrowRoundBack size={30} />
            </div>
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold flex items-center gap-3">
              <FaDatabase className="text-orange-500 text-xl" /> Question Bank
            </h1>
            <p className="text-gray-500 text-sm">Review and manage all uploaded MCQ items ({questions.length}).</p>
          </div>
        </div>

        {/* --- QUESTIONS LIST --- */}
        <div className="space-y-6">
          {questions.length > 0 ? (
            questions.map((q, index) => {
              const opts = Object.values(q.options);

              return (
                <div key={q._id} className="bg-white border border-gray-100 rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="flex justify-between items-start p-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="bg-[#002347] text-white text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-widest">
                          Q. {index + 1}
                        </span>
                        {q.correctAnswer && (
                          <span className="flex items-center gap-1 text-green-600 text-[10px] font-bold uppercase tracking-widest bg-green-50 px-2 py-1 rounded-sm border border-green-100">
                            <FaCheckCircle /> Ans: {q.correctAnswer}
                          </span>
                        )}
                      </div>
                      
                      <h3 className="text-lg font-bold mb-6 leading-relaxed pr-8">
                        {q.question}
                      </h3>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {opts.map((opt, optIndex) => (
                          <div key={optIndex} className={`flex items-center gap-3 p-3 rounded-sm border ${q.correctAnswer === optionLabels[optIndex] ? 'bg-orange-50 border-orange-200' : 'bg-gray-50 border-gray-100'}`}>
                            <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-bold ${q.correctAnswer === optionLabels[optIndex] ? 'bg-orange-500 text-white' : 'bg-white border border-gray-300 text-gray-400'}`}>
                              {optionLabels[optIndex]}
                            </span>
                            <span className="text-sm text-gray-600">{opt}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Delete Action */}
                    <button 
                      onClick={() => deleteQuestion(q._id)} 
                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                      title="Delete Question"
                    >
                      <RiDeleteBin6Line className="text-xl" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
               <FaDatabase className="mx-auto text-gray-200 text-5xl mb-4" />
               <p className="text-gray-400 font-medium">No questions found in the database.</p>
               <Link to="/set-paper" className="text-orange-500 font-bold hover:underline mt-2 inline-block">Add your first question</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ViewAllQues;