import { IoIosArrowRoundBack } from "react-icons/io";
import { FcTodoList } from "react-icons/fc";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function allLoginStudentData() {
  const [loginData, setLoginData] = useState([]);

  // ✅ Fetch login history
  useEffect(() => {
    const fetchLoginData = async () => {
      try {
        const res = await axios.get("/oes-api/user/allStudentData");
        setLoginData(res.data);
      } catch (err) {
        console.error("Error fetching login data:", err);
      }
    };

    fetchLoginData();
  }, []);

  return (
    <>
      <div style={{ height: "calc( 100vh - 110px )" }} className="p-5 my-5  rounded-xl Custom_Scroll overflow-y-auto bg-indigo-50">
        <Link to="/admin-dashboard" >
          <IoIosArrowRoundBack className="text-indigo-500 text-4xl"/>
        </Link>
        <h2 className="Text_Color text-center font-bold my-4 gap-6 flex justify-center items-center">
          <FcTodoList /> All login history
        </h2>

        <table className="w-full border border-gray-300">
          <tbody>
            <tr className="BG_Color sticky top-0 font-bold text-white">
              <th className="p-2 font-bold border-2 border-indigo-200">Full Name</th>
              <th className="p-2 font-bold border-2 border-indigo-200">Email</th>
              <th className="p-2 font-bold border-2 border-indigo-200"> Date & Time</th>
            </tr>
            {loginData.length > 0 ? (
              loginData.map((s) => (
                  <tr key={s._id} className="hover:bg-indigo-100 transition-all">
                    <td className="p-2 text-center border-2 border-indigo-200">{s.fullname}</td>
                    <td className="p-2 text-center border-2 border-indigo-200">{s.email}</td>
                    <td className="p-2 text-center border-2 border-indigo-200">
                      {new Date(s.createdAt).toLocaleString("en-IN", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </td>
                  </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center border-2 border-indigo-200 font-bold p-4 text-indigo-500"
                >
                  No login data found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default allLoginStudentData