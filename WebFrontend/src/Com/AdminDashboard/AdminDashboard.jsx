import { useEffect, useState } from "react";
import axios from "axios";
import toast from 'react-hot-toast'
import { useAuth } from "../../Context/AuthProvider.jsx";
import { FcTodoList } from "react-icons/fc";
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
                toast.error("Error fetching results:", err.response?.data || err.message);
            }
        };

        fetchResults();
    }, [authUser]);

    return (
        <>
            <div style={{ height: "calc( 100vh - 110px )" }} className="p-5 my-5  rounded-xl Custom_Scroll overflow-y-auto bg-indigo-50">
                <Link to="/all-student">
                    <button className="BG_Color text-white p-2 rounded-xl font-bold cursor-pointer">List Student</button>
                </Link>
                <h2 className="Text_Color text-center font-bold my-4 gap-6 flex justify-center items-center"><FcTodoList /> All Student Results</h2>

                <table className="w-full text-black p-6">
                    <tbody>
                        <tr className="BG_Color sticky top-0 font-bold text-white">
                            <th className="p-2 font-bold border-2 border-indigo-200">Student Name</th>
                            <th className="p-2 font-bold border-2 border-indigo-200">Date & Time</th>
                            <th className="p-2 font-bold border-2 border-indigo-200">Score</th>
                            <th className="p-2 font-bold border-2 border-indigo-200">Percentage</th>
                            <th className="p-2 font-bold border-2 border-indigo-200">Status</th>
                        </tr>
                        {results.map((r) => (
                            <tr key={r._id} className=" hover:bg-indigo-100 transition-all">
                                <td className="p-2 text-center border-2 border-indigo-200">{r.user}</td>
                                <td className="p-2 text-center border-2 border-indigo-200"> {new Date(r.createdAt).toLocaleString('en-IN', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                })}</td>
                                <td className="p-2 text-center border-2 border-indigo-200">{r.score}/{r.total}</td>
                                <td className="p-2 text-center border-2 border-indigo-200">{r.percentage.toFixed(2)}%</td>
                                <td className={`p-2 border-indigo-200 text-center border-2 ${r.status==="✅ Passed"?" bg-green-100":"bg-red-100"} `}>{r.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminDashboard