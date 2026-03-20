import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack } from "react-icons/io";
import { FaHistory, FaUserAlt, FaEnvelope, FaRegClock } from "react-icons/fa";

function AllLoginStudentData() {
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
    <div className="bg-[#f8f9fa] min-h-[calc(100vh-80px)] p-6 lg:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* --- NAVIGATION & HEADER --- */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/admin-dashboard">
            <div className="w-10 h-10 bg-white shadow-sm border border-gray-100 flex items-center justify-center rounded-full text-[#002347] hover:text-orange-500 transition-all">
              <IoIosArrowRoundBack size={32} />
            </div>
          </Link>
          <div>
            <h1 className="text-[#002347] text-2xl font-extrabold flex items-center gap-3">
              <FaHistory className="text-orange-500 text-xl" /> Student Login History
            </h1>
            <p className="text-gray-500 text-sm">Monitor system access and user activity logs.</p>
          </div>
        </div>

        {/* --- DATA CARD --- */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-[#002347] text-xs uppercase tracking-widest font-bold">
                  <th className="p-5 border-b border-gray-100">
                    <div className="flex items-center gap-2"><FaUserAlt className="text-gray-400"/> Full Name</div>
                  </th>
                  <th className="p-5 border-b border-gray-100">
                    <div className="flex items-center gap-2"><FaEnvelope className="text-gray-400"/> Email Address</div>
                  </th>
                  <th className="p-5 border-b border-gray-100">
                    <div className="flex items-center gap-2"><FaRegClock className="text-gray-400"/> Date & Time</div>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {loginData.length > 0 ? (
                  loginData
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((s) => (
                      <tr key={s._id} className="hover:bg-orange-50/30 transition-colors group">
                        <td className="p-5 text-sm font-bold text-[#002347] group-hover:text-orange-600 transition-colors">
                          {s.fullname}
                        </td>
                        <td className="p-5 text-sm text-gray-500 font-medium">
                          {s.email}
                        </td>
                        <td className="p-5 text-sm">
                          <span className="text-gray-600">
                            {new Date(s.createdAt).toLocaleString("en-IN", {
                              dateStyle: "medium",
                              timeStyle: "short",
                            })}
                          </span>
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-12 text-center text-gray-400 italic">
                      No login activity recorded yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- FOOTER INFO --- */}
        <p className="mt-6 text-center text-gray-400 text-xs italic">
          * Logs are automatically sorted by the most recent activity.
        </p>
      </div>
    </div>
  );
}

export default AllLoginStudentData;