import { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
import { useAuth } from "../../Context/AuthProvider.jsx";
import { FaUsers, FaFileSignature, FaGraduationCap } from "react-icons/fa";
import { Link } from "react-router-dom";

function AdminDashboard() {
    const [authUser] = useAuth();
    const [results, setResults] = useState([]);

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const res = await axios.get("/oes-api/user/allStudentList");
                setResults(res.data);
            } catch (err) {
                toast.error("Error fetching results");
            }
        };
        fetchResults();
    }, [authUser]);

    return (
        <div className="bg-[#f8f9fa] min-h-[calc(100vh-80px)] p-6 lg:p-10 font-sans">
            <div className="max-w-7xl mx-auto">
                
                {/* --- HEADER & ACTIONS --- */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6">
                    <div>
                        <h1 className="text-[#002347] text-3xl font-extrabold flex items-center gap-3">
                            <FaGraduationCap className="text-orange-500" /> Admin Panel
                        </h1>
                        <p className="text-gray-500 text-sm mt-1">Manage examinations and monitor student performance.</p>
                    </div>
                    
                    <div className="flex gap-4">
                        <Link to="/all-student">
                            <button className="flex items-center gap-2 bg-white text-[#002347] border border-gray-200 px-5 py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all shadow-sm">
                                <FaUsers /> Student List
                            </button>
                        </Link>
                        <Link to="/set-paper">
                            <button className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-400 text-white px-5 py-3 rounded-sm font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all active:scale-95">
                                <FaFileSignature /> Create Exam
                            </button>
                        </Link>
                    </div>
                </div>

                {/* --- TABLE CONTAINER --- */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-6 border-b border-gray-100">
                        <h2 className="text-[#002347] font-bold text-lg">Recent Student Results</h2>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 text-[#002347] text-xs uppercase tracking-wider font-bold">
                                    <th className="p-5 border-b border-gray-100">Student Name</th>
                                    <th className="p-5 border-b border-gray-100">Date & Time</th>
                                    <th className="p-5 border-b border-gray-100 text-center">Score</th>
                                    <th className="p-5 border-b border-gray-100 text-center">Percentage</th>
                                    <th className="p-5 border-b border-gray-100 text-center">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {results.length > 0 ? (
                                    results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((r) => (
                                        <tr key={r._id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-5 text-sm font-bold text-[#002347]">{r.user}</td>
                                            <td className="p-5 text-sm text-gray-500">
                                                {new Date(r.createdAt).toLocaleString('en-IN', {
                                                    dateStyle: 'medium',
                                                    timeStyle: 'short',
                                                })}
                                            </td>
                                            <td className="p-5 text-sm text-center text-gray-600 font-medium">
                                                {r.score} <span className="text-gray-300 mx-1">/</span> {r.total}
                                            </td>
                                            <td className="p-5 text-sm text-center font-bold text-[#002347]">
                                                {r.percentage.toFixed(2)}%
                                            </td>
                                            <td className="p-5 text-center">
                                                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                                                    r.status.includes("Passed") 
                                                    ? "bg-green-100 text-green-700" 
                                                    : "bg-red-100 text-red-700"
                                                }`}>
                                                    {r.status.replace("✅ ", "").replace("❌ ", "")}
                                                </span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="5" className="p-10 text-center text-gray-400 text-sm">
                                            No evaluation data found in the system.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminDashboard;