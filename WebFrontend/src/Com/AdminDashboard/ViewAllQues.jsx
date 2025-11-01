import React, { useEffect, useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FcTodoList } from "react-icons/fc";
import { Link } from 'react-router-dom';
import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri";

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
    await axios.delete(`oes-api/user/deletequestion/${id}`);
      fetchQuestions();
  };


  const optionLabels = ["A", "B", "C", "D"];
  return (
    <>
      <div style={{ height: "calc( 100vh - 110px )" }} className="p-5 my-5  rounded-xl Custom_Scroll overflow-y-auto">
        <Link to="/set-paper" >
          <IoIosArrowRoundBack className="text-indigo-500 text-4xl inline hover:bg-gray-200 rounded-xl" />
        </Link>
        <h2 className="Text_Color text-center font-bold my-4 gap-6 flex justify-center items-center">
          <FcTodoList /> All question
        </h2>
        <div>
          {questions.map((q) => {
            const opts = Object.values(q.options); // Object → Array ✅

            return (
              <div key={q._id} className=" border-2 border-[#cccccc7c] p-2 rounded-xl my-2 flex justify-between items-start">
                <div>
                  <h3 className=" text-justify mb-1">{q.question}</h3>
                  <ul>
                    {opts.map((opt, optIndex) => (
                      <li className=" text-justify" key={optIndex}>
                        <strong className=" font-light">{optionLabels[optIndex]}.</strong> {opt}
                      </li>
                    ))}
                  </ul>
                </div>
                <div   onClick={() => deleteQuestion(q._id)} className="p-2 cursor-pointer hover:bg-gray-200 rounded-xl">
                  <RiDeleteBin6Line className="text-2xl text-red-600" />
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </>
  )
}

export default ViewAllQues