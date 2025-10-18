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
            <div style={{ height: "calc( 100vh - 110px )" }} className="p-5 my-5  rounded-xl Custom_Scroll overflow-y-auto bg-white Box_Shedow">
                <div className="flex gap-2">
                    <Link to="/all-student">
                        <button className="BG_Color text-white p-2 rounded-xl font-bold cursor-pointer">List of student</button>
                    </Link>
                    <Link to="/set-paper">
                        <button className="BG_Color text-white p-2 rounded-xl font-bold cursor-pointer">Set paper</button>
                    </Link>
                </div>
                <h2 className="Text_Color text-center font-bold my-4 gap-6 flex justify-center items-center"><FcTodoList /> All student results</h2>

                <table className="w-full text-black p-6">
                    <tbody>
                        <tr className="BG_Color sticky top-0 font-bold text-white">
                            <th className="p-2 font-bold border-2 border-indigo-200">Student Name</th>
                            <th className="p-2 font-bold border-2 border-indigo-200">Date & Time</th>
                            <th className="p-2 font-bold border-2 border-indigo-200">Score</th>
                            <th className="p-2 font-bold border-2 border-indigo-200">Percentage</th>
                            <th className="p-2 font-bold border-2 border-indigo-200">Status</th>
                        </tr>
                        {results.length > 0 ? (results.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((r) => (
                            <tr key={r._id} className=" hover:bg-indigo-100 transition-all">
                                <td className="p-2 text-center border-2 border-indigo-200">{r.user}</td>
                                <td className="p-2 text-center border-2 border-indigo-200"> {new Date(r.createdAt).toLocaleString('en-IN', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                })}</td>
                                <td className="p-2 text-center border-2 border-indigo-200">{r.score}/{r.total}</td>
                                <td className="p-2 text-center border-2 border-indigo-200">{r.percentage.toFixed(2)}%</td>
                                <td className={`p-2 border-indigo-200 text-center border-2 ${r.status === "✅ Passed" ? " bg-green-100" : "bg-red-100"} `}>{r.status}</td>
                            </tr>
                        ))) : (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center font-bold p-4 border-2 border-indigo-200 text-indigo-500"
                                >
                                    No result data found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default AdminDashboard